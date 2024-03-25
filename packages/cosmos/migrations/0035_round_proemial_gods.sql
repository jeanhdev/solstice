ALTER TABLE "attribution_performance_daily" ADD COLUMN "pipeline_run_id" integer NOT NULL;
DO $$ BEGIN
 ALTER TABLE "attribution_performance_daily" ADD CONSTRAINT "attribution_performance_daily_attribution_model_id_attribution_models_id_fk" FOREIGN KEY ("attribution_model_id") REFERENCES "attribution_models"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "attribution_performance_daily" ADD CONSTRAINT "attribution_performance_daily_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "attribution_performance_daily" ADD CONSTRAINT "attribution_performance_daily_journey_id_journeys_id_fk" FOREIGN KEY ("journey_id") REFERENCES "journeys"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "attribution_performance_daily" ADD CONSTRAINT "attribution_performance_daily_pipeline_run_id_pipeline_runs_id_fk" FOREIGN KEY ("pipeline_run_id") REFERENCES "pipeline_runs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
