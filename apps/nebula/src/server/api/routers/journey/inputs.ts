import z from "zod";

export const getJourneyInput = z.object({
  id: z.string(),
});
