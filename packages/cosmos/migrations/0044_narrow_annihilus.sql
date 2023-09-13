DROP INDEX IF EXISTS "id_company_id_index";
CREATE UNIQUE INDEX IF NOT EXISTS "user_id_company_id_index" ON "journeys" ("user_id","company_id");