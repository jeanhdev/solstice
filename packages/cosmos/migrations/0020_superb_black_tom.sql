ALTER TABLE "visitor_sessions" ADD COLUMN "channel_id" integer;
DO $$ BEGIN
 ALTER TABLE "visitor_sessions" ADD CONSTRAINT "visitor_sessions_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
