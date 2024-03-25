ALTER TABLE "companies" ADD COLUMN "name" varchar NOT NULL;
ALTER TABLE "companies" DROP COLUMN IF EXISTS "hs_name";