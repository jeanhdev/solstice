import { InferModel } from "drizzle-orm";
import {
  boolean,
  integer,
  numeric,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { attributionModels } from "./attribution-models";
import { deals } from "./deals";
import { journeys } from "./journeys";

export const journeysToAttributionModels = pgTable(
  "journeys_to_attribution_models",
  {
    // Fields
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    attributedRevenueMarginOfError: numeric(
      "attributed_revenue_margin_of_error",
      { precision: 3, scale: 2 },
    ),
    isAttributionComputed: boolean("is_attribution_computed").notNull(),
    // Relations
    journeyId: integer("journey_id")
      .references(() => journeys.id)
      .notNull(),
    attributionModelId: integer("attribution_model_id")
      .references(() => attributionModels.id)
      .notNull(),
    crmDealId: varchar("crm_deal_id")
      .references(() => deals.id)
      .notNull(),
  },
  (journeysToAttributionModels) => {
    return {
      journeyIdAttributionModelIdUniqueIndex: uniqueIndex(
        "journey_id_attribution_model_id_index",
      ).on(
        journeysToAttributionModels.journeyId,
        journeysToAttributionModels.attributionModelId,
      ),
    };
  },
);

export type JourneyToAttributionModel = InferModel<
  typeof journeysToAttributionModels
>;
export type NewJourneyToAttributionModel = InferModel<
  typeof journeysToAttributionModels,
  "insert"
>;
