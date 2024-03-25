import Link from "next/link";
import { PlusIcon } from "@heroicons/react/20/solid";

import { createNavigationFromChannels } from "@nebula/lib/client/helpers";
import { SideNav } from "@nebula/ui/navs";
import { useQuerySafely } from "@nebula/hooks";

enum GeneralTab {
  OVERVIEW = "overview",
}

const generalNavigation = [
  {
    name: "Overview",
    key: GeneralTab.OVERVIEW,
    href: "/channels",
  },
];

export default function ChannelsNav({
  isActionEnabled = true,
}: {
  isActionEnabled?: boolean;
}) {
  const { data } = useQuerySafely.useMe();

  const { navigationGroup: nonPaidNavigationGroup } =
    createNavigationFromChannels({
      channels: data.channels,
      groupActionIcon: isActionEnabled ? (
        <Link href="/channels/create">
          <PlusIcon className="w-4 h-4 text-content-weak" />
        </Link>
      ) : undefined,
    });

  return (
    <SideNav
      generalNavigation={generalNavigation}
      navigationGroups={[nonPaidNavigationGroup]}
    />
  );
}
