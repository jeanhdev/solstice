import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { AuthProvider, ReactQueryProviders } from "@nebula/providers";

import "@nebula/styles/globals.css";
import { api } from "@nebula/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ReactQueryProviders>
      <SessionProvider session={session}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </SessionProvider>
    </ReactQueryProviders>
  );
};

export default api.withTRPC(MyApp);
