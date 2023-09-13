ALTER TABLE "crm_deals" DROP CONSTRAINT "crm_deals_journey_id_journeys_id_fk";

ALTER TABLE "crm_deals" DROP COLUMN IF EXISTS "journey_id";