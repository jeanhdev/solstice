import { Page } from "@nebula/ui/components";
import { UpcomingFeatureMinimalLayout } from "@nebula/ui/layouts";

export default function GoalsPage() {
  return (
    <Page isDataSettingsEnabled={false}>
      <UpcomingFeatureMinimalLayout
        title={<>Create your marketing goals</>}
        description={
          <>
            Define your company goals on a given time period: new customers,
            ROAS or MRR target...
          </>
        }
      />
    </Page>
  );
}
