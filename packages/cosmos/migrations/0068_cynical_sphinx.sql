CREATE TABLE IF NOT EXISTS "channels_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"user_id" varchar
);

ALTER TABLE "channels" ADD COLUMN "channel_category_id" integer;
DO $$ BEGIN
 ALTER TABLE "channels" ADD CONSTRAINT "channels_channel_category_id_channels_categories_id_fk" FOREIGN KEY ("channel_category_id") REFERENCES "channels_categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "channels" DROP COLUMN IF EXISTS "category";
CREATE UNIQUE INDEX IF NOT EXISTS "slug_index" ON "channels_categories" ("slug");