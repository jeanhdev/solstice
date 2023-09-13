import { useRouter } from "next/router";

import { Button } from "@nebula/ui/components";
import { OnboardingLayout } from "@nebula/ui/layouts";
import { api } from "@nebula/utils/api";

export default function FinishOnboarding() {
  const { push } = useRouter();

  const { mutateAsync, isLoading } = api.user.completeOnboarding.useMutation({
    onSuccess: () => {
      push({
        pathname: "/",
      });
    },
  });

  const handleFinishOnboarding = () =>
    mutateAsync({
      isOnboarded: true,
    });

  return (
    <OnboardingLayout
      title={<>Congratulation</>}
      subtitle={<>You're all set</>}
      description={
        <div className="flex flex-col gap-2">
          <p>
            Your CRM is now synced with Solstice, and we will soon (if not
            already) receive the first events and map it to your channels.
          </p>
          <p>
            Based on your CRM updates, we compute attribution everyday. Our
            priority is to lower the time to value.
          </p>
          <p>
            If you don't see revenue attribution for the next days, it's normal
            - as we need to collect events and map it to newly signed deals.
          </p>
          <p>
            In the meantime, you still have access to web analytics such as
            impressions per channels, or your account journeys.
          </p>
          <div className="mt-2 flex justify-end">
            <Button
              onClick={handleFinishOnboarding}
              type="button"
              label={<span>Open Solstice</span>}
            />
          </div>
        </div>
      }
    />
  );
}
