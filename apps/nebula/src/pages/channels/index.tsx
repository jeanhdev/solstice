import { Page } from "@nebula/ui/components";
import { ChannelsTable } from "@nebula/ui/features/channels/components";
import { ChannelLayout } from "@nebula/ui/features/channels/layouts";
import { ChannelsNav } from "@nebula/ui/features/channels/navs";
import { useSafePerformanceStore } from "@nebula/stores/performance";
import { api } from "@nebula/utils/api";

export default function ChannelsOverviewPage() {
  const { selectedDateRange, selectedAttributionModel } =
    useSafePerformanceStore();

  const { data, isLoading } = api.performance.getChannelsPerformance.useQuery({
    selectedDateRange,
    selectedAttributionModel,
  });

  return (
    <Page navigation={<ChannelsNav />}>
      <ChannelLayout title={<>Channels overview</>}>
        <ChannelsTable isLoading={isLoading} data={data} />
      </ChannelLayout>
    </Page>
  );
}
