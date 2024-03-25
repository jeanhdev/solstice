import { attributionModelsSchema } from "@solstice/cosmos/tables/attribution-models";
import { attributionPerformanceDailySchema } from "@solstice/cosmos/tables/attribution-performance-daily";
import { channelsSchema } from "@solstice/cosmos/tables/channels";
import { z } from "zod";

export const getChannelPerformanceOutput = z.object({
  channel: channelsSchema,
  channelPerformances: z.array(attributionPerformanceDailySchema),
});

export const getChannelsPerformanceOutput = z.array(
  z.object({
    channel: channelsSchema,
    attributedRevenue: z.string(),
  }),
);

export const getAttributionModelsOutput = z.array(attributionModelsSchema);

export type GetChannelPerformanceOutput = z.infer<
  typeof getChannelPerformanceOutput
>;

export type GetChannelsPerformanceOutput = z.infer<
  typeof getChannelsPerformanceOutput
>;

export type GetAttributionModelsOutput = z.infer<
  typeof getAttributionModelsOutput
>;
