import "~/styles/pretendard.css";
import "@ahhachul/themes/themes.css";

import dynamic from "next/dynamic";
import { RecoilRoot } from "recoil";
import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import { domMax, LazyMotion } from "framer-motion";
import { useReportWebVitals } from "next/web-vitals";
import {
  QueryClient,
  Hydrate,
  QueryClientProvider,
} from "@tanstack/react-query";

import globalStyles from "~/styles/globalStyles";
import ErrorBoundary from "~/components/shared/ErrorBoundary";
import { AlertContextProvider } from "~/contexts/AlertContext";

const Toast = dynamic(() => import("~/components/shared/toast/Toast"), {
  ssr: false,
});
const Modal = dynamic(() => import("~/components/shared/modal/Modal"), {
  ssr: false,
});

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

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
      <Global styles={globalStyles} />
      {/* <SessionProvider session={session}> */}
      <LazyMotion features={domMax}>
        <QueryClientProvider client={client}>
          <Hydrate state={dehydratedState}>
            <ErrorBoundary>
              <Toast />
              <Modal />
              <AlertContextProvider>
                <Component {...pageProps} />
              </AlertContextProvider>
            </ErrorBoundary>
          </Hydrate>
        </QueryClientProvider>
      </LazyMotion>
      {/* </SessionProvider> */}
    </RecoilRoot>
  );
}
