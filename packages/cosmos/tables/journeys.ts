import { InferModel } from "drizzle-orm";
import {
  numeric,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

import { companies } from "./companies";
import { users } from "./users";

export const journeyStagePgEnum = pgEnum("journey_stage", [
  "LEAD",
  "PROSPECT",
  "CUSTOMER",
]);

export const journeys = pgTable(
  "journeys",
  {
    // Fields
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    name: varchar("name").notNull(),
    //
    stage: journeyStagePgEnum("stage").default("LEAD"),
    // total realised revenue from deals
    totalRevenue: numeric("total_revenue", {
      precision: 12,
      scale: 4,
    }).notNull(),
    // total expected revenue from deals
    potentialRevenue: numeric("potential_revenue", {
      precision: 12,
      scale: 4,
    }).notNull(),
    // Relations
    userId: varchar("user_id")
      .references(() => users.id)
      .notNull(),
    companyId: varchar("company_id")
      .references(() => companies.id)
      .notNull(),
  },
  (journeys) => {
    return {
      userIdCompanyIdUniqueIndex: uniqueIndex("user_id_company_id_index").on(
        journeys.userId,
        journeys.companyId,
      ),
    };
  },
);

export type JourneyStage = (typeof journeyStagePgEnum.enumValues)[number];

export type Journey = InferModel<typeof journeys>;
export type NewJourney = InferModel<typeof journeys, "insert">;

export const journeysSchema = createSelectSchema(journeys);
