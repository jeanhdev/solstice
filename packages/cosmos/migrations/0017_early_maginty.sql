ALTER TABLE "visitor_sessions" ADD COLUMN "href" varchar NOT NULL;
ALTER TABLE "visitor_sessions" DROP COLUMN IF EXISTS "utm_source";
ALTER TABLE "visitor_sessions" DROP COLUMN IF EXISTS "utm_medium";
ALTER TABLE "visitor_sessions" DROP COLUMN IF EXISTS "utm_campaign";
ALTER TABLE "visitor_sessions" DROP COLUMN IF EXISTS "utm_term";
ALTER TABLE "visitor_sessions" DROP COLUMN IF EXISTS "utm_content";