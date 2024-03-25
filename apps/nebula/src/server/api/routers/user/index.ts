import { attributionModels } from "@solstice/cosmos/tables/attribution-models";
import {
  NewChannel,
  channels,
  channelsSchema,
} from "@solstice/cosmos/tables/channels";
import { users } from "@solstice/cosmos/tables/users";
import {
  NewUserToAttributionModel,
  usersToAttributionModels,
} from "@solstice/cosmos/tables/users-to-attribution-models";
import { and, eq, sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { createSlug } from "@nebula/api/helpers";
import { ERROR_KEYS } from "@nebula/constants";
import { completeUserFormSchema, triggerSchema } from "@nebula/schemas";
import { createTRPCRouter, protectedProcedure } from "@nebula/server/api/trpc";
import { client } from "@nebula/server/db";
import { SyncStatusMap } from "@nebula/types";

import { apiResponseOutput } from "../../outputs";
import {
  addChannelInput,
  completeOnboardingInput,
  updateUserToAttributionModelsInput,
} from "./inputs";
import { getMeOutput } from "./outputs";

export const userRouter = createTRPCRouter({
  getMe: protectedProcedure
    .output(apiResponseOutput(getMeOutput))
    .query(async ({ ctx }) => {
      const user = await client
        .select({
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          isOnboarded: users.isOnboarded,
          companyWebsiteHostname: users.companyWebsiteHostname,
          apiKey: users.apiKey,
        })
        .from(users)
        .where(eq(users.id, ctx.session.user.id))
        .execute()
        .then((res) => res[0]);

      if (!user) {
        return {
          errorKey: ERROR_KEYS.NOT_FOUND,
        };
      }

      const userChannels = await client
        .select()
        .from(channels)
        .where(eq(channels.userId, ctx.session.user.id))
        .execute();

      if (!userChannels && user.isOnboarded) {
        return {
          errorKey: ERROR_KEYS.NOT_FOUND,
        };
      }

      const userAttributionModels = await client
        .select({
          id: attributionModels.id,
          name: attributionModels.name,
          key: attributionModels.key,
          isMultiTouch: attributionModels.isMultiTouch,
          isDefault: usersToAttributionModels.isDefault,
        })
        .from(usersToAttributionModels)
        .innerJoin(
          attributionModels,
          eq(usersToAttributionModels.attributionModelId, attributionModels.id),
        )
        .where(and(eq(usersToAttributionModels.userId, ctx.session.user.id)))
        .execute();

      if (!userAttributionModels.length && user.isOnboarded) {
        return {
          errorKey: ERROR_KEYS.NOT_FOUND,
        };
      }

      return {
        ...user,
        channels: userChannels,
        attributionModels: userAttributionModels,
      };
    }),

  getTrackingComponentsStatus: protectedProcedure.query(({}) => {
    const trackingComponentsStatus = [
      { name: "Tracking script", status: SyncStatusMap["DISCONNECTED"] },
      { name: "First-party subdomain", status: SyncStatusMap["DISCONNECTED"] },
      { name: "Tracking API", status: SyncStatusMap["DISCONNECTED"] },
    ];
    return trackingComponentsStatus;
  }),

  completeUser: protectedProcedure
    .input(completeUserFormSchema)
    .mutation(async ({ ctx, input }) => {
      await client
        .update(users)
        .set({ ...input, apiKey: uuidv4() })
        .where(eq(users.id, ctx.session.user.id));
    }),

  completeOnboarding: protectedProcedure
    .input(completeOnboardingInput)
    .mutation(async ({ ctx, input }) => {
      const { isOnboarded } = input;
      await client
        .update(users)
        .set({
          isOnboarded,
        })
        .where(eq(users.id, ctx.session.user.id))
        .execute();
    }),

  updateJourneyTriggers: protectedProcedure
    .input(
      z.object({
        crmKey: z.string(),
        triggers: z.object({
          triggerProspect: triggerSchema,
          triggerCustomer: triggerSchema,
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        triggers: { triggerCustomer, triggerProspect },
      } = input;

      await client.update(users).set({
        triggerCustomer,
        triggerProspect,
      });
      return true;
    }),

  updateAttributionModels: protectedProcedure
    .input(updateUserToAttributionModelsInput)
    .mutation(async ({ ctx, input }) => {
      const { updatedAttributionModels } = input;

      const newRelations: NewUserToAttributionModel[] =
        updatedAttributionModels.map((model) => ({
          attributionModelId: model.attributionModelId,
          userId: ctx.session.user.id,
        }));

      await client
        .insert(usersToAttributionModels)
        .values(newRelations)
        .onConflictDoUpdate({
          target: [
            usersToAttributionModels.userId,
            usersToAttributionModels.attributionModelId,
          ],
          set: {
            attributionModelId: sql`${usersToAttributionModels.attributionModelId}`,
          },
        })
        .execute();
    }),
  addChannels: protectedProcedure
    .input(z.array(addChannelInput))
    .output(apiResponseOutput(z.array(channelsSchema)))
    .mutation(async ({ ctx, input }) => {
      // Create new channel_categories from the input
      // const newChannelsCategories: NewChannelCategory[] = input.map(
      //   (channel) => ({
      //     ...channel,
      //     slug: createSlug(channel.category),
      //     userId: ctx.session.user.id,
      //   }),
      // );

      // Insert them into the database
      // const createdChannelsCategories = await client
      //   .insert(channelsCategories)
      //   .values(newChannelsCategories)
      //   .returning();

      // if (
      //   !createdChannelsCategories.length ||
      //   !createdChannelsCategories.length
      // )
      //   throw Error("No categories created");

      // Create new channels from the input
      const newChannels: NewChannel[] = input.map((channel) => ({
        ...channel,
        // name: channel.name,
        slug: createSlug(channel.name),
        // utmSource: channel.utmSource,
        // trackingType: "UTM",
        // categoryId: createdChannelsCategories.find(
        //   (category) => category.name === channel.category,
        // )!.id,
        userId: ctx.session.user.id,
      }));

      const createdChannels = await client
        .insert(channels)
        .values(newChannels)
        .returning();

      if (!createdChannels.length) {
        return {
          errorKey: ERROR_KEYS.INTERNAL_SERVER_ERROR,
        };
      }

      return createdChannels;
    }),
});
