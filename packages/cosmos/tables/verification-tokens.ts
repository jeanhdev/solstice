import { InferModel } from "drizzle-orm";
import { pgTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: varchar("identifier").notNull(),
    token: varchar("token").notNull(),
    expires: timestamp("expires").notNull(),
  },
  (verificationTokens) => {
    return {
      identifierTokenUniqueIndex: uniqueIndex("identifier_token_index").on(
        verificationTokens.identifier,
        verificationTokens.token,
      ),
    };
  },
);

export type VerificationToken = InferModel<typeof verificationTokens>;
