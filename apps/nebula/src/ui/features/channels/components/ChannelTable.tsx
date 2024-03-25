import { CircleStackIcon } from "@heroicons/react/24/outline";

import { LoadingCard, MissingDataPlaceholder } from "@nebula/ui/components";
import PerformanceTable from "@nebula/ui/components/PerformanceTable";
import { GetChannelPerformanceOutput } from "@nebula/server/api/routers/performance/outputs";
import { ApiResponse, hasErrorKey } from "@nebula/types";

interface ChannelTableProps {
  isLoading: boolean;
  data: ApiResponse<GetChannelPerformanceOutput>;
}

export default function ChannelTable({ isLoading, data }: ChannelTableProps) {
  if (isLoading || !data) return <LoadingCard />;

  if (hasErrorKey(data)) {
    return (
      <div className="pt-12">
        <MissingDataPlaceholder
          icon={<CircleStackIcon className="w-8 h-8" />}
          placeholder={data.errorKey}
        />
      </div>
    );
  }

  return (
    <PerformanceTable cols={["URL", "Revenue"]} size="2">
      {data.channelPerformances.map((performance) => (
        <div
          key={performance.id}
          className="grid grid-cols-tab-2 gap-6 border-b border-divider-weak pl-[44px] pr-[22px]"
        >
          <div className="flex flex-row items-center py-4">
            <span className="label-small-regular text-content-default">
              {performance.visitorSession.href}
            </span>
          </div>
          <div className="py-4">
            <span className="label-small-regular text-content-default">
              {performance.attributedRevenue}
            </span>
          </div>
        </div>
      ))}
    </PerformanceTable>
  );
}
