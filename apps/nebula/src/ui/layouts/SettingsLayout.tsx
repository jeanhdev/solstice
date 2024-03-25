import { PropsWithChildren } from "react";

import { Page } from "@nebula/ui/components";
import SideNav from "@nebula/ui/navs/SideNav";
import { GeneralNavigationLink } from "@nebula/types";

const generalNavigation: GeneralNavigationLink[] = [
  {
    name: "Account",
    key: "account",
    href: "/settings/account",
  },
  {
    name: "Integrations",
    key: "integrations",
    href: "/settings/integrations",
  },
  {
    name: "Attribution",
    key: "attribution",
    href: "/settings/attribution",
  },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <Page isDataSettingsEnabled={false}>
      <div className="h-full w-full">
        <main>
          <div className="flex">
            <SideNav generalNavigation={generalNavigation} />
            <div className="w-full space-y-6">{children}</div>
          </div>
        </main>
      </div>
    </Page>
  );
}
