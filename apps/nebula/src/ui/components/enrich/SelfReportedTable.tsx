/* eslint-disable react/jsx-key */

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { orderBy } from "lodash";
import { useCallback, useMemo } from "react";
import { useTable, type Column } from "react-table";

import Combobox, {
  ComboboxWithCategories,
} from "@nebula/ui/components/Combobox";
import {
  LabelStatus,
  SentimentBadge,
} from "@nebula/ui/components/SentimentBadge";
import Row from "@nebula/ui/components/enrich/Row";
import {
  useStore,
  type ReportedCompany,
} from "@nebula/ui/components/enrich/store";
// import { ChannelCategory, type AcquisitionChannel } from "@nebula/types";
import { api } from "@nebula/utils/api";

// import { type Company } from "../../../../../../packages/cosmos";

type TableColumn = Column<ReportedCompany> & {
  accessor: keyof ReportedCompany;
};

export default function SelfReportedTable() {
  const { reportedCompanies, setReportedCompanies, removeReportedCompany } =
    useStore();

  // const { data: existingCompanies } = api.performance.getCompanies.useQuery();

  // const { data: channels } =
  //   api.performance.getPaidAndNonPaidChannels.useQuery();

  // const setSelectedCompany = useCallback(
  //   (selected: Company | undefined, index: number) => {
  //     const newData = [...reportedCompanies];
  //     (newData[index] as ReportedCompany).solsticeCompany = selected as Company;
  //     setReportedCompanies(newData);
  //   },
  //   [reportedCompanies, setReportedCompanies],
  // );

  // const setSelectedChannel = useCallback(
  //   (selected: AcquisitionChannel | undefined, index: number) => {
  //     const newData = [...reportedCompanies];
  //     (newData[index] as ReportedCompany).solsticeChannel =
  //       selected as AcquisitionChannel;
  //     setReportedCompanies(newData);
  //   },
  //   [reportedCompanies, setReportedCompanies],
  // );

  // const columns: TableColumn[] = useMemo(
  //   () => [
  //     {
  //       Header: "Self-reported mapping",
  //       accessor: "csvCompanyName",
  //       Cell: ({
  //         row,
  //       }: {
  //         row: { original: ReportedCompany; index: number };
  //       }) => (
  //         <div className="flex h-full items-center justify-center">
  //           <span className="label-default-regular w-full text-content-default">
  //             {row.original.csvCompanyName}
  //           </span>
  //         </div>
  //       ),
  //     },
  //     {
  //       Header: "Company",
  //       accessor: "solsticeCompany",
  //       Cell: ({
  //         row,
  //       }: {
  //         row: { original: ReportedCompany; index: number };
  //       }) => (
  //         <Combobox<Company>
  //           entities={existingCompanies || []}
  //           selectedEntity={row.original.solsticeCompany}
  //           onChange={(selected) => setSelectedCompany(selected, row.index)}
  //           attributeToFilterOn="name"
  //           attributeToDisplay="name"
  //           item={({ entity }) => (
  //             <span
  //               className={clsx("label-default-regular text-content-default")}
  //             >
  //               {entity.name}
  //             </span>
  //           )}
  //         />
  //       ),
  //     },
  //     {
  //       Header: "Self-reported channel",
  //       accessor: "csvChannel",
  //       Cell: ({
  //         row,
  //       }: {
  //         row: { original: ReportedCompany; index: number };
  //       }) => (
  //         <div className="flex h-full items-center justify-center">
  //           <span className="label-default-regular w-full text-content-default">
  //             {row.original.csvChannel}
  //           </span>
  //         </div>
  //       ),
  //     },
  //     {
  //       Header: "Channel",
  //       accessor: "solsticeChannel",
  //       Cell: ({
  //         row,
  //       }: {
  //         row: { index: number; original: ReportedCompany };
  //       }) => (
  //         <ComboboxWithCategories<AcquisitionChannel>
  //           entities={channels || []}
  //           categories={[ChannelCategory.PAID, ChannelCategory.NON_PAID]}
  //           selectedEntity={row.original.solsticeChannel}
  //           onChange={(selected) => setSelectedChannel(selected, row.index)}
  //           attributeToFilterOn="name"
  //           attributeToDisplay="name"
  //           item={({ entity }) => (
  //             <span
  //               className={clsx("label-default-regular text-content-default")}
  //             >
  //               {entity.name}
  //             </span>
  //           )}
  //         />
  //       ),
  //     },
  //     {
  //       Header: "Status",
  //       accessor: "isMapped",
  //       Cell: ({
  //         row,
  //       }: {
  //         row: { index: number; original: ReportedCompany };
  //       }) => {
  //         const isComplete = row.original.isMapped;

  //         return (
  //           <div className="flex h-full items-center justify-start">
  //             <SentimentBadge
  //               label={isComplete ? "Complete" : "Incomplete"}
  //               status={isComplete ? LabelStatus.POSITIVE : LabelStatus.CAUTION}
  //             />
  //           </div>
  //         );
  //       },
  //     },
  //   ],
  //   [channels, existingCompanies, setSelectedCompany, setSelectedChannel],
  // );

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable<ReportedCompany>({
  //     columns,
  //     data: reportedCompanies || [],
  //   });

  return (
    <div>
      {/* {headerGroups.map((headerGroup) => (
        <div
          {...headerGroup.getHeaderGroupProps()}
          key={headerGroup.id}
          className="grid select-none grid-cols-5 gap-8"
        >
          {headerGroup.headers.map((column) => (
            <div
              {...column.getHeaderProps()}
              key={column.id}
              className="label-small-regular flex flex-row py-2  text-content-weak"
            >
              {column.render("Header")}
            </div>
          ))}
        </div>
      ))}
      <motion.table
        className="block max-h-136 overflow-y-auto pt-2"
        {...getTableProps()}
      >
        <AnimatePresence
          mode="sync"
          // onExitComplete={() => window.scrollTo(0, 0)}
        >
          <tbody className="relative" {...getTableBodyProps()}>
            {orderBy(
              rows,
              [
                (row) => (row.original.isMapped ? 1 : 0),
                (row) => row.original.csvCompanyName,
              ],
              ["asc", "asc"],
            ).map((row) => {
              prepareRow(row);

              return (
                <Row
                  row={row}
                  removeReportedCompany={removeReportedCompany}
                  reportedCompanies={reportedCompanies}
                />
              );
            })}
          </tbody>
        </AnimatePresence>
      </motion.table> */}
    </div>
  );
}
