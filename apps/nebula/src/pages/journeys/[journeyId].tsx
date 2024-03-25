import Link from "next/link";
import { useRouter } from "next/router";
import {
  ExclamationCircleIcon,
  GlobeAsiaAustraliaIcon,
} from "@heroicons/react/24/solid";
import { type Channel } from "@solstice/cosmos/tables/channels";
import { format } from "date-fns";
import { size, uniq, uniqBy } from "lodash";

import {
  Button,
  ButtonSecondary,
  HorizontalDivider,
  JourneyKpi,
  MissingDataPlaceholder,
  Page,
} from "@nebula/ui/components";
import { LoadingLayout } from "@nebula/ui/layouts";
import { useQuerySafely } from "@nebula/hooks";
import { EnrichedVisitorSession, hasErrorKey } from "@nebula/types";
import { api } from "@nebula/utils/api";

export default function JourneysPage() {
  const { query } = useRouter();

  const { journeyId } = query;

  const { isLoading, data } = api.journey.getJourney.useQuery(
    {
      id: journeyId as string,
    },
    {
      enabled: !!journeyId,
    },
  );

  if (isLoading || !data) {
    return <LoadingLayout />;
  }

  if (hasErrorKey(data)) {
    return (
      <div className="pt-6 lg:pt-12">
        <MissingDataPlaceholder
          icon={<GlobeAsiaAustraliaIcon className="w-8 h-8" />}
          placeholder={data.errorKey}
        />
      </div>
    );
  }

  const { journey, company, enrichedVisitorSessions } = data;

  const shouldWarnAboutDirectTraffic =
    (enrichedVisitorSessions as any)[0].channel.name === "Direct";

  const { mostSeenChannel, channelCount, uniqueAnonymousIdsCount } =
    summarizeEnrichedVisitorSessions({
      enrichedVisitorSessions:
        enrichedVisitorSessions as EnrichedVisitorSession[],
    });

  return (
    <Page isDataSettingsEnabled={false}>
      <div className="w-full z-50 bg-static-surface-nested">
        <div className="h-24 bg-[url('/stone.webp')] bg-center" />

        <div className="px-12 flex justify-between items-center">
          <h1 className="title-medium py-6 text-content-strong">
            {journey.name}
          </h1>

          <ButtonSecondary label={<>Access in HubSpot</>} />
        </div>

        <div className="flex flex-col gap-4 px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <JourneyKpi
              title="Revenue"
              metrics={[
                {
                  label: "Won",
                  value: `${journey.totalRevenue}`,
                },
                {
                  label: "Pipeline",
                  value: `${journey.potentialRevenue}`,
                },
              ]}
            />
            <JourneyKpi
              title="Visits"
              metrics={[
                {
                  label: "Total",
                  value: `${enrichedVisitorSessions.length}`,
                },

                {
                  label: "Unique",
                  value: `${uniqueAnonymousIdsCount}`,
                },
              ]}
            />
            <JourneyKpi
              title="Channels"
              metrics={[
                {
                  label: "Total",
                  value: `${channelCount}`,
                },

                {
                  label: "Must seen",
                  value: `${mostSeenChannel.name}`,
                },
              ]}
            />
          </div>
          <div className="flex">
            <HorizontalDivider />
          </div>
          {shouldWarnAboutDirectTraffic && (
            <div className="p-6 bg-static-surface-sentiment-informative rounded-8">
              <div className="flex gap-4 items-start">
                <ExclamationCircleIcon className="w-6 h-6 flex-shrink-0 text-static-content-sentiment-informative" />
                <div className="flex flex-col gap-2">
                  <span className="label-default-regular text-content-strong">
                    Improve accuracy
                  </span>
                  <span className="label-default-regular">
                    We detected that the first touchpoint is coming from direct
                    traffic. In a lot of cases, the stakeholder have heard about
                    your product from another channel that is difficult to track
                    (podcast, words-of-mouth...). What we suggest is to ask{" "}
                    <span className="text-content-string">{journey.name}</span>{" "}
                    directly{" "}
                    <Link href="#" className="link">
                      by clicking here
                    </Link>
                    , we will then enrich your journey with the reported channel
                    instead of direct traffic. To learn more, see
                    <Link href="/content/dark-social" className="link">
                      {" "}
                      Dark Social
                    </Link>
                    .
                  </span>
                </div>
              </div>
            </div>
          )}
          <TouchpointsTable
            enrichedVisitorSessions={
              enrichedVisitorSessions as EnrichedVisitorSession[]
            }
          />
        </div>
      </div>
    </Page>
  );
}

function summarizeEnrichedVisitorSessions({
  enrichedVisitorSessions,
}: {
  enrichedVisitorSessions: EnrichedVisitorSession[];
}) {
  const channelCounts: { [id: number]: number } = {};
  const channels: { [id: number]: Channel } = {};
  let mostSeenChannel: Channel;
  let mostSeenChannelCount: number = 0;

  // Count the channels and track the most seen channel
  enrichedVisitorSessions.forEach((session) => {
    const channel = session.channel;
    const channelId = channel.id;
    channelCounts[channelId] = channelCounts[channelId]
      ? // @ts-ignore
        channelCounts[channelId] + 1
      : 1;
    channels[channelId] = channel;

    if (
      channelCounts[channelId] &&
      // @ts-ignore
      channelCounts[channelId] > mostSeenChannelCount
    ) {
      // @ts-ignore
      mostSeenChannelCount = channelCounts[channelId];
      mostSeenChannel = channel;
    }
  });

  const uniqueAnonymousIdsCount = size(
    uniqBy(enrichedVisitorSessions, "visitorSession.anonymousId"),
  );

  // format the results
  const channelCount = Object.keys(channelCounts).length;
  return {
    channelCount,
    mostSeenChannel: mostSeenChannel!,
    uniqueAnonymousIdsCount,
  };
}

function TouchpointsTable({
  enrichedVisitorSessions,
}: {
  enrichedVisitorSessions: EnrichedVisitorSession[];
}) {
  const { data: me } = useQuerySafely.useMe();

  return (
    <div>
      <div className="grid grid-cols-tab-touchpoints gap-12 bg-static-surface-raised pl-4 pr-[22px]">
        {["Date", "Visitor", "Channel", "URL"].map((col) => (
          <div
            key={col}
            className="py-4 text-label-small-regular text-content-moderate"
          >
            <span>{col}</span>
          </div>
        ))}
      </div>

      {enrichedVisitorSessions.map((enrichedVisitorSession: any) => {
        const { visitorSession, channel } = enrichedVisitorSession;

        const formattedDate = format(
          new Date(visitorSession.created_at),
          "HH:mm - dd/MM/yyyy",
        );
        const formattedHref = visitorSession.href
          .replaceAll(me?.companyWebsiteHostname, "")
          .replaceAll("https://", "")
          .replaceAll("https://", "");

        return (
          <div
            key={visitorSession.id}
            className="grid grid-cols-tab-touchpoints gap-12 items-center border-b border-divider-weak px-4 py-3"
          >
            <span className="paragraph-small-code text-content-default w-fit">
              {formattedDate}
            </span>
            <div className="text-label-small-regular text-content-moderate">
              {visitorSession.anonymous_id}
            </div>

            <div className="text-label-small-regular text-content-moderate">
              {channel.name}
            </div>

            <div className="text-label-small-regular text-content-moderate">
              {formattedHref}
            </div>
          </div>
        );
      })}
    </div>
  );
}
