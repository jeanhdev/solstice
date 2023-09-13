ALTER TABLE "visitor_sessions" ADD COLUMN "crm_company_id" varchar;
DO $$ BEGIN
 ALTER TABLE "visitor_sessions" ADD CONSTRAINT "visitor_sessions_crm_company_id_crm_company_id_fk" FOREIGN KEY ("crm_company_id") REFERENCES "crm_company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
