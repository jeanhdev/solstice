DO $$ BEGIN
 CREATE TYPE "created_by" AS ENUM('AUTO', 'MANUAL');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "attribution_performance_daily" ALTER COLUMN "weight" SET DATA TYPE numeric(3, 2);
ALTER TABLE "journeys_to_attribution_models" ALTER COLUMN "attributed_revenue_margin_of_error" SET DATA TYPE numeric(3, 2);
ALTER TABLE "visitor_sessions" ADD COLUMN "created_by" "created_by" DEFAULT 'AUTO' NOT NULL;