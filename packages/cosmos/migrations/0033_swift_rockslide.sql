ALTER TABLE "pipeline_runs" ADD COLUMN "last_machine_state" varchar;
ALTER TABLE "pipeline_runs" DROP COLUMN IF EXISTS "last_completed_step";