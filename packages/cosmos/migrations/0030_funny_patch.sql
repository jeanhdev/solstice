CREATE TABLE IF NOT EXISTS "pulsar_runs" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"started_at" timestamp,
	"ended_at" timestamp,
	"duration_ms" integer,
	"status" status DEFAULT 'PENDING'
);

ALTER TABLE "pipeline_runs" ADD COLUMN "pulsar_run_id" integer;
DO $$ BEGIN
 ALTER TABLE "pipeline_runs" ADD CONSTRAINT "pipeline_runs_pulsar_run_id_pulsar_runs_id_fk" FOREIGN KEY ("pulsar_run_id") REFERENCES "pulsar_runs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
