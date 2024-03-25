import { Company } from "@solstice/cosmos/tables/companies";
import { create } from "zustand";

type AcquisitionChannel =
  | "Google"
  | "Facebook"
  | "Instagram"
  | "LinkedIn"
  | "Twitter"
  | "Other";

export interface ReportedCompany {
  csvCompanyName: string;
  csvChannel: string;
  solsticeCompany: Company;
  solsticeChannel: AcquisitionChannel;
  isMapped: boolean;
}

interface State {
  reportedCompanies: ReportedCompany[];
  deletedReportedCompany: ReportedCompany | null;
  showUndoButton: boolean;
  setReportedCompanies: (companies: ReportedCompany[]) => void;
  removeReportedCompany: (
    companies: ReportedCompany[],
    companyToRemove: ReportedCompany,
  ) => void;
  handleUndoDelete: () => void;
}

export const useStore = create<State>((set, get) => ({
  reportedCompanies: [],
  deletedReportedCompany: null,
  showUndoButton: false,
  setReportedCompanies: (reportedCompanies: ReportedCompany[]) => {
    const updatedCompanies = reportedCompanies.map((company) => {
      if (
        !!company.csvCompanyName &&
        !!company.csvChannel &&
        !!company.solsticeCompany &&
        !!company.solsticeChannel
      ) {
        return { ...company, isMapped: true };
      } else {
        return company;
      }
    });
    set({ reportedCompanies: updatedCompanies });
  },
  removeReportedCompany: (
    companies: ReportedCompany[],
    companyToRemove: ReportedCompany,
  ) => {
    const newCompanies = companies.filter(
      (company) => company.csvCompanyName !== companyToRemove.csvCompanyName,
    );
    set({
      reportedCompanies: newCompanies,
      deletedReportedCompany: companyToRemove,
      showUndoButton: true,
    });
  },
  handleUndoDelete: () => {
    const { reportedCompanies, deletedReportedCompany } = get();
    if (deletedReportedCompany) {
      set({
        reportedCompanies: [...reportedCompanies, deletedReportedCompany],
        deletedReportedCompany: null,
        showUndoButton: false,
      });
    }
  },
}));
