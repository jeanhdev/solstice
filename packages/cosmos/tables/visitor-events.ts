import { InferModel } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { pipelineRuns } from "./pipeline-runs";
import { visitorSessions } from "./visitor-sessions";

export const visitorEvents = pgTable("visitor_events", {
  // Fields
  id: serial("id").primaryKey(),
  scriptVersion: varchar("script_version").notNull(),
  createdAt: timestamp("created_at", { mode: "string", precision: 6 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "string", precision: 6 })
    .defaultNow()
    .notNull(),
  name: varchar("name").notNull(),
  anonymousId: varchar("anonymous_id").notNull(),
  ip: varchar("ip"),
  href: varchar("href").notNull(),
  hostname: varchar("hostname").notNull(),
  email: varchar("email"),
  referrer: varchar("referrer"),
  // Relations
  pipelineRunId: integer("pipeline_run_id").references(() => pipelineRuns.id),
  visitorSessionId: varchar("visitor_session_id").references(
    () => visitorSessions.id,
    {
      onDelete: "cascade",
    },
  ),
});

export type VisitorEvent = InferModel<typeof visitorEvents>;

export type NewVisitorEvent = InferModel<typeof visitorEvents, "insert">;
