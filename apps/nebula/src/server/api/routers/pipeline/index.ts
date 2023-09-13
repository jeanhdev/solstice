import { Pipeline } from "@hubspot/api-client/lib/codegen/crm/pipelines";
import { integrations } from "@solstice/cosmos/tables/integrations";
import { User, users } from "@solstice/cosmos/tables/users";
import { usersToIntegrations } from "@solstice/cosmos/tables/users-to-integrations";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { and, eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import qs from "qs";

import { createTRPCRouter, protectedProcedure } from "@nebula/server/api/trpc";
import { client } from "@nebula/server/db";

import { createCrmTriggersInput } from "./inputs";

export const pipelineRouter = createTRPCRouter({
  getHubspotPipelines: protectedProcedure.query(async ({ ctx }) => {
    const { pipelines } = await getHubspotPipelines({
      userId: ctx.session.user.id,
    });

    if (!pipelines) throw Error("HubSpot pipelines not found");

    return pipelines;
  }),
  createCrmTriggers: protectedProcedure
    .input(createCrmTriggersInput)
    .mutation(async ({ ctx, input }) => {
      await client
        .update(users)
        .set({
          triggerProspect: input.triggerProspect,
          triggerCustomer: input.triggerCustomer,
        })
        .where(eq(users.id, ctx.session.user.id))
        .execute();
    }),
});

const getHubspotPipelines = async ({
  userId,
}: {
  userId: User["id"];
}): Promise<{ pipelines: Pipeline[] }> => {
  const OBJECT_TYPE = "deals";

  try {
    const hubspotIntegration = await client
      .select()
      .from(integrations)
      .where(eq(integrations.key, "HUBSPOT"))
      .execute()
      .then((r) => r[0]);

    if (!hubspotIntegration) throw Error("HubSpot integration not found");

    const userIntegration = await client
      .select()
      .from(usersToIntegrations)
      .where(
        and(
          eq(usersToIntegrations.userId, userId),
          eq(usersToIntegrations.integrationId, hubspotIntegration.id),
        ),
      )
      .execute()
      .then((r) => r[0]);

    if (!userIntegration) throw Error("HubSpot tokens not found");

    if (!userIntegration.tokens?.access_token) {
      throw Error("HubSpot access token not found");
    }

    const { data }: AxiosResponse<{ results: Pipeline[] }> = await axios.get(
      `https://api.hubapi.com/crm/v3/pipelines/${OBJECT_TYPE}`,
      {
        headers: {
          authorization: `Bearer ${userIntegration.tokens?.access_token}`,
        },
      },
    );

    return { pipelines: data.results };
  } catch (error) {
    return handleHubspotError<{ pipelines: Pipeline[] }>({
      client,
      userId,
      error: error as AxiosError,
      callback: getHubspotPipelines,
    });
  }
};

export async function handleHubspotError<T>({
  client,
  userId,
  error,
  callback,
}: {
  client: PostgresJsDatabase;
  userId: User["id"];
  error: AxiosError;
  callback: ({ userId }: { userId: User["id"] }) => Promise<T>;
}) {
  // WARNING: this is VERY bad

  if (!error.message.includes("401")) throw error;
  const { newTokens } = await refreshIntegrationTokens({
    client,
    userId,
  });

  if (!newTokens) throw new Error(`No new tokens received`);

  return callback({
    userId,
  });
}

export async function refreshIntegrationTokens({
  client,
  userId,
}: {
  client: PostgresJsDatabase;
  userId: User["id"];
}) {
  if (!userId) throw Error("No userId provided.");

  try {
    const integration = await client
      .select()
      .from(integrations)
      .where(eq(integrations.key, "HUBSPOT"))
      .execute()
      .then((r) => r[0]);

    if (!integration) throw Error("No integration found for Hubspot");

    const userIntegration = await client
      .select()
      .from(usersToIntegrations)
      .where(
        and(
          eq(usersToIntegrations.userId, userId),
          eq(usersToIntegrations.integrationId, integration.id),
        ),
      )
      .execute()
      .then((r) => r[0]);

    if (!userIntegration) throw Error("No token found");

    const HUBSPOT_ENDPOINT_URL = "https://api.hubapi.com/oauth/v1/token";

    const { freshTokens } = await exchangeRefreshForNewTokens({
      endpointUrl: HUBSPOT_ENDPOINT_URL,
      refreshToken: (userIntegration.tokens! as any).refresh_token,
    });

    await client
      .update(usersToIntegrations)
      .set({
        tokens: freshTokens,
      })
      .where(
        and(
          eq(usersToIntegrations.userId, userId),
          eq(usersToIntegrations.integrationId, integration.id),
        ),
      )
      .execute();

    return {
      newTokens: {
        accessToken: freshTokens.access_token,
        refreshToken: freshTokens.refresh_token,
      },
    };
  } catch (e: any) {
    console.log(e);
    return { error: e.message };
  }
}

const exchangeRefreshForNewTokens = async ({
  endpointUrl,
  refreshToken,
}: {
  endpointUrl: string;
  refreshToken: string;
}) => {
  if (!refreshToken) throw Error("No refreshToken provided.");

  const OAUTH_HUBSPOT_CLIENT_ID = "7ab536af-3d77-42dc-98db-050f399d2b4d";

  const OAUTH_HUBSPOT_CLIENT_SECRET = "1251d806-71ce-45f6-a0ae-1c6ffd0b28ec";

  const authCodeProof = {
    grant_type: "refresh_token",
    client_id: OAUTH_HUBSPOT_CLIENT_ID,
    client_secret: OAUTH_HUBSPOT_CLIENT_SECRET,
    refresh_token: refreshToken,
  };

  const req = await axios
    .post(endpointUrl, qs.stringify(authCodeProof), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => res.data);
  const { refresh_token, access_token } = req;

  const tokens = { access_token, refresh_token };

  return { freshTokens: tokens };
};
