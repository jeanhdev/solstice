import { InferModel } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const integrationTypePgEnum = pgEnum("integration_type", ["CRM"]);

export const integrationKeyPgEnum = pgEnum("integration_key", ["HUBSPOT"]);

export const integrations = pgTable(
  "integrations",
  {
    // Fields
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    name: varchar("name").notNull(),
    url: varchar("url").notNull(),
    type: integrationTypePgEnum("integration_type").notNull(),
    key: integrationKeyPgEnum("key").notNull(),
  },
  (integrations) => {
    return {
      keyUniqueIndex: uniqueIndex("key_index").on(integrations.key),
    };
  },
);

export type Integration = InferModel<typeof integrations>;
export type NewIntegration = InferModel<typeof integrations, "insert">;
export type IntegrationType = (typeof integrationTypePgEnum.enumValues)[number];
export type IntegrationKey = (typeof integrationKeyPgEnum.enumValues)[number];
