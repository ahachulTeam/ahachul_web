import "@ahhachul/themes/themes.css";

import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import { useReportWebVitals } from "next/web-vitals";
import {
  QueryClient,
  Hydrate,
  QueryClientProvider,
} from "@tanstack/react-query";

import globalStyles from "@/styles/globalStyles";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { AlertContextProvider } from "@contexts/AlertContext";

const client = new QueryClient({});

export default function App({
  Component,
  pageProps: { dehydratedState, ...pageProps },
}: AppProps) {
  useReportWebVitals((metric) => {
    console.log(metric);
  });

  return (
    <>
      <Global styles={globalStyles} />
      <QueryClientProvider client={client}>
        <Hydrate state={dehydratedState}>
          <ErrorBoundary>
            <AlertContextProvider>
              <Component {...pageProps} />
            </AlertContextProvider>
          </ErrorBoundary>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
