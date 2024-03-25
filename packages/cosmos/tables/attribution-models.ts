import { InferModel } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

export const attributionModelKeyPgEnum = pgEnum("attribution_model_key", [
  "FIRST_TOUCH",
  "LAST_TOUCH",
  "LINEAR",
  "U_SHAPED",
]);

export const attributionModels = pgTable(
  "attribution_models",
  {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    key: attributionModelKeyPgEnum("attribution_model_key").notNull(),
    isMultiTouch: boolean("multi_touch").notNull(),
    //
  },
  (attributionModels) => {
    return {
      keyUniqueIndex: uniqueIndex("key_index").on(attributionModels.key),
    };
  },
);

export type AttributionModel = InferModel<typeof attributionModels>;
export type NewAttributionModel = InferModel<
  typeof attributionModels,
  "insert"
>;

export type AttributionModelKey =
  (typeof attributionModelKeyPgEnum.enumValues)[number];

export const attributionModelsSchema = createSelectSchema(attributionModels);
