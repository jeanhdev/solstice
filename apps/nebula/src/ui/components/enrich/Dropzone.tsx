import Papa from "papaparse";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { compareTwoStrings } from "string-similarity";

import { retrieveCsvCompanyNameAndChannel } from "@nebula/ui/components/enrich/parser";
import { api } from "@nebula/utils/api";

import { useStore, type ReportedCompany } from "./store";

const trimmedIntegrationName = (integrationName: string) =>
  integrationName.toLowerCase().replace(/\s*(Ads|Marketing)$/i, "");

const trimmedCompanyName = (companyName: string) =>
  companyName
    .toLowerCase()
    .replace(/^(.*?),?\s*(LLC|Inc\.|Corp\.|Ltd\.|LLP|PLLC|P.C.)?$/i, "$1");

export default function SelfReportedCsvDropzone() {
  // const { setReportedCompanies } = useStore();

  // const { data: existingCompanies } = api.performance.getCompanies.useQuery();

  // const { data: channels } =
  //   api.performance.getPaidAndNonPaidChannels.useQuery();

  // const findCorrespondingCompany = useCallback(
  //   (companyName: string) => {
  //     const potentialCompany = existingCompanies?.find((c) => {
  //       return (
  //         // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //         compareTwoStrings(
  //           trimmedCompanyName(c.name),
  //           trimmedCompanyName(companyName),
  //         ) > 0.8
  //       );
  //     });
  //     return potentialCompany;
  //   },
  //   [existingCompanies],
  // );

  // const findCorrespondingChannel = useCallback(
  //   (channelName: string) => {
  //     const potentialChannel = channels?.find((c) => {
  //       return (
  //         // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //         compareTwoStrings(
  //           trimmedIntegrationName(c.name),
  //           trimmedIntegrationName(channelName),
  //         ) > 0.8
  //       );
  //     });
  //     return potentialChannel;
  //   },
  //   [channels],
  // );

  // const onDrop = useCallback(
  //   (acceptedFiles: File[]) => {
  //     acceptedFiles.forEach((file) => {
  //       const reader = new FileReader();

  //       reader.onabort = () => console.error("file reading was aborted");
  //       reader.onerror = () => console.error("file reading has failed");

  //       reader.onload = () => {
  //         // Parse CSV file using Papa Parse
  //         // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  //         Papa.parse(reader.result as string, {
  //           header: true,
  //           complete: function (results) {
  //             if (!results.data) throw Error("No results");
  //             const companies = (
  //               results.data as { companies: string; source: string }[]
  //             ).map((row) => {
  //               const { csvCompanyName, csvChannel } =
  //                 retrieveCsvCompanyNameAndChannel(row);

  //               if (!csvCompanyName || !csvChannel)
  //                 throw Error(
  //                   "We were unable to parse the CSV file. Please try again.",
  //                 );
  //               return {
  //                 // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  //                 csvCompanyName,
  //                 // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  //                 csvChannel,
  //                 solsticeCompany:
  //                   findCorrespondingCompany(csvCompanyName) || undefined,
  //                 solsticeChannel:
  //                   findCorrespondingChannel(csvChannel) || undefined,
  //               };
  //             }) as ReportedCompany[];
  //             setReportedCompanies(companies);
  //           },
  //         });
  //       };
  //       reader.readAsText(file);
  //     });
  //   },
  //   [findCorrespondingChannel, findCorrespondingCompany, setReportedCompanies],
  // );
  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop,
  //   accept: {
  //     // Accept only CSV file
  //     "text/csv": [".csv"],
  //   },
  //   maxFiles: 1,
  //   maxSize: 5000000,
  // });

  return (
    <div className="h-48 w-full rounded-6 border border-divider-weak bg-off-black">
      {/* <div
        className="flex h-full items-center justify-center"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          {/* <XMarkIcon className="h-12 w-12 text-content-weak" />
          <span className="paragraph-small-regular text-content-weak">
            Drag and drop your report here{" "}
          </span>
          <span className="paragraph-small-regular text-content-weak">or </span>
          <span className="paragraph-small-regular cursor-pointer text-content-weak underline">
            browse files
          </span>{" "}
          <span className="paragraph-small-regular text-content-weak">
            (max 5MB)
          </span>
        </div>
      </div> */}
    </div>
  );
}
