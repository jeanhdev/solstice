ALTER TABLE "visitor_events" ALTER COLUMN "created_at" SET DATA TYPE timestamp(6);
ALTER TABLE "visitor_events" ALTER COLUMN "updated_at" SET DATA TYPE timestamp(6);
ALTER TABLE "crm_deals" ADD COLUMN "stage" varchar NOT NULL;
ALTER TABLE "crm_deals" ADD COLUMN "amount" varchar NOT NULL;
ALTER TABLE "crm_deals" ADD COLUMN "close_date" timestamp;
ALTER TABLE "crm_deals" ADD COLUMN "create_date" timestamp NOT NULL;
ALTER TABLE "crm_deals" ADD COLUMN "last_modified_date" timestamp NOT NULL;
ALTER TABLE "crm_deals" ADD COLUMN "object_id" varchar NOT NULL;
ALTER TABLE "crm_deals" ADD COLUMN "pipeline" varchar NOT NULL;