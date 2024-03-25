/* eslint-disable @next/next/no-img-element */
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

import { Button, Page } from "@nebula/ui/components";
import LoadingLayout from "@nebula/ui/layouts/LoadingLayout";
import { hasErrorKey } from "@nebula/types";
import { api } from "@nebula/utils/api";

export default function OverviewPage() {
  const { data, isLoading } = api.user.getMe.useQuery();

  if (isLoading || !data) return <LoadingLayout />;

  if (hasErrorKey(data)) {
    throw Error("An error happened");
  }

  return (
    <Page isDataSettingsEnabled={false}>
      <div className="px-12 py-12">
        <div className="mx-auto flex w-fit gap-36 pl-8 pt-20">
          <div className="max-w-96 pt-20">
            <div className="flex flex-col gap-4">
              <h1 className="title-small text-content-strong">
                Connect your data
              </h1>
              <p className="paragraph-default-regular text-content-moderate">
                To enable revenue attribution, you need to connect your
                channels.
              </p>
            </div>
          </div>
          {/* Actions */}
          <div className="flex w-fit flex-col items-center gap-4">
            <OnboardingAction
              title={<>Connect your channels</>}
              description={
                <>
                  This allows us to attribute your channels and measure their
                  performance: ads (Google Ads, Facebook Ads), blog, email...
                </>
              }
              statusLabel={<>{data?.channels.length} channels added</>}
              cta={<Button size="compact" label={<>Add channel</>} />}
            />
          </div>
        </div>
      </div>
    </Page>
  );
}

const OnboardingAction = ({
  title,
  description,
  cta,
  statusLabel,
}: {
  title: ReactNode;
  description: ReactNode;
  cta: ReactNode;
  statusLabel: ReactNode;
}) => {
  return (
    <div className="w-full max-w-120 rounded-12 border-none bg-static-surface-elevated">
      <div className="my-4 flex items-start justify-between px-4">
        <div className="mr-8 flex flex-col gap-2">
          <div className="flex items-start">
            <PlusCircleIcon className="mr-1 h-5 w-5 text-content-weak" />
            <h3 className="label-large-regular text-content-default">
              {title}
            </h3>
          </div>
          <p className="label-default-regular text-content-moderate">
            {description}
          </p>
        </div>
        <div className="flex-shrink-0">{cta}</div>
      </div>
      <div className="w-full border-b border-divider-strong" />
      <div className="flex items-center justify-start px-4 py-2">
        <div className="flex h-6 w-fit items-center justify-center rounded-20 bg-static-surface-sentiment-neutral px-1.5 py-1">
          <span className="text-label-small-regular text-static-content-sentiment-neutral">
            {statusLabel}
          </span>
        </div>
      </div>
    </div>
  );
};
