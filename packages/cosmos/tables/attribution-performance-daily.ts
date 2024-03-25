import { InferModel } from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { ZodType } from "zod";

import { attributionModels } from "./attribution-models";
import { channels } from "./channels";
import { deals } from "./deals";
import { journeys } from "./journeys";
import { pipelineRuns } from "./pipeline-runs";
import { users } from "./users";
import { visitorSessions } from "./visitor-sessions";

export const attributionPerformanceDaily = pgTable(
  "attribution_performance_daily",
  {
    // Fields
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    attributedRevenue: numeric("attributed_revenue", {
      precision: 12,
      scale: 4,
    }).notNull(),
    // The scale of a numeric is the count of decimal digits in the fractional part
    // to the right of the decimal point. So the number 23.5141 has a precision of 6
    // and a scale of 4. Integers can be considered to have a scale of zero.
    // For percentage, we want 0.0975 to be stored as 0.0975
    // so with a precision of 4 and a scale of 5, we can store 0.0001 to 1.000
    weight: numeric("weight", { precision: 3, scale: 2 }).notNull(),
    // Relations
    userId: varchar("user_id")
      .references(() => users.id)
      .notNull(),
    attributionModelId: integer("attribution_model_id")
      .references(() => attributionModels.id)
      .notNull(),
    channelId: integer("channel_id")
      .references(() => channels.id)
      .notNull(),
    journeyId: integer("journey_id")
      .references(() => journeys.id)
      .notNull(),
    pipelineRunId: integer("pipeline_run_id")
      .references(() => pipelineRuns.id)
      .notNull(),
    visitorSessionId: varchar("visitor_session_id")
      .references(() => visitorSessions.id)
      .notNull(),
    crmDealId: varchar("crm_deal_id")
      .references(() => deals.id)
      .notNull(),
  },
  (attributionPerformanceDaily) => ({
    userIdAttributionModelIdChannelIdJourneyIdVisitorSessionIdUniqueIndex:
      uniqueIndex(
        "user_id_attribution_model_id_channel_id_journey_id_visitor_session_id_index",
      ).on(
        attributionPerformanceDaily.userId,
        attributionPerformanceDaily.attributionModelId,
        attributionPerformanceDaily.channelId,
        attributionPerformanceDaily.journeyId,
        attributionPerformanceDaily.visitorSessionId,
      ),
  }),
);

export type AttributionPerformanceDaily = InferModel<
  typeof attributionPerformanceDaily
>;
export type NewAttributionPerformanceDaily = InferModel<
  typeof attributionPerformanceDaily,
  "insert"
>;

export const attributionPerformanceDailySchema: ZodType = createSelectSchema(
  attributionPerformanceDaily,
);
