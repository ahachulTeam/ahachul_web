import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";
import { domMax, LazyMotion } from "framer-motion";
import { Global, ThemeProvider } from "@emotion/react";

import { AuthProvider } from "@/context";
import { MonitoringInitializer } from "@/components";
import { theme, globalStyles } from "@/styles";
import ReactQuery from "./ReactQuery";
import Recoil from "./Recoil";

export default function AppProvider({ children }: PropsWithChildren) {
  const { pathname, query } = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, query]);

  return (
    <>
      <MonitoringInitializer />
      <Recoil>
        <ReactQuery>
          <LazyMotion features={domMax}>
            <Global styles={globalStyles} />
            <ThemeProvider theme={theme}>
              <AuthProvider>{children}</AuthProvider>
            </ThemeProvider>
          </LazyMotion>
        </ReactQuery>
      </Recoil>
    </>
  );
}
