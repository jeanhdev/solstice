import { NextApiRequest, NextApiResponse } from "next";
import { chromium } from "playwright";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!req.query.userWebsiteHostname) {
    return res.status(400).json({ message: "Missing userWebsiteHostname." });
  }

  const { userWebsiteHostname } = req.query;

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(`https://${userWebsiteHostname as string}`);

  const scriptElement = await page.$(
    'script[src="https://api.getsolstice.com/solstice.js"]',
  );

  if (scriptElement) {
    const apiKey = await scriptElement.getAttribute("data-api-key");
    if (apiKey && apiKey.length > 0) {
      res.status(200).json({
        isSuccess: true,
        isScriptFound: true,
        isApiKeyFound: true,
        message: "Script successfully validated.",
        apiKey,
      });
    } else {
      res.status(200).json({
        isSuccess: false,
        isScriptFound: true,
        isApiKeyFound: false,
        message: "Script found, but API key is missing or invalid.",
      });
    }
  } else {
    res.status(200).json({
      isSuccess: false,
      isScriptFound: false,
      isApiKeyFound: false,
      message: "Script not found.",
    });
  }

  await browser.close();
}
