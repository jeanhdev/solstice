DO $$ BEGIN
 CREATE TYPE "channel_status" AS ENUM('CREATED', 'DETECTED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "channels" ADD COLUMN "status" "channel_status" DEFAULT 'CREATED' NOT NULL;