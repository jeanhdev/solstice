ALTER TABLE "crm_deals" RENAME TO "deals";
DO $$ BEGIN
 ALTER TABLE "attribution_performance_daily" ADD CONSTRAINT "attribution_performance_daily_crm_deal_id_deals_id_fk" FOREIGN KEY ("crm_deal_id") REFERENCES "deals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "attribution_performance_daily" DROP CONSTRAINT "attribution_performance_daily_crm_deal_id_crm_deals_id_fk";

DO $$ BEGIN
 ALTER TABLE "journeys_to_attribution_models" ADD CONSTRAINT "journeys_to_attribution_models_crm_deal_id_deals_id_fk" FOREIGN KEY ("crm_deal_id") REFERENCES "deals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "journeys_to_attribution_models" DROP CONSTRAINT "journeys_to_attribution_models_crm_deal_id_crm_deals_id_fk";

DO $$ BEGIN
 ALTER TABLE "deals" ADD CONSTRAINT "deals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "deals" ADD CONSTRAINT "deals_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "deals" DROP CONSTRAINT "crm_deals_user_id_users_id_fk";

ALTER TABLE "deals" DROP CONSTRAINT "crm_deals_company_id_companies_id_fk";
