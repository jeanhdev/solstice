ALTER TABLE "integrations" DROP CONSTRAINT "integrations_user_id_users_id_fk";

ALTER TABLE "integrations" DROP COLUMN IF EXISTS "user_id";