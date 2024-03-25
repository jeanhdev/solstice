import { InferModel } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { channelsCategories } from "./channel-categories";
import { users } from "./users";

export const channelStatusPgEnum = pgEnum("channel_status", [
  "CREATED",
  "DETECTED",
]);

export const channels = pgTable(
  "channels",
  {
    // Fields
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    name: varchar("name").notNull(),
    slug: varchar("slug").notNull(),
    status: channelStatusPgEnum("status").default("CREATED").notNull(),
    utmSource: varchar("utm_source"),
    // Relations
    userId: varchar("user_id")
      .references(() => users.id)
      .notNull(),
    categoryId: integer("channel_category_id").references(
      () => channelsCategories.id,
    ),
  },
  (channels) => {
    return {
      uniqueUtmSourceUserIdIndex: uniqueIndex("utm_source_user_id_index").on(
        channels.utmSource,
        channels.userId,
      ),
    };
  },
);

export type Channel = InferModel<typeof channels>;
export type NewChannel = InferModel<typeof channels, "insert">;
export type ChannelStatus = (typeof channelStatusPgEnum.enumValues)[number];

export const channelsSchema = createSelectSchema(channels);
export const newChannelSchema = createInsertSchema(channels);
