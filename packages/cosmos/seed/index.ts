import { subDays } from "date-fns";
import { desc, eq, inArray } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { client, pool } from "@cosmos/db";
import { seedLogger } from "@cosmos/seed/log";
import { chunkArrayInGroups, generateUserEvents } from "@cosmos/seed/utils";
import {
  NewAttributionModel,
  attributionModels,
} from "@cosmos/tables/attribution-models";
import { attributionPerformanceDaily } from "@cosmos/tables/attribution-performance-daily";
import { NewChannel, channels } from "@cosmos/tables/channels";
import { NewIntegration, integrations } from "@cosmos/tables/integrations";
import { pipelineRuns } from "@cosmos/tables/pipeline-runs";
import { pulsarRuns } from "@cosmos/tables/pulsar-runs";
import { User, users } from "@cosmos/tables/users";
import {
  NewUserToAttributionModel,
  usersToAttributionModels,
} from "@cosmos/tables/users-to-attribution-models";
import { visitorEvents } from "@cosmos/tables/visitor-events";

const log = seedLogger();

const config = {
  seedNebula: true,
  seedUserData: true,
  seedEventsData: false,
};

const userEmailToSeed = "@";

interface SeedFnArgs {
  client: PostgresJsDatabase;
  userId: User["id"];
}

const MAX_EVENTS_TO_SEED = 10000;

const seedIntegrations = async ({ client }: { client: PostgresJsDatabase }) => {
  const newIntegrations: NewIntegration[] = [
    {
      name: "Hubspot",
      key: "HUBSPOT",
      type: "CRM",
      url: "app.hubspot.com",
    },
  ];

  await client.insert(integrations).values(newIntegrations).execute();
  log.info(`🐾 Integrations created!`);
};

const seedAttributionModels = async ({ userId, client }: SeedFnArgs) => {
  const newAttributionModels: NewAttributionModel[] = [
    {
      name: "Linear",
      key: "LINEAR",
      isMultiTouch: true,
    },
    {
      name: "First-click",
      key: "FIRST_TOUCH",
      isMultiTouch: false,
    },
    {
      name: "Last-click",
      key: "LAST_TOUCH",
      isMultiTouch: false,
    },
  ];

  const createdAttributionModels = await client
    .insert(attributionModels)
    .values(newAttributionModels)
    .returning();

  log.info(`🐾 Attribution models created!`);

  const newUserToAttributionModels: NewUserToAttributionModel[] =
    createdAttributionModels.map((attributionModel) => ({
      attributionModelId: attributionModel.id,
      isDefault: attributionModel.key === "LINEAR",
      isEnabled: true,
      userId,
    }));

  await client
    .insert(usersToAttributionModels)
    .values(newUserToAttributionModels)
    .execute();

  return { attributionModelsIds: createdAttributionModels.map((a) => a.id) };
};

const seedChannels = async ({ client, userId }: SeedFnArgs) => {
  const newChannels: NewChannel[] = [
    {
      name: "Google Ads",
      slug: "google-ads",
      utmSource: "google",
      userId,
    },
    {
      name: "LinkedIn Ads",
      slug: "linkedin-ads",
      utmSource: "linkedin",
      userId,
    },
    {
      name: "Facebook Ads",
      slug: "facebook-ads",
      utmSource: "facebook",
      userId,
    },
    {
      name: "Bing Ads",
      slug: "bing-ads",
      userId,
    },
    {
      name: "Social",
      slug: "social",
      utmSource: "social",
      userId,
    },
    // DEFAULT CHANNELS
    {
      name: "Direct",
      slug: "direct",
      userId,
    },
    {
      name: "Organic",
      slug: "organic",
      userId,
    },
    {
      name: "Referral",
      slug: "referral",
      userId,
    },
  ];

  const channelIds = await client
    .insert(channels)
    .values(newChannels)
    .returning({ id: channels.id })
    .then((res) => res.map((r) => r.id));

  log.info(`🐾 ${channelIds.length} channels created`);

  return { channelIds };
};

async function main() {
  if (config.seedNebula) {
    await nebulaSeed({ client });
  }

  let userId: string;

  const user = await client
    .select()
    .from(users)
    .where(eq(users.email, userEmailToSeed));

  if (!user) {
    throw Error(
      `❌ User ${userEmailToSeed} not found: cannot seedForUser nor seedEvents`,
    );
  }

  userId = user[0].id;

  if (config.seedUserData) {
    const RESET_DATA_BEFORE_SEED = false;

    if (RESET_DATA_BEFORE_SEED) {
      await resetMockDataForUser({
        client,
        userId,
      });
    }
    await seedForUSer({ client, userId });
  }

  if (config.seedEventsData) {
    const { events } = await generateUserEvents({
      client,
      numberOfEventsPerUser: 3,
      maxNumberOfEvents: MAX_EVENTS_TO_SEED,
    });

    const batchedEvents = chunkArrayInGroups({ arr: events, size: 5000 });

    for (const batch of batchedEvents) {
      await client.insert(visitorEvents).values(batch).execute();
    }

    const lastPipelineRun = await client
      .select()
      .from(pipelineRuns)
      .orderBy(desc(pipelineRuns.createdAt))
      .execute()
      .then((r) => r[0]);

    if (!lastPipelineRun) {
      const firstTwoEvents = await client
        .select()
        .from(visitorEvents)
        .orderBy(visitorEvents.createdAt)
        .limit(2);

      const twoDaysAgo = subDays(new Date(), 2);

      const fakeFirstPulsarRun = await client
        .insert(pulsarRuns)
        .values({
          status: "SUCCESS",
          startedAt: twoDaysAgo,
        })
        .returning()
        .then((r) => r[0]);

      const fakeFirstPipelineRun = await client
        .insert(pipelineRuns)
        .values({
          status: "IN_PROGRESS",
          batchVisitorEventsCount: 2,
          startedAt: twoDaysAgo,
          userId,
          pulsarRunId: fakeFirstPulsarRun.id,
        })
        .returning()
        .then((r) => r[0]);

      await client
        .update(visitorEvents)
        .set({
          pipelineRunId: fakeFirstPipelineRun.id,
        })
        .where(
          inArray(
            visitorEvents.id,
            firstTwoEvents.map((e) => e.id),
          ),
        )
        .execute();
    }
  }
}

const resetMockDataForNebula = async ({
  client,
}: {
  client: PostgresJsDatabase;
}) => {
  log.info(`🌌 Resetting mock data for nebula`);
  await client.delete(integrations).execute();
  log.info("🧼 Integrations deleted");
};
// NOTE: this seed is intented to be run only once
// to get the app running and be able to onboard a given user
const nebulaSeed = async ({ client }: { client: PostgresJsDatabase }) => {
  const RESET_NEBULA_DATA_BEFORE_SEED = true;
  if (RESET_NEBULA_DATA_BEFORE_SEED) {
    await resetMockDataForNebula({ client });
  }
  await seedIntegrations({ client });
};

// NOTE: this seed is minimal and does not represent the end data.
// it's just to get the app running and be able to run a pipeline run
// against a given userId as it will have channels, attribution models, etc.
const seedForUSer = async ({
  client,
  userId,
}: {
  client: PostgresJsDatabase;
  userId: User["id"];
}) => {
  log.info(`Seeding for user: ${userId}`);

  await seedChannels({ client, userId });
  log.info("🚀 Channels seeded");

  await seedAttributionModels({
    client,
    userId,
  });

  log.info("🚀 Attribution models seeded");
};

const resetMockDataForUser = async ({ client, userId }: SeedFnArgs) => {
  log.info(`🌌 Resetting mock data for user: ${userId}`);
  await client
    .delete(attributionPerformanceDaily)
    .where(eq(attributionPerformanceDaily.userId, userId))
    .execute();

  console.log("🧼 Attribution performance daily deleted");

  // await client
  //   .delete(usersToAttributionModels)
  //   .where(eq(usersToAttributionModels.userId, userId));
  // log.info("🧼 Attribution models to user relationship deleted");

  // await client
  //   .delete(visitorSessions)
  //   .where(eq(visitorSessions.userId, userId));
  // log.info("🧼 Visitor sessions deleted");

  // await client.delete(channels).where(eq(channels.userId, userId));
  // log.info("🧼 Channels deleted");
  //
  // await client.delete(companies);
  // log.info("🧼 Companies deleted");
  //
};

main().then(() => {
  pool.end();

  process.exit(0);
});
