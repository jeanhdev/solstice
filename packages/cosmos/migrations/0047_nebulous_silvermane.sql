ALTER TABLE "crm_deals" ALTER COLUMN "journey_id" SET NOT NULL;
ALTER TABLE "companies" DROP CONSTRAINT "companies_journey_id_journeys_id_fk";

ALTER TABLE "companies" DROP COLUMN IF EXISTS "journey_id";
DROP INDEX IF EXISTS "id_journeys_id_index";