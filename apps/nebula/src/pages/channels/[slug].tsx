import Link from "next/link";
import { useRouter } from "next/router";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";
import { useMemo } from "react";

import { ButtonSecondary, Page } from "@nebula/ui/components";
import { ChannelTable } from "@nebula/ui/features/channels/components";
import { ChannelLayout } from "@nebula/ui/features/channels/layouts";
import { ChannelsNav } from "@nebula/ui/features/channels/navs";
import { LoadingLayout } from "@nebula/ui/layouts";
import { useQuerySafely } from "@nebula/hooks";
import { useSafePerformanceStore } from "@nebula/stores/performance";
import { api } from "@nebula/utils/api";

export default function ChannelPage() {
  const { query, isReady } = useRouter();

  const { data: me } = useQuerySafely.useMe();

  const { selectedDateRange, selectedAttributionModel } =
    useSafePerformanceStore();

  const { data, isLoading } = api.performance.getChannelPerformance.useQuery(
    {
      selectedDateRange,
      selectedAttributionModel,
      selectedChannel: { slug: query.slug as string },
    },
    {
      enabled: isReady && !!query.slug,
    },
  );

  const correspondingChannel = useMemo(() => {
    if (!me || !query.slug) return { name: "" };
    return me.channels.find((channel: any) => channel.slug === query.slug);
  }, [me, query.slug]);

  if (!isReady) return <LoadingLayout />;

  return (
    <Page navigation={<ChannelsNav />}>
      <ChannelLayout
        title={<span className="capitalize">{correspondingChannel?.name}</span>}
        sideNotification={
          <Link href="/channels/utm">
            <ButtonSecondary
              size="compact"
              icon={<AdjustmentsHorizontalIcon className="h-4 w-4" />}
              label={<>Manage</>}
            />
          </Link>
        }
      >
        <ChannelTable isLoading={isLoading} data={data} />
      </ChannelLayout>
    </Page>
  );
}
