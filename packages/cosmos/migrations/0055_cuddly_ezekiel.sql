DROP TABLE journeys_to_crm_deals;
ALTER TABLE "journeys_to_attribution_models" ADD COLUMN "attributed_revenue_margin_of_error" numeric(12, 4);
ALTER TABLE "journeys_to_attribution_models" ADD COLUMN "crm_deal_id" varchar NOT NULL;
ALTER TABLE "journeys_to_attribution_models" ADD COLUMN "is_attribution_computed" boolean NOT NULL;
DO $$ BEGIN
 ALTER TABLE "journeys_to_attribution_models" ADD CONSTRAINT "journeys_to_attribution_models_crm_deal_id_crm_deals_id_fk" FOREIGN KEY ("crm_deal_id") REFERENCES "crm_deals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
