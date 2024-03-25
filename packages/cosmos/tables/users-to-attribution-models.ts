import { InferModel } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { attributionModels } from "./attribution-models";
import { users } from "./users";

export const usersToAttributionModels = pgTable(
  "users_to_attribution_models",
  {
    // Fields
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    // Relations
    userId: varchar("user_id")
      .references(() => users.id)
      .notNull(),
    attributionModelId: integer("attribution_model_id")
      .references(() => attributionModels.id)
      .notNull(),
    isDefault: boolean("is_default").default(false).notNull(),
    isEnabled: boolean("is_enabled").default(true).notNull(),
  },
  (userToAttributionModels) => {
    return {
      userIdAttributionModelIdUniqueIndex: uniqueIndex(
        "user_id_attribution_model_id_index",
      ).on(
        userToAttributionModels.userId,
        userToAttributionModels.attributionModelId,
      ),
    };
  },
);

export type UserToAttributionModel = InferModel<
  typeof usersToAttributionModels
>;
export type NewUserToAttributionModel = InferModel<
  typeof usersToAttributionModels,
  "insert"
>;
