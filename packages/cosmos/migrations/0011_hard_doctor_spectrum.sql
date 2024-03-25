ALTER TABLE "crm_company" ALTER COLUMN "hs_name" SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "domain_unique_index" ON "companies" ("domain");