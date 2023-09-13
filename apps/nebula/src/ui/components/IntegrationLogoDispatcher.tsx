import { IntegrationKey } from "@solstice/cosmos/tables/integrations";
import { type SVGProps } from "react";

import { Bing, Facebook, GoogleAds, LinkedIn } from "@nebula/ui/svgs";

export function IntegrationLogoDispatcher({
  integrationKey,
  ...props
}: {
  integrationKey: any;
} & SVGProps<SVGSVGElement>) {
  if (integrationKey === "GOOGLE_ADS") {
    return <GoogleAds {...props} />;
  }
  if (integrationKey === "FACEBOOK_ADS") {
    return <Facebook {...props} />;
  }
  if (integrationKey === "BING_ADS") {
    return <Bing {...props} />;
  }
  if (integrationKey === "LINKEDIN_ADS") {
    return <LinkedIn {...props} />;
  }
  return null;
}
