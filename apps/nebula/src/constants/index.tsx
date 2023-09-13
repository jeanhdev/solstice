export enum ONBOARDING_PATHNAMES {
  REGISTER = "/onboarding/user",
  EXPLAINED = "/onboarding/explained",
  CRM = "/onboarding/crm",
  PIPELINE = "/onboarding/pipeline",
  TRACKING = "/onboarding/tracking",
  ATTRIBUTION = "/onboarding/attribution",
  CHANNELS = "/onboarding/channels",
  FINISH = "/onboarding/finish",
}

export enum ERROR_KEYS {
  NOT_FOUND = "Not Found",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
  // Performance
  NO_DATA_DATE_RANGE = "No data for the selected date range",
  NO_DATA_MODEL = "No data for the selected model",
  NO_DATA_CHANNEL = "No data for the selected channel",
  NO_DATA_ATTRIBUTION = "No attribution data yet",
  // Journeys
  NO_DATA_JOURNEYS = "No journeys found",
  NO_DATA_JOURNEY = "No data for the selected journey",
}
