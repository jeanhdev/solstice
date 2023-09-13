import { z } from "zod";

import {
  selectedAttributionModelSchema,
  selectedDateRangeSchema,
} from "@nebula/schemas";

export const performanceStoreInput = z.object({
  selectedAttributionModel: selectedAttributionModelSchema,
  selectedDateRange: selectedDateRangeSchema,
});

export const getChannelPerformanceInput = performanceStoreInput.extend({
  selectedChannel: z.object({
    slug: z.string(),
  }),
});
