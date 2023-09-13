import { InferModel } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  userId: varchar("user_id").notNull(),
  type: varchar("type").notNull(),
  provider: varchar("provider").notNull(),
  providerAccountId: varchar("provider_account_id").notNull(),
  refreshToken: varchar("refresh_token"),
  accessToken: varchar("access_token"),
  expiresAt: integer("expires_at"),
  tokenType: varchar("token_type"),
  scope: varchar("scope"),
  idToken: varchar("id_token"),
  sessionState: varchar("session_state"),
});

export type Account = InferModel<typeof accounts>;
export type NewAccount = InferModel<typeof accounts, "insert">;
