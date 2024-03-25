import { Page } from "@nebula/ui/components";
import { UpcomingFeatureMinimalLayout } from "@nebula/ui/layouts";

export default function TouchesPage() {
  return (
    <Page isDataSettingsEnabled={false}>
      <UpcomingFeatureMinimalLayout
        title={<>Touches on your website</>}
        description={
          <>
            Access identified interactions every company has with your website.
          </>
        }
      />
    </Page>
  );
}
