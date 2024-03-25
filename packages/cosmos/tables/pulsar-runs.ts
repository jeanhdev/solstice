import { InferModel } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";

export const runStatusPgEnum = pgEnum("status", [
  "PENDING",
  "IN_PROGRESS",
  "HALTED",
  "SUCCESS",
  "FAILURE",
]);

export const pulsarRuns = pgTable("pulsar_runs", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  startedAt: timestamp("started_at"),
  endedAt: timestamp("ended_at"),
  durationMs: integer("duration_ms"),
  status: runStatusPgEnum("status").default("PENDING"),
});

export type PulsarRun = InferModel<typeof pulsarRuns>;
export type NewPulsarRun = InferModel<typeof pulsarRuns, "insert">;

export type PipelineRunStatus = (typeof runStatusPgEnum.enumValues)[number];
