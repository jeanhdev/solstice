ALTER TABLE "attribution_performance_daily" ADD COLUMN "session_id" integer NOT NULL;
DO $$ BEGIN
 ALTER TABLE "attribution_performance_daily" ADD CONSTRAINT "attribution_performance_daily_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
