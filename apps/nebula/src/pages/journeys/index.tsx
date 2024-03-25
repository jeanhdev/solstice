import { Page } from "@nebula/ui/components";
import JourneysIndexSearch from "@nebula/ui/features/journeys/components/JourneysIndexSearch";
import { api } from "@nebula/utils/api";

export default function JourneysPage() {
  const { data, isLoading } = api.journey.getJourneys.useQuery();

  return (
    <Page isDataSettingsEnabled={false}>
      <div className="z-50 bg-static-surface-nested">
        <div className="flex items-center justify-center">
          <div className="my-20 flex max-w-168 flex-col gap-4 px-4">
            <div>
              <h1 className="title-medium mb-4 text-content-default opacity-100">
                <span>Access your account journeys</span>
              </h1>
              <p className="label-default-regular text-content-weak">
                <>
                  Gain a view on all the touches an account has with your
                  website: for every stage of your deals, understand the
                  performance of your marketing channels.
                </>
              </p>
            </div>
            <JourneysIndexSearch isLoading={isLoading} data={data} />
          </div>
        </div>
      </div>
    </Page>
  );
}
