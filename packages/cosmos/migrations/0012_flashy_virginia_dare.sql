ALTER TABLE "crm_company" ADD COLUMN "journey_id" integer;
ALTER TABLE "journeys" ADD COLUMN "crm_company_id" varchar NOT NULL;
DO $$ BEGIN
 ALTER TABLE "crm_company" ADD CONSTRAINT "crm_company_journey_id_journeys_id_fk" FOREIGN KEY ("journey_id") REFERENCES "journeys"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "journeys" ADD CONSTRAINT "journeys_crm_company_id_crm_company_id_fk" FOREIGN KEY ("crm_company_id") REFERENCES "crm_company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "id_crm_company_id_index" ON "journeys" ("id","crm_company_id");