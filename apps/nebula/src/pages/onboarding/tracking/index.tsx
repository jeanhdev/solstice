import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

import { Button } from "@nebula/ui/components";
import { LoadingLayout, OnboardingLayout } from "@nebula/ui/layouts";
import { api } from "@nebula/utils/api";

export default function ScriptPage() {
  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  const { data, isLoading: isMeLoading } = api.user.getMe.useQuery();

  useEffect(() => {
    if (isInstalled) {
      setTimeout(() => {
        push({
          pathname: "/onboarding/attribution",
        });
      }, 2500);
    }
  }, [isInstalled]);

  if (isMeLoading) return <LoadingLayout />;

  const scriptHtmlContent = `

    <script src="https://api.getsolstice.com/solstice.js" data-api-key="${
      data.apiKey ? data.apiKey : ""
    }"></script>

  `;

  const verifyScriptInstallation = async () => {
    setIsLoading(true);
    const { data: scriptVerifyResponseBody } = await axios.get(
      `/api/tracking/script-verify?userWebsiteHostname=${
        // @ts-ignore
        data?.companyWebsiteHostname as string
      }`,
    );
    setIsLoading(false);
    const { isSuccess, isScriptFound, isApiKeyFound } =
      scriptVerifyResponseBody;
    if (isSuccess && isScriptFound && isApiKeyFound) {
      setIsInstalled(true);
    }
    if (!isScriptFound) {
      alert(
        "We couldn't find your script on your website. Please make sure you have copied and pasted the script correctly.",
      );
    } else if (!isApiKeyFound) {
      alert(
        "We couldn't find your API key in your script. Please make sure you have copied and pasted the script correctly.",
      );
    }
  };

  return (
    <OnboardingLayout
      title={<>Install tracking</>}
      subtitle={<>Add the script to your website</>}
      description={
        <>
          To enable Solstice tracking and power multi-touch attribution,
          copy-paste the following{" "}
          <pre className="suisse-mono inline">
            <code className="px-1 text-sm text-content-strong">
              {"<script>"}
            </code>
          </pre>{" "}
          in your website{" "}
          <pre className="suisse-mono inline">
            <code className="px-1 text-sm text-content-strong">{"<head>"}</code>
          </pre>
          section.
        </>
      }
    >
      {scriptHtmlContent && (
        <pre className="max-w-auto language-js rounded-md bg-gray-800 text-sm text-white">
          <code
            id="script"
            className="language-js inline-block max-w-full whitespace-normal break-all p-4"
          >
            {scriptHtmlContent}
          </code>
        </pre>
      )}
      <p className="label-default-regular text-content-weak">
        Once you have inserted your script, you can click on "Verify" below to
        make sure tracking is installed correctly on your website.
      </p>
      <div className="flex justify-end">
        {!isInstalled ? (
          <Button
            onClick={verifyScriptInstallation}
            type="button"
            label={isLoading ? <>Verifying installation...</> : <>Verify</>}
          />
        ) : (
          <Button label={<>Installed successfully. Redirecting...</>} />
        )}
      </div>
    </OnboardingLayout>
  );
}
