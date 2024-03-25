ALTER TABLE "synchronisations" ADD COLUMN "start_at" timestamp;
ALTER TABLE "synchronisations" ADD COLUMN "end_at" timestamp;
ALTER TABLE "visitor_events" ADD COLUMN "synchronisation_id" integer;
ALTER TABLE "synchronisations" DROP CONSTRAINT "synchronisations_start_event_id_visitor_events_id_fk";

ALTER TABLE "synchronisations" DROP CONSTRAINT "synchronisations_end_event_id_visitor_events_id_fk";

ALTER TABLE "synchronisations" DROP CONSTRAINT "synchronisations_start_session_id_visitor_sessions_id_fk";

ALTER TABLE "synchronisations" DROP CONSTRAINT "synchronisations_end_session_id_visitor_sessions_id_fk";

DO $$ BEGIN
 ALTER TABLE "visitor_events" ADD CONSTRAINT "visitor_events_synchronisation_id_synchronisations_id_fk" FOREIGN KEY ("synchronisation_id") REFERENCES "synchronisations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "synchronisations" DROP COLUMN IF EXISTS "finished_at";
ALTER TABLE "synchronisations" DROP COLUMN IF EXISTS "start_event_id";
ALTER TABLE "synchronisations" DROP COLUMN IF EXISTS "end_event_id";
ALTER TABLE "synchronisations" DROP COLUMN IF EXISTS "start_session_id";
ALTER TABLE "synchronisations" DROP COLUMN IF EXISTS "end_session_id";