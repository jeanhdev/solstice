CREATE TABLE IF NOT EXISTS "user_to_attribution_models" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" varchar NOT NULL,
	"attribution_model_id" integer NOT NULL,
	"is_default" boolean DEFAULT false,
	"is_enabled" boolean DEFAULT true
);

ALTER TABLE "attribution_models" DROP CONSTRAINT "attribution_models_user_id_users_id_fk";

ALTER TABLE "attribution_models" DROP COLUMN IF EXISTS "short_name";
ALTER TABLE "attribution_models" DROP COLUMN IF EXISTS "description";
ALTER TABLE "attribution_models" DROP COLUMN IF EXISTS "is_default";
ALTER TABLE "attribution_models" DROP COLUMN IF EXISTS "is_enabled";
ALTER TABLE "attribution_models" DROP COLUMN IF EXISTS "user_id";
DO $$ BEGIN
 ALTER TABLE "user_to_attribution_models" ADD CONSTRAINT "user_to_attribution_models_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "user_to_attribution_models" ADD CONSTRAINT "user_to_attribution_models_attribution_model_id_attribution_models_id_fk" FOREIGN KEY ("attribution_model_id") REFERENCES "attribution_models"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DROP INDEX IF EXISTS "key_user_id_index";
CREATE UNIQUE INDEX IF NOT EXISTS "user_id_attribution_model_id_index" ON "user_to_attribution_models" ("user_id","attribution_model_id");