/* eslint-disable @typescript-eslint/ban-types */

/* eslint-disable react/function-component-definition */
import type { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { NextComponentType } from "next/types";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ReactElement, useEffect } from "react";

import { AppProvider } from "@/libs";

const Toast = dynamic<{}>(() => import("@/components").then(module => module.Toast));

NProgress.configure({ minimum: 0.1, showSpinner: false, easing: "linear" });

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const router = useRouter();

  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();
    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, [router.events]);

  return (
    <AppProvider>
      <Toast />
      {getLayout(<Component {...pageProps} />)}
    </AppProvider>
  );
};

export default MyApp;
