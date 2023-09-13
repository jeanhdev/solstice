import {
  attributionModels,
  attributionModelsSchema,
} from "@solstice/cosmos/tables/attribution-models";
import { attributionPerformanceDaily } from "@solstice/cosmos/tables/attribution-performance-daily";
import { channels } from "@solstice/cosmos/tables/channels";
import { visitorSessions } from "@solstice/cosmos/tables/visitor-sessions";
import { and, eq, gte, lte, sql } from "drizzle-orm";
import { round } from "lodash";
import z from "zod";

import { ERROR_KEYS } from "@nebula/constants";
import { apiResponseOutput } from "@nebula/server/api/outputs";
import { createTRPCRouter, protectedProcedure } from "@nebula/server/api/trpc";
import { client } from "@nebula/server/db";

import { getChannelPerformanceInput, performanceStoreInput } from "./inputs";
import {
  getChannelPerformanceOutput,
  getChannelsPerformanceOutput,
} from "./outputs";

export const performanceRouter = createTRPCRouter({
  getChannelPerformance: protectedProcedure
    .input(getChannelPerformanceInput)
    .output(apiResponseOutput(getChannelPerformanceOutput))
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;

      const { selectedAttributionModel, selectedDateRange, selectedChannel } =
        input;

      const subquery = client
        .select({
          href: visitorSessions.href,
          totalAttributedRevenue:
            sql`SUM(${attributionPerformanceDaily.attributedRevenue})`.as(
              "total_attributed_revenue",
            ),
        })
        .from(attributionPerformanceDaily)
        .leftJoin(
          channels,
          eq(attributionPerformanceDaily.channelId, channels.id),
        )
        .leftJoin(
          attributionModels,
          eq(
            attributionPerformanceDaily.attributionModelId,
            attributionModels.id,
          ),
        )
        .leftJoin(
          visitorSessions,
          eq(attributionPerformanceDaily.visitorSessionId, visitorSessions.id),
        )
        .where(
          and(
            eq(attributionModels.id, selectedAttributionModel.id),
            eq(attributionPerformanceDaily.userId, userId),
            eq(channels.slug, selectedChannel.slug),
            gte(
              attributionPerformanceDaily.createdAt,
              selectedDateRange.startDate,
            ),
            lte(
              attributionPerformanceDaily.createdAt,
              selectedDateRange.endDate,
            ),
          ),
        )
        .groupBy(visitorSessions.href)
        .as("subquery");

      const result = await client
        .select({
          channel: channels,
          channelPerformances: sql`json_agg(json_build_object(
          'href', ${subquery.href},
          'totalAttributedRevenue', ${subquery.totalAttributedRevenue}
        ))`,
        })
        .from(subquery)
        .leftJoin(visitorSessions, eq(subquery.href, visitorSessions.href))
        .leftJoin(
          attributionPerformanceDaily,
          eq(visitorSessions.id, attributionPerformanceDaily.visitorSessionId),
        )
        .leftJoin(
          channels,
          eq(attributionPerformanceDaily.channelId, channels.id),
        )
        .groupBy(channels.id)
        .execute()
        .then((r) => r[0]);

      if (!result || !result.channel) {
        return {
          errorKey: ERROR_KEYS.NO_DATA_CHANNEL,
        };
      }

      // @ts-ignore
      const formattedPerformances = uniqByHref<
        typeof result.channelPerformances
      >(result.channelPerformances).map((p: any) => {
        const totalAttributedRevenue = round(
          parseFloat(p.totalAttributedRevenue as string),
          2,
        );
        const formattedRevenue = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(totalAttributedRevenue);
        return {
          ...performance,
          attributedRevenue: formattedRevenue,
          visitorSession: { href: p.href },
        };
      });

      const formattedResult = {
        channel: result.channel,
        channelPerformances: formattedPerformances,
      };

      return formattedResult;
    }),

  getChannelsPerformance: protectedProcedure
    .input(performanceStoreInput)
    .output(apiResponseOutput(getChannelsPerformanceOutput))
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;
      const { selectedAttributionModel, selectedDateRange } = input;

      const hasAtLeastOnePerformance = await client
        .select()
        .from(attributionPerformanceDaily)
        .where(eq(attributionPerformanceDaily.userId, userId))
        .execute();

      if (!hasAtLeastOnePerformance.length) {
        return {
          errorKey: ERROR_KEYS.NO_DATA_ATTRIBUTION,
        };
      }

      const performancePerChannel = await client
        .select({
          channel: channels,
          attributedRevenue: sql`SUM(attribution_performance_daily.attributed_revenue)`,
        })
        .from(attributionPerformanceDaily)
        .innerJoin(
          channels,
          eq(attributionPerformanceDaily.channelId, channels.id),
        )
        .leftJoin(
          attributionModels,
          eq(
            attributionPerformanceDaily.attributionModelId,
            attributionModels.id,
          ),
        )
        .where(
          and(
            eq(attributionModels.id, selectedAttributionModel.id),

            eq(attributionPerformanceDaily.userId, userId),
            gte(
              attributionPerformanceDaily.createdAt,
              selectedDateRange.startDate,
            ),
            lte(
              attributionPerformanceDaily.createdAt,
              selectedDateRange.endDate,
            ),
          ),
        )
        .groupBy(channels.id)
        .execute();

      if (!performancePerChannel.length) {
        // Check if channel createdAt is < 24 hours

        return {
          errorKey: ERROR_KEYS.NO_DATA_CHANNEL,
        };
      }

      const formattedResults = performancePerChannel.map((channel) => {
        const attributedRevenue = round(
          parseFloat(channel.attributedRevenue as string),
          2,
        );

        const formattedRevenue = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(attributedRevenue);

        return {
          channel: channel.channel,
          attributedRevenue: formattedRevenue,
        };
      });

      return formattedResults;
    }),

  getAttributionModels: protectedProcedure
    .output(apiResponseOutput(z.array(attributionModelsSchema)))
    .query(async ({ ctx }) => {
      const existingAttributionModels = await client
        .select()
        .from(attributionModels)
        .execute();

      if (!existingAttributionModels) {
        return {
          errorKey: ERROR_KEYS.NOT_FOUND,
        };
      }

      return existingAttributionModels;
    }),
});
