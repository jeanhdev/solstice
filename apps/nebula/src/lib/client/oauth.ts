import { env } from "@nebula/env.mjs";

interface RequiredAuthParams {
  client_id: string;
  redirect_uri: string;
  scope: string;
}

const getHubspotUrl = () => {
  const clientId = env.NEXT_PUBLIC_OAUTH_HUBSPOT_CLIENT_ID;
  const redirectUri = env.NEXT_PUBLIC_OAUTH_HUBSPOT_REDIRECT_URI;

  const scopes = encodeURI(
    [
      "content",
      "automation",
      "forms",
      "files",
      "tickets",
      "e-commerce",
      "sales-email-read",
      "forms-uploaded-files",
      "crm.lists.read",
      "crm.objects.contacts.read",
      "files.ui_hidden.read",
      "crm.schemas.contacts.read",
      "crm.objects.feedback_submissions.read",
      "crm.objects.companies.read crm.objects.deals.read",
      "crm.schemas.companies.read",
      "crm.schemas.deals.read",
      "crm.objects.owners.read",
    ].join(" "),
  );

  const authUrl = new URL(`https://app.hubspot.com/oauth/authorize`);

  const params: RequiredAuthParams = {
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopes,
  };

  authUrl.searchParams.append("client_id", params["client_id"]);
  authUrl.searchParams.append("redirect_uri", params["redirect_uri"]);
  authUrl.searchParams.append("scope", params["scope"]);

  return {
    authUrl,
  };
};

export const getCrmOAuthUrls = () => {
  const { authUrl: hubspotAuthUrl } = getHubspotUrl();

  return {
    oauthUrls: {
      HUBSPOT: hubspotAuthUrl,
    },
  };
};
