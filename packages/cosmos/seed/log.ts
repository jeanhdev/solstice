import { ILogObj, Logger } from "tslog";

export function seedLogger(): Logger<ILogObj> {
  const log: Logger<ILogObj> = new Logger({ name: "Seed logger" });
  return log;
}
