import { Switch } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";

import { SetState } from "@nebula/types";

export default function ToggleInput({
  enabled,
  handleChange,
}: {
  enabled: boolean;
  handleChange: (enabled: boolean) => void;
}) {
  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={clsx(
        enabled
          ? "bg-interactive-fill-primary-enabled"
          : "bg-interactive-fill-secondary-enabled focus:bg-interactive-fill-secondary-hover",
        "relative inline-flex h-6 w-10 flex-shrink-0 cursor-pointer items-center rounded-full px-[2px] transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0",
      )}
    >
      <span
        aria-hidden="true"
        className={clsx(
          enabled ? "translate-x-4" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
        )}
      />
    </Switch>
  );
}
