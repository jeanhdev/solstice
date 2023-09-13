import clsx from "clsx";

import { Button } from "@nebula/ui/components";

interface Column {
  key: string;
  title: string;
}

interface TableProps {
  title: string;
  subtitle?: string;
  columns: Column[];
  rows: React.ReactNode;
  header?: boolean;
  condensed?: boolean;
  cta?: React.ReactNode;
}

export default function Table({
  title,
  subtitle,
  columns,
  rows,
  header = true,
  condensed = false,
  cta = undefined,
}: TableProps) {
  return (
    <div className="w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
      {header && (
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          <div
            className={clsx(
              subtitle && "mb-2",
              "flex flex-wrap items-center justify-between sm:flex-nowrap",
            )}
          >
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {title}
              </h3>
              {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
            </div>
            {cta && <div className="ml-4 mt-2 flex-shrink-0">{cta}</div>}
          </div>
        </div>
      )}
      <div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      {columns.map((col, idx) => (
                        <th
                          key={col.key}
                          scope="col"
                          className={clsx(
                            idx === 0 && "sm:pl-6",
                            condensed
                              ? "border-b border-gray-200 px-2 py-3 text-left text-xs font-medium uppercase  tracking-wider text-gray-500"
                              : "border-b border-gray-200 px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
                          )}
                        >
                          {col.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {rows}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
