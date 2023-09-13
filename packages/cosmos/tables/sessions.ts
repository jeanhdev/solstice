import { InferModel } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

import { users } from "./users";

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey().notNull(),
  sessionToken: varchar("session_token").notNull(),
  expires: timestamp("expires").notNull(),
  userId: varchar("user_id")
    .references(() => users.id)
    .notNull(),
});

export type Session = InferModel<typeof sessions>;
export type NewSession = InferModel<typeof sessions, "insert">;
