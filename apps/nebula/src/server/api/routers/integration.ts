import {
  integrations,
  type IntegrationKey,
} from "@solstice/cosmos/tables/integrations";
import {
  NewUserToIntegration,
  usersToIntegrations,
} from "@solstice/cosmos/tables/users-to-integrations";
import axios, { type AxiosResponse } from "axios";
import { and, eq } from "drizzle-orm";
import qs from "qs";
import { z } from "zod";

import { safeParse } from "@nebula/api/helpers";
import { hubspotTokensSchema } from "@nebula/schemas";
import { createTRPCRouter, protectedProcedure } from "@nebula/server/api/trpc";
import { client } from "@nebula/server/db";
import { OAuthGrantType } from "@nebula/types";

export const integrationRouter = createTRPCRouter({
  getSyncedIntegrations: protectedProcedure.query(async ({ ctx }) => {
    const crm = await client
      .select()
      .from(usersToIntegrations)
      .where(eq(usersToIntegrations.userId, ctx.session.user.id))
      .innerJoin(
        integrations,
        eq(usersToIntegrations.integrationId, integrations.id),
      );

    if (!crm) throw new Error("No CRM found for user.");

    return crm;
  }),

  getCrms: protectedProcedure.query(async () => {
    const crms = await client
      .select()
      .from(integrations)
      .where(eq(integrations.type, "CRM"))
      .execute();

    if (!crms) throw new Error("No crms found");
    return crms;
  }),

  connectIntegration: protectedProcedure
    .input(
      z.object({
        code: z.string(),
        integrationType: z.any(),
        integrationKey: z.any(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      //
      const { tokens: oauthTokens } = await exchangeAuthorizationCodeForTokens({
        code: input.code,
        integrationKey: input.integrationKey,
      });

      //
      const integration = await client
        .select()
        .from(integrations)
        .where(eq(integrations.key, input.integrationKey))
        .execute()
        .then((r) => r[0]);

      if (!integration) throw new Error("No integration found");

      if (input.integrationType == "CRM") {
        const crm = await client
          .select()
          .from(usersToIntegrations)
          .where(
            and(
              eq(usersToIntegrations.userId, userId),
              eq(usersToIntegrations.integrationId, integration.id),
            ),
          )
          .execute();

        if (!crm.length) {
          const newUserToIntegration: NewUserToIntegration = {
            userId,
            integrationId: integration.id,
            tokens: oauthTokens as any,
          };
          await client
            .insert(usersToIntegrations)
            .values(newUserToIntegration)
            .execute();
        }
      }
    }),
});

const exchangeAuthorizationCodeForTokens = async ({
  integrationKey,
  code,
}: {
  integrationKey: IntegrationKey;
  code: string;
}) => {
  // Request body
  const { requestBody } = getRequestBodyByIntegrationKey({
    integrationKey,
    code,
  });
  // Get endpoint
  const requestEndpoint = getOAuthUrlByIntegrationKey({
    integrationKey,
  });
  // Make the request
  const { data: tokens }: AxiosResponse<Response> = await axios.post(
    requestEndpoint,
    qs.stringify(requestBody),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );
  //
  const { requestResponseSchema } = getRequestResponseByIntegrationKey({
    integrationKey,
  });
  // Safely parse the response
  safeParse<z.infer<typeof requestResponseSchema>>(
    tokens,
    requestResponseSchema,
  );
  // Return tokens
  return { tokens };
};

const getOAuthUrlByIntegrationKey = ({
  integrationKey,
}: {
  integrationKey: IntegrationKey;
}) => {
  const oauthAuthorizationCodeUrls = {
    HUBSPOT: "https://api.hubapi.com/oauth/v1/token",
  };

  return oauthAuthorizationCodeUrls[integrationKey];
};

const getRequestBodyByIntegrationKey = ({
  integrationKey,
  code,
}: {
  integrationKey: IntegrationKey;
  code: string;
}) => {
  const grant_type = OAuthGrantType.AUTHORIZATION_CODE;
  let requestBody;

  if (integrationKey === "HUBSPOT") {
    requestBody = {
      grant_type,
      code,
      client_id: process.env.NEXT_PUBLIC_OAUTH_HUBSPOT_CLIENT_ID,
      client_secret: process.env.OAUTH_HUBSPOT_CLIENT_SECRET,
      redirect_uri: process.env.NEXT_PUBLIC_OAUTH_HUBSPOT_REDIRECT_URI,
    };
  }

  return { requestBody };
};

const getRequestResponseByIntegrationKey = ({
  integrationKey,
}: {
  integrationKey: IntegrationKey;
}) => {
  if (integrationKey === "HUBSPOT") {
    return {
      requestResponseSchema: hubspotTokensSchema,
    };
  }

  throw Error("IntegrationKey not supported");
};
