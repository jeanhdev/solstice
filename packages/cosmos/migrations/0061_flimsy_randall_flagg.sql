ALTER TABLE "users" ALTER COLUMN "company_website_hostname" DROP NOT NULL;
ALTER TABLE "users" ADD COLUMN "password_hash" varchar;