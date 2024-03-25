import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

import {
  type GeneralNavigationLink,
  type NavigationGroupLinks,
} from "@nebula/types";

export default function SideNav({
  generalNavigation,
  navigationGroups,
}: {
  generalNavigation: GeneralNavigationLink[];
  navigationGroups?: NavigationGroupLinks[];
}) {
  const { asPath, pathname } = useRouter();

  return (
    <aside
      className="sticky top-[61px] h-minus-header border-r border-divider-weak pb-5 pt-2"
      style={{
        flex: "1 0 240px",
      }}
    >
      <nav className="flex flex-col space-y-1 pb-5 pt-4">
        {generalNavigation.map((item) => {
          const isCurrent = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              style={{
                lineHeight: "20px",
              }}
              className={clsx(
                isCurrent
                  ? "flex bg-[#7d89a114] text-content-default"
                  : "hover:content-default py-2 pl-6 text-content-moderate hover:bg-interactive-overlay-secondary-pressed",
                "label-default-regular",
              )}
            >
              {isCurrent && (
                <div className="pr-5">
                  <div className="h-full w-1 bg-white" />
                </div>
              )}
              <span className={clsx(isCurrent && "py-2")}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {navigationGroups?.map((group) => (
        <div key={group.groupName} className="pb-5">
          {group.groupActionIcon ? (
            <div className="pl-6 pr-3 flex items-center justify-between">
              <span className="paragraph-small-strong uppercase text-content-weak">
                {group.groupName}
              </span>
              {group.groupActionIcon}
            </div>
          ) : (
            <span className="paragraph-small-strong pl-6 uppercase text-content-weak">
              {group.groupName}
            </span>
          )}
          <div className="pb-2" />
          <div className="flex flex-col">
            {group.links.map((link) => {
              const isCurrent = asPath.includes(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  style={{
                    lineHeight: "20px",
                  }}
                  className={clsx(
                    isCurrent
                      ? "flex bg-[#7d89a114] text-content-default"
                      : "hover:content-default py-2 pl-6 text-content-moderate hover:bg-interactive-overlay-secondary-pressed",
                    "label-default-regular",
                  )}
                >
                  {isCurrent && (
                    <div className="pr-5">
                      <div className="h-full w-1 bg-white" />
                    </div>
                  )}
                  <span className={clsx(isCurrent && "py-2")}>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
      <div className="flex-grow-1" />
    </aside>
  );
}
