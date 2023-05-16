import { Global, ThemeProvider } from "@emotion/react";
import { PropsWithChildren, useEffect } from "react";
import { domMax, LazyMotion } from "framer-motion";

import { theme, globalStyles } from "@/styles";

import ReactQuery from "./ReactQuery";
import Recoil from "./Recoil";
import { useRouter } from "next/router";
import { AuthProvider } from "@/context";

export default function AppProvider({ children }: PropsWithChildren) {
  const { pathname, query } = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, query]);

  return (
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
  );
}
