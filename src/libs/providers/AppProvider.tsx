import { Global, ThemeProvider } from "@emotion/react";
import { PropsWithChildren, useEffect } from "react";
<<<<<<< HEAD
import { domMax, LazyMotion } from "framer-motion";
=======
>>>>>>> develop

import { theme, globalStyles } from "@/styles";

import ReactQuery from "./ReactQuery";
import Recoil from "./Recoil";
import { useRouter } from "next/router";
<<<<<<< HEAD
=======
import { AuthProvider } from "@/context";
>>>>>>> develop

export default function AppProvider({ children }: PropsWithChildren) {
  const { pathname, query } = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, query]);

  return (
    <Recoil>
      <ReactQuery>
<<<<<<< HEAD
        <LazyMotion features={domMax}>
          <Global styles={globalStyles} />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </LazyMotion>
=======
        <Global styles={globalStyles} />
        <ThemeProvider theme={theme}>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
>>>>>>> develop
      </ReactQuery>
    </Recoil>
  );
}
