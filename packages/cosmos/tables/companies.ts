import { InferModel } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

import { users } from "./users";

export const companySourcePgEnum = pgEnum("company_source", [
  "CRM",
  "EXTERNAL",
]);

export const companies = pgTable("companies", {
  id: varchar("id").primaryKey().notNull(),
  // Fields
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  name: varchar("name").notNull(),
  source: companySourcePgEnum("source").default("CRM").notNull(),
  domain: varchar("domain").notNull(),
  ip: varchar("ip"),
  // HS Fields
  hsObjectId: varchar("hs_object_id").notNull(),
  hsCreatedAt: timestamp("hs_created_at").notNull(),
  hsUpdatedAt: timestamp("hs_updated_at").notNull(),
  hsArchived: boolean("hs_archived").notNull(),
  // Relations
  userId: varchar("user_id")
    .references(() => users.id)
    .notNull(),
});

export type Company = InferModel<typeof companies>;

export type NewCompany = InferModel<typeof companies, "insert">;

export type CompanySource = (typeof companySourcePgEnum.enumValues)[number];

export const companiesSchema = createSelectSchema(companies);
