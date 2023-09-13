import { attributionModelsSchema } from "@solstice/cosmos/tables/attribution-models";
import { channelsSchema } from "@solstice/cosmos/tables/channels";
import { usersSchema } from "@solstice/cosmos/tables/users";
import z from "zod";

export const getMeOutput = usersSchema
  .pick({
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    isOnboarded: true,
    companyWebsiteHostname: true,
    apiKey: true,
  })
  .extend({
    channels: z.array(channelsSchema),
    attributionModels: z.array(
      attributionModelsSchema.extend({
        isDefault: z.boolean(),
      }),
    ),
  });

export type GetMeOutput = z.infer<typeof getMeOutput>;
