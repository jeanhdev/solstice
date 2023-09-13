import { z } from "zod";

export const createCrmTriggersInput = z.object({
  triggerProspect: z.object({
    stageId: z.string(),
    stageLabel: z.string(),
    pipelineId: z.string().optional(),
    pipelineLabel: z.string().optional(),
  }),
  triggerCustomer: z.object({
    stageId: z.string(),
    stageLabel: z.string(),
    pipelineId: z.string().optional(),
    pipelineLabel: z.string().optional(),
  }),
});
