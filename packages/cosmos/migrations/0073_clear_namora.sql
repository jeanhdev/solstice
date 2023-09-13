CREATE TABLE IF NOT EXISTS "users_to_integrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"sync_status" sync_status DEFAULT 'CONNECTED',
	"last_synced_at" timestamp,
	"values" jsonb,
	"user_id" varchar NOT NULL,
	"integration_id" integer NOT NULL
);

DROP TABLE crms;
DROP TABLE tokens;
ALTER TABLE "user_to_attribution_models" RENAME TO "users_to_attribution_models";
DO $$ BEGIN
 ALTER TABLE "users_to_attribution_models" ADD CONSTRAINT "users_to_attribution_models_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_to_attribution_models" ADD CONSTRAINT "users_to_attribution_models_attribution_model_id_attribution_models_id_fk" FOREIGN KEY ("attribution_model_id") REFERENCES "attribution_models"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "users_to_attribution_models" DROP CONSTRAINT "user_to_attribution_models_user_id_users_id_fk";

ALTER TABLE "users_to_attribution_models" DROP CONSTRAINT "user_to_attribution_models_attribution_model_id_attribution_models_id_fk";

DO $$ BEGIN
 ALTER TABLE "users_to_integrations" ADD CONSTRAINT "users_to_integrations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_to_integrations" ADD CONSTRAINT "users_to_integrations_integration_id_integrations_id_fk" FOREIGN KEY ("integration_id") REFERENCES "integrations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "user_id_integration_id_index" ON "users_to_integrations" ("user_id","integration_id");