import { InferModel } from "drizzle-orm";
import {
  boolean,
  jsonb,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  isOnboarded: boolean("is_onboarded").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  email: varchar("email").notNull(),
  emailVerified: timestamp("email_verified"),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  companyName: varchar("company_name"),
  companyWebsiteHostname: varchar("company_website_hostname"),
  companyRole: varchar("company_role"),
  triggerCustomer: jsonb("trigger_customer"),
  triggerProspect: jsonb("trigger_prospect"),
  apiKey: varchar("api_key"),
});

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, "insert">;

export const usersSchema = createSelectSchema(users);
