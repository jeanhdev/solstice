import { type PropsWithChildren } from "react";

import { Header } from "@nebula/ui/components";
import LoadingLayout from "@nebula/ui/layouts/LoadingLayout";
import { usePerformanceStore } from "@nebula/stores/performance";

interface PageProps extends PropsWithChildren {
  isDataSettingsEnabled?: boolean;
  navigation?: JSX.Element;
}

export default function Page({
  children,
  isDataSettingsEnabled = true,
  navigation = undefined,
}: PageProps) {
  return (
    <div className="min-h-screen bg-static-surface-nested">
      <Header isDataSettingsEnabled={isDataSettingsEnabled} />
      {navigation ? (
        <div className="flex h-full w-full">
          {navigation}
          <div className="h-full w-full">{children}</div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col">{children}</div>
      )}
    </div>
  );
}
