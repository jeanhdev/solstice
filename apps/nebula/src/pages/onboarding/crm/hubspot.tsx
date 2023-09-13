import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { ConnectingLayout } from "@nebula/ui/layouts";
import { ONBOARDING_PATHNAMES } from "@nebula/constants";
import { api } from "@nebula/utils/api";

export default function ConnectPage() {
  const { query, isReady } = useRouter();

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { mutate, isLoading } = api.integration.connectIntegration.useMutation({
    onSuccess: () => setIsConnected(true),
    onError: () => setIsError(true),
    useErrorBoundary: false,
  });

  useEffect(() => {
    const connectHubspot = () => {
      mutate({
        code: (query.code as string) || "",
        integrationType: "CRM",
        integrationKey: "HUBSPOT",
      });
    };
    if (isReady) connectHubspot();
  }, [query, isReady]);

  return (
    <ConnectingLayout
      integrationName="Hubspot"
      isLoading={isLoading}
      isConnected={isConnected}
      isError={isError}
      redirectPathname={ONBOARDING_PATHNAMES.PIPELINE}
    />
  );
}
