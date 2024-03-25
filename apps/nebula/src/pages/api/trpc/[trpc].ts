import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "@nebula/env.mjs";
import { appRouter } from "@nebula/server/api/root";
import { createTRPCContext } from "@nebula/server/api/trpc";

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
});
