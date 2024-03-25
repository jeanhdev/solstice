ALTER TABLE "attribution_performance_daily" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "attribution_performance_daily" ALTER COLUMN "attribution_model_id" SET NOT NULL;
ALTER TABLE "attribution_performance_daily" ALTER COLUMN "channel_id" SET NOT NULL;
ALTER TABLE "attribution_performance_daily" ALTER COLUMN "journey_id" SET NOT NULL;
ALTER TABLE "attribution_performance_daily" ADD COLUMN "attributed_revenue" integer NOT NULL;