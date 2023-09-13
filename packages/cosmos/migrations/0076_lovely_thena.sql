ALTER TABLE "visitor_events" DROP CONSTRAINT "visitor_events_visitor_session_id_visitor_sessions_id_fk";
DO $$ BEGIN
 ALTER TABLE "visitor_events" ADD CONSTRAINT "visitor_events_visitor_session_id_visitor_sessions_id_fk" FOREIGN KEY ("visitor_session_id") REFERENCES "visitor_sessions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "visitor_sessions" DROP CONSTRAINT "visitor_sessions_channel_id_channels_id_fk";
DO $$ BEGIN
 ALTER TABLE "visitor_sessions" ADD CONSTRAINT "visitor_sessions_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
