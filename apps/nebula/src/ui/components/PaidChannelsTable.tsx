import PerformanceTable from "@nebula/ui/components/PerformanceTable";

export default function PaidChannelsTable({
  paidPerformance,
}: {
  paidPerformance: any;
}) {
  return (
    <PerformanceTable
      cols={["Channel", "Leads", "Customers", "CAC", "MRR", "ROAS"]}
    >
      <>
        {paidPerformance?.map((performance: any) => (
          <div
            key={performance.channel.id}
            className="grid select-none grid-cols-tab-6 gap-6 border-b border-divider-weak pl-[44px] pr-[22px]"
          >
            <div className="flex flex-row items-center py-4">
              <span className="label-small-regular text-content-default">
                {performance.channel.name}
              </span>
            </div>
            <div className="py-4">
              <span className="label-small-regular text-content-default">
                {performance.summary.leads}
              </span>
            </div>
            <div className="py-4">
              <span className="label-small-regular text-content-default">
                {performance.summary.customers}
              </span>
            </div>
            <div className="py-4">
              <span className="label-small-regular text-content-default">
                {performance.summary.cac}
              </span>
            </div>
            <div className="py-4">
              <span className="label-small-regular text-content-default">
                {performance.summary.mrr}
              </span>
            </div>
            <div className="py-4">
              <span className="label-small-regular text-content-default">
                {performance.summary.roas}
              </span>
            </div>
          </div>
        ))}
      </>
    </PerformanceTable>
  );
}

export function PaidChannelTable({
  paidChannelPerformance,
}: {
  paidChannelPerformance: any;
}) {
  return (
    <PerformanceTable
      cols={["Campaign", "Leads", "Customers", "CAC", "MRR", "ROAS"]}
    >
      <>
        {paidChannelPerformance?.paidData.map((paidData: any) => (
          <div
            key={paidData.id}
            className="grid select-none grid-cols-tab-6 gap-6 border-b border-divider-weak pl-[44px] pr-[22px]"
          >
            <div className="flex flex-row items-center py-4">
              <span className="label-small-regular truncate text-content-default ">
                {paidData.name}
              </span>
            </div>
            <div className="py-4">
              <span className="label-small-regular text-content-default">
                {paidData.leads}
              </span>
            </div>
            <div className="py-4">
              <span className="label-small-regular text-content-default">
                {paidData.customers}
              </span>
            </div>
            <div className="py-4">
              <span className="label-small-regular text-content-default">
                {paidData.cac}
              </span>
            </div>
            <div className="py-4">
              <span className="label-small-regular text-content-default">
                {paidData.mrr}
              </span>
            </div>
            <div className="py-4">
              <span className="label-small-regular text-content-default">
                {paidData.roas}
              </span>
            </div>
          </div>
        ))}
      </>
    </PerformanceTable>
  );
}
