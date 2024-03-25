ALTER TABLE "synchronisations" ALTER COLUMN "batch_events_count" DROP NOT NULL;
ALTER TABLE "synchronisations" ADD COLUMN "started_at" timestamp;
ALTER TABLE "synchronisations" ADD COLUMN "ended_at" timestamp;
ALTER TABLE "synchronisations" ADD COLUMN "user_id" varchar NOT NULL;
DO $$ BEGIN
 ALTER TABLE "synchronisations" ADD CONSTRAINT "synchronisations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "synchronisations" DROP COLUMN IF EXISTS "start_at";
ALTER TABLE "synchronisations" DROP COLUMN IF EXISTS "end_at";