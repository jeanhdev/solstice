import { InferModel } from "drizzle-orm";
import { pgTable, serial, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const channelsCategories = pgTable(
  "channels_categories",
  {
    // Fields
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    slug: varchar("slug").notNull(),
    // Relations
    userId: varchar("user_id"),
  },
  (channelsCategory) => {
    return {
      uniqueSlugIndex: uniqueIndex("slug_index").on(channelsCategory.slug),
    };
  },
);

export type ChannelCategory = InferModel<typeof channelsCategories>;

export type NewChannelCategory = InferModel<
  typeof channelsCategories,
  "insert"
>;
