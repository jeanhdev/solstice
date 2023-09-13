import { InferModel } from "drizzle-orm";
import {
  boolean,
  numeric,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { companies } from "./companies";
import { users } from "./users";

export const deals = pgTable("deals", {
  id: varchar("id").primaryKey().notNull(),
  hsObjectId: varchar("hs_object_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  hsName: varchar("hs_name").notNull(),
  //
  // By default, HubSpot includes a sales pipeline with seven deal stages:
  // Appointment scheduled (20%), Qualified to buy (40%), Presentation scheduled (60%),
  // Decision maker bought-in (80%), Contract sent (90%), Closed won (100% Won),
  // and Closed lost (0% Lost). Pipelines can be customised.
  //
  hsPipelineStage: varchar("hs_pipeline_stage").notNull(),
  hsAmount: numeric("hs_amount", { precision: 12, scale: 4 }).notNull(),
  hsCloseDate: timestamp("hs_close_date"),
  hsCreatedAt: timestamp("hs_created_at").notNull(),
  hsUpdatedAt: timestamp("hs_updated_at").notNull(),
  hsPipeline: varchar("hs_pipeline").notNull(),
  hsArchived: boolean("hs_archived"),
  // Custom fields
  closedwonTimestamp: timestamp("closedwon_timestamp"),
  // Relations
  userId: varchar("user_id")
    .references(() => users.id)
    .notNull(),
  // journeyId: integer("journey_id").references(() => journeys.id).notNull(),
  companyId: varchar("company_id")
    .references(() => companies.id)
    .notNull(),
});

export type Deal = InferModel<typeof deals>;
// NOTE: we don't do new deals, only upsert directly from the CRM
export type NewDeal = InferModel<typeof deals, "insert">;
