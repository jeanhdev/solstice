ALTER TABLE "visitor_sessions" DROP CONSTRAINT "visitor_sessions_company_id_companies_id_fk";

ALTER TABLE "visitor_sessions" DROP COLUMN IF EXISTS "company_id";