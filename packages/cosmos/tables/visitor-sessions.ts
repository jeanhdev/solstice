import { InferModel } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

import { channels } from "./channels";
import { companies } from "./companies";
import { journeys } from "./journeys";
import { pipelineRuns } from "./pipeline-runs";
import { users } from "./users";

export const identificationStatusPgEnum = pgEnum("identification_status", [
  "PENDING",
  "SUCCESS",
  "FAILURE",
]);

export const identificationDetailPgEnum = pgEnum("identification_detail", [
  "PENDING",
  "FIRST_PARTY_EMAIL",
  "FIRST_PARTY_IP",
  "THIRD_PARTY_EMAIL",
  "THIRD_PARTY_IP",
  "FAKE_EMAIL",
  "UNKNOWN",
]);

export const visitorSessionsTrafficTypePgEnum = pgEnum("traffic_type", [
  "DIRECT",
  "REFERRAL",
  "ORGANIC",
  "PAID",
]);

export const createdByPgEnum = pgEnum("created_by", ["AUTO", "MANUAL"]);

export const visitorSessions = pgTable("visitor_sessions", {
  // Fields
  id: varchar("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  timeWindow: integer("time_window").notNull(),
  anonymousId: varchar("anonymous_id").notNull(),
  hostname: varchar("hostname").notNull(),
  href: varchar("href").notNull(),
  referrer: varchar("referrer"),
  trafficType: visitorSessionsTrafficTypePgEnum("traffic_type"),
  identificationStatus: identificationStatusPgEnum(
    "identification_status",
  ).default("PENDING"),
  identificationDetail: identificationDetailPgEnum(
    "identification_detail",
  ).default("PENDING"),
  ip: varchar("ip"),
  email: varchar("email"),
  createdBy: createdByPgEnum("created_by").default("AUTO").notNull(),
  // Relations
  pipelineRunId: integer("pipeline_run_id")
    .references(() => pipelineRuns.id)
    .notNull(),
  userId: varchar("user_id")
    .references(() => users.id)
    .notNull(),
  companyId: varchar("company_id").references(() => companies.id),
  journeyId: integer("journey_id").references(() => journeys.id),
  channelId: integer("channel_id").references(() => channels.id, {
    onDelete: "cascade",
  }),
});

export type VisitorSession = InferModel<typeof visitorSessions>;

export type NewVisitorSession = InferModel<typeof visitorSessions, "insert">;

export type IdentificationStatus =
  (typeof identificationStatusPgEnum.enumValues)[number];

export type IdentificationDetail =
  (typeof identificationDetailPgEnum.enumValues)[number];

export type VisitorSessionsTrafficType =
  (typeof visitorSessionsTrafficTypePgEnum.enumValues)[number];

export type CreatedBy = (typeof createdByPgEnum.enumValues)[number];

export const visitorSessionsSchema = createSelectSchema(visitorSessions);
