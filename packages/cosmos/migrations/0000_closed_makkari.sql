DO $$ BEGIN
 CREATE TYPE "attribution_model_key" AS ENUM('FIRST_TOUCH', 'LAST_TOUCH', 'LINEAR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "channel_type" AS ENUM('UTM', 'PATH', 'SOCIAL');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "crm_key" AS ENUM('HUBSPOT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "identification_detail" AS ENUM('PENDING', 'FIRST_PARTY_EMAIL', 'FIRST_PARTY_IP', 'THIRD_PARTY_EMAIL', 'THIRD_PARTY_IP', 'FAKE_EMAIL', 'UNKNOWN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "identification_status" AS ENUM('PENDING', 'SUCCESS', 'FAILURE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "integration_key" AS ENUM('HUBSPOT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "integration_type" AS ENUM('CRM');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "journey_stage" AS ENUM('LEAD', 'PROSPECT', 'CUSTOMER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "sync_status" AS ENUM('CONNECTED', 'DISCONNECTED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('PENDING', 'IN_PROGRESS', 'SUCCESS', 'FAILURE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" varchar NOT NULL,
	"type" varchar NOT NULL,
	"provider" varchar NOT NULL,
	"provider_account_id" varchar NOT NULL,
	"refresh_token" varchar,
	"access_token" varchar,
	"expires_at" integer,
	"token_type" varchar,
	"scope" varchar,
	"id_token" varchar,
	"session_state" varchar
);

CREATE TABLE IF NOT EXISTS "attribution_models" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"short_name" varchar NOT NULL,
	"multi_touch" boolean NOT NULL,
	"description" varchar NOT NULL,
	"attribution_model_key" attribution_model_key NOT NULL,
	"is_default" boolean DEFAULT false,
	"is_enabled" boolean DEFAULT true,
	"user_id" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "channel_performances" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar,
	"leads" varchar,
	"customers" varchar,
	"impressions" varchar,
	"mrr" varchar,
	"user_id" varchar,
	"channel_id" integer,
	"performance_id" integer
);

CREATE TABLE IF NOT EXISTS "channels" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"type" channel_type NOT NULL,
	"user_id" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar NOT NULL,
	"domain" varchar NOT NULL,
	"ip" varchar
);

CREATE TABLE IF NOT EXISTS "crm_company" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar NOT NULL,
	"domain" varchar NOT NULL,
	"user_id" varchar,
	"company_id" integer
);

CREATE TABLE IF NOT EXISTS "crm_deals" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"crm_company_id" integer NOT NULL,
	"journey_id" integer
);

CREATE TABLE IF NOT EXISTS "crms" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar NOT NULL,
	"url" varchar NOT NULL,
	"last_synced" timestamp,
	"sync_status" sync_status DEFAULT 'CONNECTED',
	"key" crm_key NOT NULL,
	"user_id" varchar,
	"integration_id" integer
);

CREATE TABLE IF NOT EXISTS "integrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar NOT NULL,
	"url" varchar NOT NULL,
	"integration_type" integration_type NOT NULL,
	"key" integration_key NOT NULL,
	"user_id" varchar
);

CREATE TABLE IF NOT EXISTS "journeys" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar NOT NULL,
	"stage" journey_stage DEFAULT 'LEAD',
	"total_revenue" integer NOT NULL,
	"potential_revenue" integer NOT NULL,
	"user_id" varchar,
	"crm_company_id" integer
);

CREATE TABLE IF NOT EXISTS "performances" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"attribution_model_id" integer NOT NULL,
	"user_id" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_token" varchar NOT NULL,
	"expires" timestamp NOT NULL,
	"user_id" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "synchronisations" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"batch_events_count" integer NOT NULL,
	"batch_sessions_count" integer,
	"finished_at" timestamp,
	"duration_ms" integer,
	"status" status DEFAULT 'PENDING',
	"start_event_id" integer NOT NULL,
	"end_event_id" integer NOT NULL,
	"start_session_id" varchar,
	"end_session_id" varchar
);

CREATE TABLE IF NOT EXISTS "tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"values" jsonb,
	"user_id" varchar,
	"integration_id" integer
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"email_verified" timestamp,
	"first_name" varchar,
	"last_name" varchar,
	"company_name" varchar,
	"company_website_hostname" varchar,
	"company_role" varchar,
	"trigger_customer" jsonb,
	"trigger_prospect" jsonb,
	"api_key" varchar
);

CREATE TABLE IF NOT EXISTS "verification_tokens" (
	"identifier" varchar NOT NULL,
	"token" varchar NOT NULL,
	"expires" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "visitor_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"script_version" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar NOT NULL,
	"anonymous_id" varchar NOT NULL,
	"ip" varchar,
	"href" varchar NOT NULL,
	"hostname" varchar NOT NULL,
	"email" varchar,
	"referrer" varchar,
	"visitor_session_id" varchar
);

CREATE TABLE IF NOT EXISTS "visitor_sessions" (
	"id" varchar PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"time_window" integer NOT NULL,
	"anonymous_id" varchar NOT NULL,
	"hostname" varchar NOT NULL,
	"utm_source" varchar,
	"utm_medium" varchar,
	"utm_campaign" varchar,
	"utm_term" varchar,
	"utm_content" varchar,
	"identification_status" identification_status DEFAULT 'PENDING',
	"identification_detail" identification_detail DEFAULT 'PENDING',
	"ip" varchar,
	"email" varchar,
	"company_id" integer,
	"synchronisation_id" integer NOT NULL,
	"journey_id" integer
);

DO $$ BEGIN
 ALTER TABLE "attribution_models" ADD CONSTRAINT "attribution_models_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "channel_performances" ADD CONSTRAINT "channel_performances_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "channel_performances" ADD CONSTRAINT "channel_performances_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "channel_performances" ADD CONSTRAINT "channel_performances_performance_id_performances_id_fk" FOREIGN KEY ("performance_id") REFERENCES "performances"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "channels" ADD CONSTRAINT "channels_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "crm_company" ADD CONSTRAINT "crm_company_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "crm_company" ADD CONSTRAINT "crm_company_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "crm_deals" ADD CONSTRAINT "crm_deals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "crm_deals" ADD CONSTRAINT "crm_deals_crm_company_id_crm_company_id_fk" FOREIGN KEY ("crm_company_id") REFERENCES "crm_company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "crm_deals" ADD CONSTRAINT "crm_deals_journey_id_journeys_id_fk" FOREIGN KEY ("journey_id") REFERENCES "journeys"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "crms" ADD CONSTRAINT "crms_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "crms" ADD CONSTRAINT "crms_integration_id_integrations_id_fk" FOREIGN KEY ("integration_id") REFERENCES "integrations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "integrations" ADD CONSTRAINT "integrations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "journeys" ADD CONSTRAINT "journeys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "journeys" ADD CONSTRAINT "journeys_crm_company_id_crm_company_id_fk" FOREIGN KEY ("crm_company_id") REFERENCES "crm_company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "performances" ADD CONSTRAINT "performances_attribution_model_id_attribution_models_id_fk" FOREIGN KEY ("attribution_model_id") REFERENCES "attribution_models"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "performances" ADD CONSTRAINT "performances_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "synchronisations" ADD CONSTRAINT "synchronisations_start_event_id_visitor_events_id_fk" FOREIGN KEY ("start_event_id") REFERENCES "visitor_events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "synchronisations" ADD CONSTRAINT "synchronisations_end_event_id_visitor_events_id_fk" FOREIGN KEY ("end_event_id") REFERENCES "visitor_events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "synchronisations" ADD CONSTRAINT "synchronisations_start_session_id_visitor_sessions_id_fk" FOREIGN KEY ("start_session_id") REFERENCES "visitor_sessions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "synchronisations" ADD CONSTRAINT "synchronisations_end_session_id_visitor_sessions_id_fk" FOREIGN KEY ("end_session_id") REFERENCES "visitor_sessions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "tokens" ADD CONSTRAINT "tokens_integration_id_integrations_id_fk" FOREIGN KEY ("integration_id") REFERENCES "integrations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "visitor_events" ADD CONSTRAINT "visitor_events_visitor_session_id_visitor_sessions_id_fk" FOREIGN KEY ("visitor_session_id") REFERENCES "visitor_sessions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "visitor_sessions" ADD CONSTRAINT "visitor_sessions_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "visitor_sessions" ADD CONSTRAINT "visitor_sessions_synchronisation_id_synchronisations_id_fk" FOREIGN KEY ("synchronisation_id") REFERENCES "synchronisations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "visitor_sessions" ADD CONSTRAINT "visitor_sessions_journey_id_journeys_id_fk" FOREIGN KEY ("journey_id") REFERENCES "journeys"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "key_user_id_index" ON "attribution_models" ("attribution_model_key","user_id");
CREATE UNIQUE INDEX IF NOT EXISTS "name_domain_user_id_index" ON "crm_company" ("name","domain","user_id");
CREATE UNIQUE INDEX IF NOT EXISTS "name_user_id_index" ON "crm_deals" ("name","user_id");
CREATE UNIQUE INDEX IF NOT EXISTS "user_id_integration_id_index" ON "crms" ("user_id","integration_id");
CREATE UNIQUE INDEX IF NOT EXISTS "key_index" ON "integrations" ("key");
CREATE UNIQUE INDEX IF NOT EXISTS "integration_id_user_id_index" ON "tokens" ("integration_id","user_id");
CREATE UNIQUE INDEX IF NOT EXISTS "identifier_token_index" ON "verification_tokens" ("identifier","token");