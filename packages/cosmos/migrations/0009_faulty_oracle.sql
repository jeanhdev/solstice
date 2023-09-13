/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'crm_deals'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "crm_deals" DROP CONSTRAINT "<constraint_name>";
ALTER TABLE "crm_deals" ADD COLUMN "crm_company_id" varchar;
DO $$ BEGIN
 ALTER TABLE "crm_deals" ADD CONSTRAINT "crm_deals_crm_company_id_crm_company_id_fk" FOREIGN KEY ("crm_company_id") REFERENCES "crm_company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
