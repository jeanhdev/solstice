DROP INDEX IF EXISTS "utm_source_index";
CREATE UNIQUE INDEX IF NOT EXISTS "utm_source_user_id_index" ON "channels" ("utm_source","user_id");