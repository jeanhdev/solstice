import { channelsSchema } from "@solstice/cosmos/tables/channels";
import { companiesSchema } from "@solstice/cosmos/tables/companies";
import { journeysSchema } from "@solstice/cosmos/tables/journeys";
import { visitorSessionsSchema } from "@solstice/cosmos/tables/visitor-sessions";
import z from "zod";

export const getJourneysOutput = z.array(journeysSchema);

export const getJourneyOutput = z.object({
  journey: journeysSchema,
  company: companiesSchema,
  enrichedVisitorSessions: z.array(
    z.object({
      visitorSession: visitorSessionsSchema,
      channel: channelsSchema,
    }),
  ),
});

export type GetJourneysOutput = z.infer<typeof getJourneysOutput>;
