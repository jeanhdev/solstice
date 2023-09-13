import { CalendarDaysIcon } from "@heroicons/react/20/solid";

import { StarIcon } from "../svgs";

export default function TargetSelector({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    >
      <StarIcon
        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
      <span>{label}</span>
    </button>
  );
}
