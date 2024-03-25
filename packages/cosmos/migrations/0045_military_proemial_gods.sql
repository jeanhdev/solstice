CREATE TABLE IF NOT EXISTS "journeys_to_attribution_models" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"journey_id" integer NOT NULL,
	"attribution_model_id" integer NOT NULL
);

ALTER TABLE "crm_deals" ADD COLUMN "hs_pipeline_stage" varchar NOT NULL;
ALTER TABLE "crm_deals" DROP COLUMN IF EXISTS "hs_stage";
DO $$ BEGIN
 ALTER TABLE "journeys_to_attribution_models" ADD CONSTRAINT "journeys_to_attribution_models_journey_id_journeys_id_fk" FOREIGN KEY ("journey_id") REFERENCES "journeys"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "journeys_to_attribution_models" ADD CONSTRAINT "journeys_to_attribution_models_attribution_model_id_attribution_models_id_fk" FOREIGN KEY ("attribution_model_id") REFERENCES "attribution_models"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "journey_id_attribution_model_id_index" ON "journeys_to_attribution_models" ("journey_id","attribution_model_id");