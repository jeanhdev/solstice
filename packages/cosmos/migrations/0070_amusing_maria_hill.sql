DO $$ BEGIN
 CREATE TYPE "tracking_type" AS ENUM('PATH', 'UTM');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "user_to_attribution_models" ALTER COLUMN "is_default" SET NOT NULL;
ALTER TABLE "user_to_attribution_models" ALTER COLUMN "is_enabled" SET NOT NULL;
ALTER TABLE "channels" ADD COLUMN "tracking_type" "tracking_type" NOT NULL;
ALTER TABLE "channels" ADD COLUMN "path" varchar;