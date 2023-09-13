import { InferModel } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { integrations } from "./integrations";
import { users } from "./users";

export const syncStatusPgEnum = pgEnum("sync_status", [
  "CONNECTED",
  "DISCONNECTED",
]);

export const usersToIntegrations = pgTable(
  "users_to_integrations",
  {
    // Fields
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    //
    syncStatus: syncStatusPgEnum("sync_status").default("CONNECTED"),
    lastSyncedAt: timestamp("last_synced_at", { mode: "string" }),
    //
    tokens: jsonb("values").$type<Record<string, string>>(),
    // Relations
    userId: varchar("user_id")
      .references(() => users.id)
      .notNull(),

    integrationId: integer("integration_id")
      .references(() => integrations.id)
      .notNull(),
  },
  (usersToIntegrations) => {
    return {
      userIdIntegrationIdUniqueIndex: uniqueIndex(
        "user_id_integration_id_index",
      ).on(usersToIntegrations.userId, usersToIntegrations.integrationId),
    };
  },
);

export type UserToIntegration = InferModel<typeof usersToIntegrations>;

export type NewUserToIntegration = InferModel<
  typeof usersToIntegrations,
  "insert"
>;
