type SourceCategory = "paid" | "email" | "organic" | "referral";

const sourceCategories: Record<SourceCategory, string[]> = {
  paid: [
    "facebook",
    "google_ads",
    "linkedin",
    "twitter",
    "bing",
    "pinterest",
    "snapchat",
    "tiktok",
    "taboola",
    "outbrain",
  ],
  email: ["newsletter", "welcome", "promotion", "transactional", "digest"],
  organic: ["google", "bing", "duckduckgo", "yahoo", "baidu", "yandex"],
  referral: ["reddit", "quora", "medium", "stackoverflow", "github", "youtube"],
};

export const getSourceCategory = (source: string): SourceCategory | null => {
  const sourceLowerCase = source.toLowerCase();

  for (const category in sourceCategories) {
    if (
      sourceCategories[category as SourceCategory].includes(sourceLowerCase)
    ) {
      return category as SourceCategory;
    }
  }

  return null;
};

export const usePreviewUTMPaths = ({
  basePath,
  utmSource,
}: {
  basePath: string;
  utmSource?: string | null;
}) => {
  if (!utmSource) return { previewPaths: { valid: [], invalid: [] } };
  const sourceCategory = getSourceCategory(utmSource);

  const generateUrl = (source: string, invalid = false): string => {
    const campaign = sourceCategory
      ? `${utmSource}_${sourceCategory}_campaign`
      : "";
    const medium = sourceCategory || "";

    return invalid
      ? `${basePath}?utm_sourc=${source}&...`
      : `${basePath}?utm_source=${source}&...`;
  };

  return {
    previewPaths: {
      valid: [generateUrl(utmSource)],
      invalid: [generateUrl(utmSource, true)],
    },
  };
};
