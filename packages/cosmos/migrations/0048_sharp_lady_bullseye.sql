CREATE TABLE IF NOT EXISTS "journeys_to_crm_deals" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"journey_id" integer NOT NULL,
	"crm_deal_id" varchar NOT NULL
);

ALTER TABLE "attribution_performance_daily" ADD COLUMN "crm_deal_id" varchar NOT NULL;
DO $$ BEGIN
 ALTER TABLE "attribution_performance_daily" ADD CONSTRAINT "attribution_performance_daily_crm_deal_id_crm_deals_id_fk" FOREIGN KEY ("crm_deal_id") REFERENCES "crm_deals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "journeys_to_crm_deals" ADD CONSTRAINT "journeys_to_crm_deals_journey_id_journeys_id_fk" FOREIGN KEY ("journey_id") REFERENCES "journeys"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "journeys_to_crm_deals" ADD CONSTRAINT "journeys_to_crm_deals_crm_deal_id_crm_deals_id_fk" FOREIGN KEY ("crm_deal_id") REFERENCES "crm_deals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "journey_id_crm_deal_id_index" ON "journeys_to_crm_deals" ("journey_id","crm_deal_id");