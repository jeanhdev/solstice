ALTER TABLE "visitor_sessions" ADD COLUMN "user_id" varchar;
DO $$ BEGIN
 ALTER TABLE "visitor_sessions" ADD CONSTRAINT "visitor_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
