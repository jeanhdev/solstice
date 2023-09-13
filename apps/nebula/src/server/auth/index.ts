import { type GetServerSidePropsContext } from "next";
import { getServerSession, type NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

import { env } from "@nebula/env.mjs";
import { client } from "@nebula/server/db";

import { DrizzleAdapter } from "./adapter";

export const authOptions: NextAuthOptions = {
  secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx6gts=",
  session: {
    strategy: "database",
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: DrizzleAdapter(client),
  providers: [
    Auth0Provider({
      clientId: env.AUTH0_CLIENT_ID,
      clientSecret: env.AUTH0_CLIENT_SECRET,
      issuer: env.AUTH0_DOMAIN,
      // @ts-ignore
      profile: (profile) => {
        return {
          id: profile.sub,
          email: profile.email,
        };
      },
      httpOptions: {
        timeout: 5000,
      },
    }),
  ],
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
