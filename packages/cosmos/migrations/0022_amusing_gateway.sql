DO $$ BEGIN
 CREATE TYPE "traffic_type" AS ENUM('DIRECT', 'REFERRAL', 'ORGANIC', 'PAID');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "visitor_sessions" ADD COLUMN "referrer" varchar;
ALTER TABLE "visitor_sessions" ADD COLUMN "traffic_type" "traffic_type";