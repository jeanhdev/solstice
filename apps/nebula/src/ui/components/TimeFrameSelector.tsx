import { CalendarDaysIcon } from "@heroicons/react/20/solid";

import { ButtonSecondary } from "@nebula/ui/components";

export default function TimeFrameSelector({ label }: { label: JSX.Element }) {
  return (
    <>
      <ButtonSecondary
        size="compact"
        label={label}
        icon={
          <CalendarDaysIcon className="h-5 w-5 text-[rgba(255,140,63,.98)]" />
        }
      />
    </>
  );
}
