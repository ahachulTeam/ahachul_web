import "@ahhachul/themes/themes.css";

import dynamic from "next/dynamic";
import { RecoilRoot } from "recoil";
import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
// import { SessionProvider } from "next-auth/react";
import { useReportWebVitals } from "next/web-vitals";
import {
  QueryClient,
  Hydrate,
  QueryClientProvider,
} from "@tanstack/react-query";
import { domMax, LazyMotion } from "framer-motion";

import globalStyles from "~/styles/globalStyles";
import ErrorBoundary from "~/components/shared/ErrorBoundary";
import { AlertContextProvider } from "~/contexts/AlertContext";

const Toast = dynamic(() => import("~/components/shared/toast/Toast"), {
  ssr: false,
});

const client = new QueryClient({});

export default function App({
  Component,
  pageProps: {
    dehydratedState,
    // session,
    ...pageProps
  },
}: AppProps) {
  useReportWebVitals((metric) => {
    console.log(metric);
  });

  return (
    <RecoilRoot>
      <Toast />
      <Global styles={globalStyles} />
      {/* <SessionProvider session={session}> */}
      <QueryClientProvider client={client}>
        <Hydrate state={dehydratedState}>
          <ErrorBoundary>
            <LazyMotion features={domMax}>
              <AlertContextProvider>
                <Component {...pageProps} />
              </AlertContextProvider>
            </LazyMotion>
          </ErrorBoundary>
        </Hydrate>
      </QueryClientProvider>
      {/* </SessionProvider> */}
    </RecoilRoot>
  );
}
