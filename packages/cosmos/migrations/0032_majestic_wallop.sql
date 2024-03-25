ALTER TABLE "pipeline_runs" ADD COLUMN "last_completed_step" varchar;
ALTER TABLE "pipeline_runs" DROP COLUMN IF EXISTS "current_step";