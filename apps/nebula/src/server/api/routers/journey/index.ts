import { channels } from "@solstice/cosmos/tables/channels";
import { Company, companies } from "@solstice/cosmos/tables/companies";
import { Journey, journeys } from "@solstice/cosmos/tables/journeys";
import { visitorSessions } from "@solstice/cosmos/tables/visitor-sessions";
import { eq, sql } from "drizzle-orm";

import { convertAmountToUSDString } from "@nebula/lib/server/api";
import { ERROR_KEYS } from "@nebula/constants";
import { apiResponseOutput } from "@nebula/server/api/outputs";
import { createTRPCRouter, protectedProcedure } from "@nebula/server/api/trpc";
import { client } from "@nebula/server/db";
import { type EnrichedVisitorSession } from "@nebula/types";

import { getJourneyInput } from "./inputs";
import { getJourneyOutput, getJourneysOutput } from "./outputs";

export const journeyRouter = createTRPCRouter({
  getJourneys: protectedProcedure
    .output(apiResponseOutput(getJourneysOutput))
    .query(async ({ ctx }) => {
      const userJourneys = await client
        .select()
        .from(journeys)
        .where(eq(journeys.userId, ctx.session.user.id));

      if (userJourneys.length === 0) {
        return {
          errorKey: ERROR_KEYS.NO_DATA_JOURNEYS,
        };
      }

      return userJourneys;
    }),
  getJourney: protectedProcedure
    .input(getJourneyInput)
    .output(apiResponseOutput(getJourneyOutput))
    .query(async ({ ctx, input }) => {
      const { id } = input;

      const result = await client
        .select({
          company: companies,
          journey: journeys,
          enrichedVisitorSessions: sql`json_agg(
        json_build_object(
          'visitorSession', ${visitorSessions}.*,
          'channel', ${channels}.*
        )
      )`,
        })
        .from(journeys)
        .innerJoin(companies, eq(journeys.companyId, companies.id))
        .innerJoin(visitorSessions, eq(journeys.id, visitorSessions.journeyId))
        .leftJoin(channels, eq(visitorSessions.channelId, channels.id))
        .where(eq(journeys.id, parseInt(id, 10)))
        .groupBy(journeys.id, companies.id)
        .execute()
        .then((r) => r[0]);

      if (!result) {
        return {
          errorKey: ERROR_KEYS.NOT_FOUND,
        };
      }

      const formattedJourney: {
        journey: Journey;
        company: Company;
        enrichedVisitorSessions: EnrichedVisitorSession[];
      } = {
        journey: {
          ...result.journey,
          totalRevenue: convertAmountToUSDString({
            amount: result.journey.totalRevenue as string,
          }),
          potentialRevenue: convertAmountToUSDString({
            amount: result.journey.potentialRevenue as string,
          }),
        },
        company: result.company,
        enrichedVisitorSessions:
          result.enrichedVisitorSessions as EnrichedVisitorSession[],
      };

      return formattedJourney;
    }),
});
