DO $$ BEGIN
 CREATE TYPE "company_source" AS ENUM('CRM', 'EXTERNAL');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "crm_deals" DROP CONSTRAINT "crm_deals_crm_company_id_crm_company_id_fk";

ALTER TABLE "journeys" DROP CONSTRAINT "journeys_crm_company_id_crm_company_id_fk";

ALTER TABLE "visitor_sessions" DROP CONSTRAINT "visitor_sessions_crm_company_id_crm_company_id_fk";



DROP TABLE crm_company;
ALTER TABLE "companies" ALTER COLUMN "id" SET DATA TYPE varchar;
ALTER TABLE "companies" ADD COLUMN "hs_name" varchar NOT NULL;
ALTER TABLE "companies" ADD COLUMN "source" "company_source" DEFAULT 'CRM' NOT NULL;
ALTER TABLE "companies" ADD COLUMN "hs_object_id" varchar NOT NULL;
ALTER TABLE "companies" ADD COLUMN "hs_created_at" timestamp NOT NULL;
ALTER TABLE "companies" ADD COLUMN "hs_updated_at" timestamp NOT NULL;
ALTER TABLE "companies" ADD COLUMN "hs_archived" boolean NOT NULL;
ALTER TABLE "companies" ADD COLUMN "user_id" varchar NOT NULL;
ALTER TABLE "companies" ADD COLUMN "journey_id" integer;
ALTER TABLE "crm_deals" ADD COLUMN "company_id" varchar NOT NULL;
ALTER TABLE "journeys" ADD COLUMN "company_id" varchar NOT NULL;
ALTER TABLE "visitor_sessions" ADD COLUMN "company_id" varchar;
DO $$ BEGIN
 ALTER TABLE "companies" ADD CONSTRAINT "companies_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "companies" ADD CONSTRAINT "companies_journey_id_journeys_id_fk" FOREIGN KEY ("journey_id") REFERENCES "journeys"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "crm_deals" ADD CONSTRAINT "crm_deals_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;


DO $$ BEGIN
 ALTER TABLE "journeys" ADD CONSTRAINT "journeys_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;


DO $$ BEGIN
 ALTER TABLE "visitor_sessions" ADD CONSTRAINT "visitor_sessions_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;


ALTER TABLE "companies" DROP COLUMN IF EXISTS "name";
ALTER TABLE "crm_deals" DROP COLUMN IF EXISTS "crm_company_id";
ALTER TABLE "journeys" DROP COLUMN IF EXISTS "crm_company_id";
ALTER TABLE "visitor_sessions" DROP COLUMN IF EXISTS "crm_company_id";
DROP INDEX IF EXISTS "domain_unique_index";
DROP INDEX IF EXISTS "id_crm_company_id_index";
CREATE UNIQUE INDEX IF NOT EXISTS "id_journeys_id_index" ON "companies" ("id","journey_id");
CREATE UNIQUE INDEX IF NOT EXISTS "id_company_id_index" ON "journeys" ("id","company_id");