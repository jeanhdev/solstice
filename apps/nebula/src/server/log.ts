import { IntegrationKey } from "@solstice/cosmos/tables/integrations";
import { ILogObj, Logger } from "tslog";

export function seedLogger(): Logger<ILogObj> {
  const log: Logger<ILogObj> = new Logger({ name: "Seed logger" });
  return log;
}

export function syncLogger({
  integrationKey,
}: {
  integrationKey: IntegrationKey;
}): Logger<ILogObj> {
  const log: Logger<ILogObj> = new Logger({
    name: `Sync ${integrationKey}`,
    prettyLogTimeZone: "local",
  });
  return log;
}
