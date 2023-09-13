ALTER TABLE "attribution_performance_daily" ADD COLUMN "visitor_session_id" varchar NOT NULL;
DO $$ BEGIN
 ALTER TABLE "attribution_performance_daily" ADD CONSTRAINT "attribution_performance_daily_visitor_session_id_visitor_sessions_id_fk" FOREIGN KEY ("visitor_session_id") REFERENCES "visitor_sessions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "attribution_performance_daily" DROP CONSTRAINT "attribution_performance_daily_session_id_sessions_id_fk";

ALTER TABLE "attribution_performance_daily" DROP COLUMN IF EXISTS "session_id";