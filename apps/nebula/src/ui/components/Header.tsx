/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useSession } from "next-auth/react";

import AttributionModelMenu from "@nebula/ui/components/AttributionModelMenu";
import DatePicker from "@nebula/ui/components/DatePicker/DatePicker";

const tabs = [
  {
    name: "Overview",
    path: "/overview",
  },
  {
    name: "Channels",
    path: "/channels",
  },
  {
    name: "Journeys",
    path: "/journeys",
  },
  {
    name: "Enrich",
    path: "/enrich",
  },
];

export default function Header({
  isDataSettingsEnabled = true,
}: {
  isDataSettingsEnabled?: boolean;
}) {
  const { data: sessionData } = useSession();
  const { pathname } = useRouter();

  return (
    <div className="border-b border-divider-weak bg-static-surface-default py-3">
      <div className="flex h-full items-center justify-between gap-2 px-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8">
              <img
                src="/logo.png"
                style={{ width: "100%", height: "100%" }}
                alt="Sosltice logo"
              />
            </div>
            <span className="rounded-full border px-[6px] py-[2px] font-suisse-mono text-[9px]">
              beta
            </span>
          </div>
          <hr className="mx-3 h-5 border-0 border-r border-divider-default" />
          <div className="flex items-center justify-start gap-2">
            {tabs.map((tab) => {
              const isCurrent = pathname.includes(tab.path);
              return (
                <Link
                  key={tab.path}
                  href={tab.path}
                  className={clsx(
                    isCurrent
                      ? "bg-interactive-overlay-secondary-pressed text-content-strong"
                      : "text-content-weak hover:bg-interactive-overlay-secondary-hover hover:text-content-default",
                    "w-fit whitespace-nowrap rounded-6 px-[10px] py-[6px]",
                  )}
                >
                  <span className="label-default-strong">{tab.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-start gap-6">
          {isDataSettingsEnabled && (
            <div className="flex items-center justify-start gap-3">
              <AttributionModelMenu />
              <DatePicker />
            </div>
          )}
          <Link href="/settings/account">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <span className="text-sm font-medium capitalize leading-none text-black">
                {(sessionData?.user.email || "S")[0]}
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
