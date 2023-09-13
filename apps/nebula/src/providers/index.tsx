import { useRouter } from "next/router";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { getLastWeekRange } from "@nebula/lib/client/helpers";
import ErrorLayout from "@nebula/ui/layouts/ErrorLayout";
import LoadingLayout from "@nebula/ui/layouts/LoadingLayout";
import { usePerformanceStore } from "@nebula/stores/performance";
import { hasErrorKey } from "@nebula/types";
import { api } from "@nebula/utils/api";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      useErrorBoundary: true,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
});

export function QueryErrorCatcher({ children }: PropsWithChildren) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorLayout resetErrorBoundary={resetErrorBoundary} />
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data, status } = useSession();

  if (status === "loading") {
    return <LoadingLayout />;
  }

  if (!data?.user) {
    return <>{children}</>;
  }

  return <MeProvider isAuthenticated={!!data?.user}>{children}</MeProvider>;
};

export const MeProvider = ({
  children,
  isAuthenticated,
}: PropsWithChildren & { isAuthenticated: boolean }) => {
  const { pathname } = useRouter();

  const { initializeStore } = usePerformanceStore();

  const { isLoading } = api.user.getMe.useQuery(["me"] as any, {
    enabled: isAuthenticated,
    onSuccess: (data) => {
      if (hasErrorKey(data)) {
        throw new Error(data.errorKey);
      }

      if (data.isOnboarded) {
        const defaultAttributionModel = data.attributionModels.find(
          (model: any) => model.isDefault,
        );

        if (!defaultAttributionModel) {
          throw new Error("No default attribution model found");
        }

        const { startDate, endDate } = getLastWeekRange();

        initializeStore(defaultAttributionModel, { startDate, endDate });
      }
    },
  });

  const requiresInitialization = !pathname.includes("/onboarding");

  if (isLoading && requiresInitialization) {
    return <LoadingLayout />;
  }

  return <>{children}</>;
};

export function ReactQueryProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorCatcher>{children}</QueryErrorCatcher>
    </QueryClientProvider>
  );
}
