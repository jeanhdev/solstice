import { InferModel } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { pulsarRuns, runStatusPgEnum } from "./pulsar-runs";
import { users } from "./users";

export const pipelineRuns = pgTable("pipeline_runs", {
  // Fields
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  batchVisitorEventsCount: integer("batch_events_count"),
  batchVisitorSessionsCount: integer("batch_sessions_count"),
  startedAt: timestamp("started_at"),
  endedAt: timestamp("ended_at"),
  durationMs: integer("duration_ms"),
  status: runStatusPgEnum("status").default("PENDING"),
  lastMachineState: varchar("last_machine_state"),
  // Relations
  userId: varchar("user_id")
    .references(() => users.id)
    .notNull(),
  pulsarRunId: integer("pulsar_run_id")
    .references(() => pulsarRuns.id)
    .notNull(),
});

export type PipelineRun = InferModel<typeof pipelineRuns>;
export type NewPipelineRun = InferModel<typeof pipelineRuns, "insert">;
