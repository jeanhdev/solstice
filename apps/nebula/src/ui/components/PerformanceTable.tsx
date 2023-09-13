import clsx from "clsx";
import { PropsWithChildren } from "react";

export default function PerformanceTable({
  cols,
  children,
  size = "6",
}: { cols: string[]; size?: string } & PropsWithChildren) {
  return (
    <>
      <div
        className={clsx(
          `grid select-none grid-cols-tab-${size} gap-6 bg-static-surface-raised pl-[44px] pr-[32px]`,
        )}
      
      >
        {cols.map((col) => (
          <div key={col} className="flex flex-row py-4 ">
            <span className="label-small-regular text-content-moderate">
              {col}
            </span>
          </div>
        ))}
      </div>
      <div className="max-h-scrollable-table overflow-y-auto">{children}</div>
    </>
  );
}
