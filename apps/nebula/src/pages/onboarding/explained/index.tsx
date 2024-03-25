import { useRouter } from "next/router";

import { Button } from "@nebula/ui/components";
import { OnboardingLayout } from "@nebula/ui/layouts";
import { ONBOARDING_PATHNAMES } from "@nebula/constants";

export default function OnboardingExplainedPage() {
  const { push } = useRouter();

  const handleStartOnboarding = () => {
    push({ pathname: ONBOARDING_PATHNAMES.CRM });
  };

  return (
    <OnboardingLayout
      title={<>Your onboarding</>}
      description={
        <div className="flex flex-col gap-4">
          <span>
            Thank you for trusting us. At Solstice, we want to proviode the most
            reliable and easy-to-use revenue attribution. After months of
            product engineering, we are excited to have you onboard to try our
            product and to help you grow.
          </span>
          <span>
            Before getting your first data, you need to onboard. It will take
            between 5 and 10 minutes. We will guide you through each of steps
            making sure you have a pleasing experience.
          </span>
          <ul className="space-y-2 list-decimal list-inside">
            <li>
              <span className="underline">Connect your CRM:</span> we need to
              connect to your CRM to get your accounts and associated deals
              data.
            </li>
            <li>
              <span className="underline">Add tracking script:</span> once your
              CRM is connected, you will add a tracking script to your website
              to track your visitors.
            </li>
            <li>
              <span className="underline">Add your channels:</span> add your
              marketing channels (organic such as your blog or paid such as
              Google Ads).
            </li>
            <li>
              <span className="underline">Choose your attribution models:</span>
              choose the revenue attribution models (from single to multi-touch)
              you want.
            </li>
          </ul>
        </div>
      }
    >
      <div className="flex justify-end">
        <Button
          onClick={handleStartOnboarding}
          type="button"
          label={<>Start onboarding</>}
        />
      </div>
    </OnboardingLayout>
  );
}
