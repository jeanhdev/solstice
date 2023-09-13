/* eslint-disable react/jsx-key */

import { XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { motion } from "framer-motion";
import { type Row } from "react-table";

import { type ReportedCompany } from "@nebula/ui/components/enrich/store";

export default function Row({
  row,
  removeReportedCompany,
  reportedCompanies,
}: {
  row: Row<ReportedCompany>;
  reportedCompanies: ReportedCompany[];
  removeReportedCompany: (
    reportedCompanies: ReportedCompany[],
    row: ReportedCompany,
  ) => void;
}) {
  return (
    <motion.tr
      {...row.getRowProps()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ opacity: { duration: 0.5 } }}
      // layout
      //   initial={{ opacity: 0 }}
      //   animate={{ opacity: 1 }}
      //   exit={{
      //     opacity: 0,
      //   }}
      //   transition={{ opacity: { duration: 0.2 } }}
      //   style={{
      //     position: isPresent ? "relative" : "absolute",
      //     display: isPresent ? "table-row" : "flex",
      //     alignItems: isPresent ? "" : "center",
      //   }}
      className="h-full w-full border-b border-static-surface-elevated"
    >
      <div className="relative grid grid-cols-5 gap-8">
        {row.cells.map((cell) => {
          return (
            <>
              <div
                className={clsx("py-3")}
                {...cell.getCellProps()}
                key={cell.value as string}
              >
                {cell.render("Cell")}
              </div>
            </>
          );
        })}
        <span className="absolute right-2 h-full">
          <div className="grid h-full place-items-center">
            <button
              onClick={() =>
                removeReportedCompany(reportedCompanies, row.original)
              }
            >
              <XMarkIcon className="h-5 w-5 text-content-weak hover:cursor-pointer" />
            </button>
          </div>
        </span>
      </div>
    </motion.tr>
  );
}
