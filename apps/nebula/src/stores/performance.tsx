import { AttributionModel } from "@solstice/cosmos/tables/attribution-models";
import { create } from "zustand";

import { getLastWeekRange } from "@nebula/lib/client/helpers";
import { type DateRange } from "@nebula/types";

type PerformanceStore = {
  isInitialized: boolean;
  selectedAttributionModel: AttributionModel | undefined;
  setSelectedAttributionModel: (model?: AttributionModel) => void;
  selectedDateRange: DateRange;
  setSelectedDateRange: (range?: DateRange) => void;
  initializeStore: (
    defaultAttributionModel: AttributionModel,
    defaultDateRange: DateRange,
  ) => void;
};

export const usePerformanceStore = create<PerformanceStore>((set) => {
  const { startDate, endDate } = getLastWeekRange();

  return {
    isInitialized: false,
    selectedAttributionModel: undefined,
    setSelectedAttributionModel: (model?: AttributionModel) =>
      set(() => ({ selectedAttributionModel: model })),
    selectedDateRange: { startDate, endDate },
    setSelectedDateRange: (range?: DateRange) =>
      set(() => ({ selectedDateRange: range })),
    initializeStore: (
      defaultAttributionModel: AttributionModel,
      defaultDateRange: DateRange,
    ) => {
      set(() => ({
        isInitialized: true,
        selectedAttributionModel: defaultAttributionModel,
        selectedDateRange: defaultDateRange,
      }));
    },
  };
});

export const useSafePerformanceStore = () => {
  const {
    selectedAttributionModel,
    selectedDateRange,
    setSelectedAttributionModel,
    setSelectedDateRange,
  } = usePerformanceStore();

  if (!selectedAttributionModel || !selectedDateRange) {
    throw new Error(
      "Attempted to access uninitialized performance store. Please make sure the store is initialized before using it in child components.",
    );
  }

  return {
    selectedAttributionModel,
    setSelectedAttributionModel,
    selectedDateRange,
    setSelectedDateRange,
  };
};
