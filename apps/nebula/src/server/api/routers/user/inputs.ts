import { newChannelSchema } from "@solstice/cosmos/tables/channels";
import z from "zod";

export const updateUserToAttributionModelsInput = z.object({
  updatedAttributionModels: z.array(
    z.object({
      attributionModelId: z.number(),
      isDefault: z.boolean().default(false),
    }),
  ),
});

export const addChannelInput = newChannelSchema.omit({
  userId: true,
  slug: true,
});

export const completeOnboardingInput = z.object({
  isOnboarded: z.boolean(),
});
