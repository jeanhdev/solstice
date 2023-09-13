import { z } from "zod";

const server = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXTAUTH_SECRET:
    process.env.NODE_ENV === "production"
      ? z.string().min(1)
      : z.string().min(1).optional(),
  NEXTAUTH_URL: z.preprocess(
    (str) => process.env.VERCEL_URL ?? str,
    process.env.VERCEL ? z.string().min(1) : z.string().url(),
  ),
  AUTH0_CLIENT_ID: z.string(),
  AUTH0_CLIENT_SECRET: z.string(),
  AUTH0_DOMAIN: z.string().url(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_OAUTH_HUBSPOT_CLIENT_ID: z.string(),
  NEXT_PUBLIC_OAUTH_HUBSPOT_REDIRECT_URI: z.string().url(),
  OAUTH_HUBSPOT_CLIENT_SECRET: z.string(),
  // NEXT_PUBLIC_OAUTH_LINKEDIN_CLIENT_ID: z.string(),
  // NEXT_PUBLIC_OAUTH_LINKEDIN_REDIRECT_URI: z.string().url(),
  // OAUTH_LINKEDIN_CLIENT_SECRET: z.string(),
  // NEXT_PUBLIC_OAUTH_GOOGLE_ADS_CLIENT_ID: z.string(),
  // NEXT_PUBLIC_OAUTH_GOOGLE_ADS_REDIRECT_URI: z.string().url(),
  // OAUTH_GOOGLE_ADS_CLIENT_SECRET: z.string(),
  // NEXT_PUBLIC_OAUTH_FACEBOOK_ADS_CLIENT_ID: z.string(),
  // NEXT_PUBLIC_OAUTH_FACEBOOK_ADS_REDIRECT_URI: z.string().url(),
  // OAUTH_FACEBOOK_ADS_CLIENT_SECRET: z.string(),
  // NEXT_PUBLIC_OAUTH_BING_ADS_CLIENT_ID: z.string(),
  // NEXT_PUBLIC_OAUTH_BING_ADS_REDIRECT_URI: z.string().url(),
  // OAUTH_BING_ADS_CLIENT_SECRET: z.string(),
  // NEXT_PUBLIC_OAUTH_SALESFORCE_CLIENT_ID: z.string(),
  // NEXT_PUBLIC_OAUTH_SALESFORCE_REDIRECT_URI: z.string().url(),
  // NEXT_PUBLIC_OAUTH_SALESFORCE_DOMAIN: z.string(),
  // OAUTH_SALESFORCE_CLIENT_SECRET: z.string(),
  // OAUTH_GOOGLE_ADS_DEVELOPER_TOKEN: z.string(),
});

const client = z.object({
  NEXT_PUBLIC_APP_URL: z.string().min(1),
  NEXT_PUBLIC_OAUTH_HUBSPOT_CLIENT_ID: z.string().min(1),
  NEXT_PUBLIC_OAUTH_HUBSPOT_REDIRECT_URI: z.string().min(1),
  // NEXT_PUBLIC_OAUTH_LINKEDIN_CLIENT_ID: z.string().min(1),
  // NEXT_PUBLIC_OAUTH_LINKEDIN_REDIRECT_URI: z.string().min(1),
  // NEXT_PUBLIC_OAUTH_GOOGLE_ADS_CLIENT_ID: z.string().min(1),
  // NEXT_PUBLIC_OAUTH_GOOGLE_ADS_REDIRECT_URI: z.string().min(1),
  // NEXT_PUBLIC_OAUTH_FACEBOOK_ADS_CLIENT_ID: z.string().min(1),
  // NEXT_PUBLIC_OAUTH_FACEBOOK_ADS_REDIRECT_URI: z.string().min(1),
  // NEXT_PUBLIC_OAUTH_BING_ADS_CLIENT_ID: z.string().min(1),
  // NEXT_PUBLIC_OAUTH_BING_ADS_REDIRECT_URI: z.string().min(1),
  // NEXT_PUBLIC_OAUTH_SALESFORCE_CLIENT_ID: z.string().min(1),
  // NEXT_PUBLIC_OAUTH_SALESFORCE_DOMAIN: z.string().min(1),
  // NEXT_PUBLIC_OAUTH_SALESFORCE_REDIRECT_URI: z.string().min(1),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */

const processEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_OAUTH_HUBSPOT_CLIENT_ID:
    process.env.NEXT_PUBLIC_OAUTH_HUBSPOT_CLIENT_ID,
  NEXT_PUBLIC_OAUTH_HUBSPOT_REDIRECT_URI:
    process.env.NEXT_PUBLIC_OAUTH_HUBSPOT_REDIRECT_URI,
  OAUTH_HUBSPOT_CLIENT_SECRET: process.env.OAUTH_HUBSPOT_CLIENT_SECRET,
  // NEXT_PUBLIC_OAUTH_LINKEDIN_CLIENT_ID:
  //   process.env.NEXT_PUBLIC_OAUTH_LINKEDIN_CLIENT_ID,
  // NEXT_PUBLIC_OAUTH_LINKEDIN_REDIRECT_URI:
  //   process.env.NEXT_PUBLIC_OAUTH_LINKEDIN_REDIRECT_URI,
  // OAUTH_LINKEDIN_CLIENT_SECRET: process.env.OAUTH_LINKEDIN_CLIENT_SECRET,
  // NEXT_PUBLIC_OAUTH_GOOGLE_ADS_CLIENT_ID:
  //   process.env.NEXT_PUBLIC_OAUTH_GOOGLE_ADS_CLIENT_ID,
  // NEXT_PUBLIC_OAUTH_GOOGLE_ADS_REDIRECT_URI:
  //   process.env.NEXT_PUBLIC_OAUTH_GOOGLE_ADS_REDIRECT_URI,
  // OAUTH_GOOGLE_ADS_CLIENT_SECRET: process.env.OAUTH_GOOGLE_ADS_CLIENT_SECRET,
  // NEXT_PUBLIC_OAUTH_FACEBOOK_ADS_CLIENT_ID:
  //   process.env.NEXT_PUBLIC_OAUTH_FACEBOOK_ADS_CLIENT_ID,
  // OAUTH_FACEBOOK_ADS_CLIENT_SECRET:
  //   process.env.OAUTH_FACEBOOK_ADS_CLIENT_SECRET,
  // NEXT_PUBLIC_OAUTH_FACEBOOK_ADS_REDIRECT_URI:
  //   process.env.NEXT_PUBLIC_OAUTH_FACEBOOK_ADS_REDIRECT_URI,
  // NEXT_PUBLIC_OAUTH_BING_ADS_CLIENT_ID:
  //   process.env.NEXT_PUBLIC_OAUTH_BING_ADS_CLIENT_ID,
  // NEXT_PUBLIC_OAUTH_BING_ADS_REDIRECT_URI:
  //   process.env.NEXT_PUBLIC_OAUTH_BING_ADS_REDIRECT_URI,
  // OAUTH_BING_ADS_CLIENT_SECRET: process.env.OAUTH_BING_ADS_CLIENT_SECRET,
  // NEXT_PUBLIC_OAUTH_SALESFORCE_CLIENT_ID:
  //   process.env.NEXT_PUBLIC_OAUTH_SALESFORCE_CLIENT_ID,
  // OAUTH_SALESFORCE_CLIENT_SECRET: process.env.OAUTH_SALESFORCE_CLIENT_SECRET,
  // NEXT_PUBLIC_OAUTH_SALESFORCE_DOMAIN:
  //   process.env.NEXT_PUBLIC_OAUTH_SALESFORCE_DOMAIN,
  // NEXT_PUBLIC_OAUTH_SALESFORCE_REDIRECT_URI:
  //   process.env.NEXT_PUBLIC_OAUTH_SALESFORCE_REDIRECT_URI,
  // OAUTH_GOOGLE_ADS_DEVELOPER_TOKEN:
  //   process.env.OAUTH_GOOGLE_ADS_DEVELOPER_TOKEN,
};

const merged = server.merge(client);

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env);

if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === "undefined";
  const parsed = /** @type {MergedSafeParseReturn} */ (
    isServer
      ? merged.safeParse(processEnv) // on server we can validate all env vars
      : client.safeParse(processEnv) // on client we can only validate the ones that are exposed
  );
  if (parsed.success === false) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("Invalid environment variables");
  }
  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "❌ Attempted to access a server-side environment variable on the client"
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`,
        );
      return target[/** @type {keyof typeof target} */ (prop)];
    },
  });
}

export { env };
