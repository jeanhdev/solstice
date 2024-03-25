ALTER TABLE "visitor_events" DROP CONSTRAINT "visitor_events_synchronisation_id_synchronisations_id_fk";


ALTER TABLE "visitor_sessions" DROP CONSTRAINT "visitor_sessions_synchronisation_id_synchronisations_id_fk";

ALTER TABLE "visitor_events" DROP COLUMN IF EXISTS "synchronisation_id";
ALTER TABLE "visitor_sessions" DROP COLUMN IF EXISTS "synchronisation_id";

CREATE TABLE IF NOT EXISTS "attribution_performance_daily" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" varchar,
	"attribution_model_id" integer,
	"channel_id" integer,
	"journey_id" integer
);

CREATE TABLE IF NOT EXISTS "pipeline_runs" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"batch_events_count" integer,
	"batch_sessions_count" integer,
	"started_at" timestamp,
	"ended_at" timestamp,
	"duration_ms" integer,
	"status" status DEFAULT 'PENDING',
	"current_step" integer DEFAULT 0,
	"user_id" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "pipeline_runs_to_attribution_models" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"pipeline_run_id" integer,
	"attribution_model_id" integer
);

DROP TABLE channel_performances;
DROP TABLE performances;
DROP TABLE synchronisations;
ALTER TABLE "visitor_events" ADD COLUMN "pipeline_run_id" integer;
ALTER TABLE "visitor_sessions" ADD COLUMN "pipeline_run_id" integer NOT NULL;
DO $$ BEGIN
 ALTER TABLE "visitor_events" ADD CONSTRAINT "visitor_events_pipeline_run_id_pipeline_runs_id_fk" FOREIGN KEY ("pipeline_run_id") REFERENCES "pipeline_runs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;


DO $$ BEGIN
 ALTER TABLE "visitor_sessions" ADD CONSTRAINT "visitor_sessions_pipeline_run_id_pipeline_runs_id_fk" FOREIGN KEY ("pipeline_run_id") REFERENCES "pipeline_runs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;




DO $$ BEGIN
 ALTER TABLE "attribution_performance_daily" ADD CONSTRAINT "attribution_performance_daily_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pipeline_runs" ADD CONSTRAINT "pipeline_runs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pipeline_runs_to_attribution_models" ADD CONSTRAINT "pipeline_runs_to_attribution_models_pipeline_run_id_pipeline_runs_id_fk" FOREIGN KEY ("pipeline_run_id") REFERENCES "pipeline_runs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pipeline_runs_to_attribution_models" ADD CONSTRAINT "pipeline_runs_to_attribution_models_attribution_model_id_attribution_models_id_fk" FOREIGN KEY ("attribution_model_id") REFERENCES "attribution_models"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
