ALTER TABLE "visitor_sessions" ALTER COLUMN "user_id" SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "utm_source_index" ON "channels" ("utm_source");