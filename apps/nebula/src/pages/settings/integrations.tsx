import { format } from "date-fns";

import { LoadingCard } from "@nebula/ui/components";
import {
  LabelStatus,
  SentimentBadge,
} from "@nebula/ui/components/SentimentBadge";
import { SectionLayout, SettingsLayout } from "@nebula/ui/layouts";
import {
  IntegrationTypeMap,
  SyncStatusMap,
  SyncedIntegrations,
} from "@nebula/types";
import { api } from "@nebula/utils/api";

export default function AccountPage() {
  const { data: syncedIntegrations, isLoading: isSyncedIntegrationsLoading } =
    api.integration.getSyncedIntegrations.useQuery();

  const {
    data: trackingComponentsStatus,
    isLoading: isTrackingComponentsStatusLoading,
  } = api.user.getTrackingComponentsStatus.useQuery();

  return (
    <SettingsLayout>
      <section aria-labelledby="account-details">
        <div className="px-8 py-12">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="text-title-medium font-title-medium text-white">
                Integrations
              </h1>
              <div className="pb-2" />
              <p className="label-default-regular text-content-moderate">
                Integrations are divided in two parts: tracking and other
                integrations. Solstice integrations concerns the tracking script
                and our API processing the events. Other integrations concerns
                your CRM and your paid channels.
              </p>
            </div>

            <SectionLayout
              title="Tracking"
              description={
                <span>
                  The status of your tracking integration through the tracking
                  script installed on your website and our tracking API that
                  receives the events.
                </span>
              }
            >
              {isTrackingComponentsStatusLoading ? (
                <LoadingCard />
              ) : (
                <TrackingTable
                  cols={["Name", "Status"]}
                  rows={trackingComponentsStatus}
                />
              )}
            </SectionLayout>
            {isSyncedIntegrationsLoading ? (
              <LoadingCard />
            ) : (
              <SectionLayout
                title="Integrations"
                description={
                  <span>Each integrations is synced at least once a day. </span>
                }
              >
                <IntegrationsTable
                  cols={["Name", "Type", "Status", "Last sync"]}
                  syncedIntegrations={(syncedIntegrations as any) || []}
                />
              </SectionLayout>
            )}
          </div>
        </div>
      </section>
    </SettingsLayout>
  );
}

function IntegrationsTable({
  cols,
  syncedIntegrations,
}: {
  cols: string[];
  syncedIntegrations: SyncedIntegrations[];
}) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-[10px] bg-static-surface-raised pl-4 pr-[22px]">
        {cols.map((col) => (
          <div
            key={col}
            className="py-4 text-label-small-regular text-content-moderate"
          >
            <span>{col}</span>
          </div>
        ))}
      </div>
      {syncedIntegrations.map((syncedIntegration) => {
        const formattedLastSynced = syncedIntegration.lastSynced
          ? format(syncedIntegration.lastSynced, "dd/MM/yyyy")
          : undefined;

        return (
          <div
            key={syncedIntegration.name}
            className="grid grid-cols-4 items-center border-b border-divider-weak px-4 py-3"
          >
            <div className="text-label-small-regular text-content-moderate">
              {syncedIntegration.name}
            </div>
            <div className="text-label-small-regular text-content-moderate">
              {IntegrationTypeMap[syncedIntegration.type]}
            </div>
            <div>
              <SentimentBadge
                label={SyncStatusMap[syncedIntegration.syncStatus]}
                status={
                  syncedIntegration.syncStatus === "CONNECTED"
                    ? LabelStatus.POSITIVE
                    : LabelStatus.CAUTION
                }
              />
            </div>
            <span className="paragraph-small-code text-content-default">
              {formattedLastSynced || "-"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function TrackingTable({
  cols,
  rows,
}: {
  cols: string[];
  rows: { name: string; status: string }[] | undefined;
}) {
  if (!rows) {
    return null;
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-[10px] bg-static-surface-raised pl-4 pr-[22px]">
        {cols.map((col) => (
          <div
            key={col}
            className="py-4 text-label-small-regular text-content-moderate"
          >
            <span>{col}</span>
          </div>
        ))}
      </div>
      {rows.map((row) => (
        <div
          key={row.name}
          className="grid grid-cols-3 items-center border-b border-divider-weak px-4 py-3"
        >
          <div className="text-label-small-regular text-content-moderate">
            {row.name}
          </div>
          <div>
            <SentimentBadge
              label={row.status}
              status={
                row.status === "connected"
                  ? LabelStatus.POSITIVE
                  : LabelStatus.CAUTION
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}
