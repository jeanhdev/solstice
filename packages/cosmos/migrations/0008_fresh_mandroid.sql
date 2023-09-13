ALTER TABLE "journeys" DROP CONSTRAINT "journeys_crm_company_id_crm_company_id_fk";
ALTER TABLE "crm_deals" DROP CONSTRAINT "crm_deals_crm_company_id_crm_company_id_fk";
ALTER TABLE "crm_company" ALTER COLUMN "id" SET DATA TYPE varchar;
ALTER TABLE "crm_company" ALTER COLUMN "hs_object_id" SET NOT NULL;
ALTER TABLE "crm_deals" ALTER COLUMN "id" SET DATA TYPE varchar;

ALTER TABLE "crm_deals" DROP COLUMN IF EXISTS "crm_company_id";
ALTER TABLE "journeys" DROP COLUMN IF EXISTS "crm_company_id";
DROP INDEX IF EXISTS "hs_id_user_id_index";