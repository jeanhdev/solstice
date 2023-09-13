import z, { ZodType } from "zod";

import { ERROR_KEYS } from "@nebula/constants";

export const apiResponseOutput = <T>(dataSchema: ZodType<T>) => {
  return dataSchema.or(
    z.object({ errorKey: z.nativeEnum(ERROR_KEYS) }).required(),
  );
};
