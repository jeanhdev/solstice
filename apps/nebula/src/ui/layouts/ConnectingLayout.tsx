import { useRouter } from "next/router";
import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";

import { LoadingCard } from "../components";

interface ConnectingLayoutProps {
  integrationName: string;
  isLoading: boolean;
  isConnected: boolean;
  isError: boolean;
  redirectPathname: string;
}

export default function ConnectingLayout({
  integrationName,
  isLoading,
  isConnected,
  isError,
  redirectPathname,
}: ConnectingLayoutProps) {
  const { push } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      push({
        pathname: redirectPathname,
      });
    }, 4800);
  }, [isConnected]);

  return (
    <div className="bg-static-surface-nested">
      <div className="flex items-center justify-start p-6">
        <div className="w-10">
          <img
            src="/logo.png"
            style={{ width: "100%", height: "100%" }}
            alt="Sosltice logo"
          />
        </div>
      </div>
      <div className="h-[calc(100vh-80px)]">
        <div className="flex h-104 items-center justify-center">
          {isLoading && <LoadingCard />}
          {isError && (
            <div className="grid place-items-center p-4">
              <div className="flex items-center gap-2">
                <ExclamationCircleIcon className="h-4 w-4 text-orange-600" />
                <span className="label-default-strong">An error occurred</span>
              </div>
            </div>
          )}
          {isConnected && (
            <div className="grid place-items-center p-4">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-orange-600" />
                <span className="label-default-strong">
                  Connected to {integrationName} successfully. Redirecting...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
