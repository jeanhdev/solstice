import { useRouter } from "next/router";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useMemo, useState } from "react";

import { Button, ButtonTertiary } from "@nebula/ui/components";
import Dialog, { DialogProps } from "@nebula/ui/components/Dialog";
import {
  SelfReportedCsvDropzone,
  SelfReportedTable,
} from "@nebula/ui/components/enrich";
import { useStore } from "@nebula/ui/components/enrich/store";
import { Connector } from "@nebula/ui/svgs";

export default function GoalsPage() {
  const { push } = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { showUndoButton, reportedCompanies, handleUndoDelete } = useStore();

  const mappedCompaniesCount = useMemo(
    () => reportedCompanies.filter((company) => company.isMapped).length,
    [reportedCompanies],
  );

  const nonMappedCompaniesCount = useMemo(
    () => reportedCompanies.filter((company) => !company.isMapped).length,
    [reportedCompanies],
  );

  const isCsvParsed = !!reportedCompanies.length;

  if (isCsvParsed) {
    return (
      <div className="integrations z-50 min-h-screen bg-static-surface-nested pb-12">
        <div className="w-full">
          <div className="sticky top-0 z-[99] border-b border-divider-weak bg-static-surface-nested bg-opacity-50 py-3 backdrop-blur-md backdrop-filter">
            <div className="flex h-full items-center justify-between gap-2 px-6">
              <div className="flex items-center justify-between gap-2">
                <div
                  onClick={() =>
                    push({
                      pathname: "/overview",
                    })
                  }
                >
                  <XMarkIcon className="h-5 text-content-weak hover:cursor-pointer" />
                </div>
                <hr className="mx-3 h-5 border-0 border-r border-divider-default" />
                <span className="label-default-regular">
                  Enrich your journeys
                </span>
              </div>
              {!isOpen ? (
                <>
                  {showUndoButton ? (
                    <div className="flex items-center gap-10">
                      <button
                        onClick={handleUndoDelete}
                        className="label-default-regular link"
                      >
                        Undo
                      </button>
                      <Button label={<>Enrich</>} />
                    </div>
                  ) : (
                    <div className="flex items-center gap-10">
                      <Button
                        onClick={() => setIsOpen(true)}
                        label={<>Enrich</>}
                      />
                    </div>
                  )}
                </>
              ) : (
                // Prevent content jumping when dialog is opened
                <div className="h-9" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center px-12 pb-4 pt-8 lg:px-56">
            <div className="flex w-full flex-col gap-4">
              <div>
                <h1 className="title-medium mb-4 text-content-default opacity-100">
                  <span>Map your self-reported data to Solstice</span>
                </h1>
                <p className="max-w-2/3 paragraph-medium-regular flex flex-col gap-2 text-content-moderate">
                  <span>
                    We found{" "}
                    <span className="font-suisse-mono text-orange-crazy">
                      {reportedCompanies.length}
                    </span>{" "}
                    companies. We mapped{" "}
                    <span className="font-suisse-mono text-content-default">
                      {mappedCompaniesCount}
                    </span>{" "}
                    and you need to map{" "}
                    <span className="font-suisse-mono text-content-default">
                      {nonMappedCompaniesCount}
                    </span>{" "}
                    companies.
                  </span>
                  <span>
                    For each row, select the corresponding company in Solstice
                    and the corresponding source. The source is from your
                    channels. When you're done, click on 'Continue' and we will
                    enrich your journeys.
                  </span>
                </p>
              </div>
              <SelfReportedTable />
            </div>
          </div>
        </div>
        <DialogEnrich isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    );
  }

  return (
    <div className="integrations z-50 flex min-h-screen items-start justify-start bg-static-surface-nested">
      <div className="w-full">
        <div>
          <div className="border-b border-divider-weak py-3">
            <div className="flex h-full items-center justify-between gap-2 px-6">
              <div className="flex items-center justify-between gap-2">
                <div
                  onClick={() =>
                    push({
                      pathname: "/journeys",
                    })
                  }
                >
                  <XMarkIcon className="h-4 w-4 text-content-weak hover:cursor-pointer" />
                </div>
                <hr className="mx-3 h-5 border-0 border-r border-divider-default" />
                <span className="label-default-regular">
                  Enrich your journeys
                </span>
              </div>
              <div />
            </div>
          </div>
          <div className="flex items-center justify-center px-4 pb-4 pt-8">
            <div className="flex w-full max-w-152 flex-col gap-4">
              <div className="flex flex-col gap-4">
                <h1 className="title-medium text-content-default opacity-100">
                  <span>Increase accuracy with self-reported attribution</span>
                </h1>
                <p className="paragraph-medium-regular flex flex-col gap-2 text-content-moderate">
                  <span>
                    Enriching your journeys with self-reported attribution will
                    increase the accuracy of your attribution KPIs.
                  </span>
                  <span>
                    Drop your self-reported attribution report (CSV) below.
                  </span>
                </p>
              </div>
              <SelfReportedCsvDropzone />
            </div>
          </div>
        </div>
      </div>
      <div className="flex min-h-screen flex-col bg-static-surface-default">
        <div className="py-3">
          <div className="flex h-full items-center justify-between gap-2 px-6">
            <div className="flex h-5 items-center justify-between gap-2">
              <span className="label-small-regular">About</span>
            </div>
            <div />
          </div>
        </div>

        <div className="flex flex-col items-start justify-start">
          <div className="max-w-152 px-8 pb-8 pt-8">
            <div className="flex flex-col gap-8">
              <span className="title-small text-content-default">
                How does it work?
              </span>
              <div className="flex flex-col gap-2">
                <span className="label-large-strong text-content-strong">
                  Why self-reported attribution
                </span>
                <p className="label-default-regular text-content-moderate">
                  Self-reported attribution allows your company to track the
                  original source of your leads and customers. By collecting
                  this information directly from your customers through your CRM
                  high-intent forms, you can ensure that your attribution data
                  is accurate and up-to-date, which is crucial for optimizing
                  your marketing campaigns and improving your ROI.
                </p>{" "}
              </div>
              <div className="flex flex-col gap-2">
                <span className="label-large-strong text-content-strong">
                  How to set it up
                </span>
                <div className="label-default-regular text-content-moderate">
                  To set up self-reported attribution in your CRM, follow these
                  steps:
                  <ol className="flex list-decimal flex-col gap-2 pl-6 pt-2">
                    <li>
                      Configure your high-intent forms in your CRM to include a
                      field where customers can select or enter the channel they
                      came from.
                    </li>
                    <li>
                      Export a CSV file containing the companies and the
                      channels they report coming from.
                    </li>
                    <li>Upload the CSV file in the zone on the left.</li>

                    <li>
                      Map the field in your CRM to the corresponding field in
                      our Hybrid Attribution service.
                    </li>
                  </ol>
                </div>
                <span className="label-default-regular pt-4 text-content-moderate">
                  If you need any help or have any questions, please don't
                  hesitate to contact our support team.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DialogEnrich({
  isOpen,
  setIsOpen,
}: {
  isOpen: DialogProps["isOpen"];
  setIsOpen: DialogProps["setIsOpen"];
}) {
  return (
    <Dialog
      maxW="md"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={<>Enrich your data</>}
      body={
        <div className="paragraph-medium-regular flex flex-col gap-2 text-content-moderate">
          <Connector className="h-5 w-5" />
          <p>
            Once you enrich, Solstice will adding top-of-the-funnel touches to
            your corresponding journeys.
          </p>
          <p>
            Your data will get computed accordingly, and will be available
            tomorrow at midnight.
          </p>
        </div>
      }
      cta={
        <div className="flex justify-end gap-2">
          <ButtonTertiary onClick={() => setIsOpen(false)} label={<>Back</>} />
          <Button label={<>Enrich</>} />
        </div>
      }
    />
  );
}
