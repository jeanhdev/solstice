import * as routers from "@nebula/server/api/routers";
import { createTRPCRouter } from "@nebula/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: routers.userRouter,
  integration: routers.integrationRouter,
  pipeline: routers.pipelineRouter,
  performance: routers.performanceRouter,
  journey: routers.journeyRouter,
});

export type AppRouter = typeof appRouter;
