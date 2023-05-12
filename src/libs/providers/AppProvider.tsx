import { Global, ThemeProvider } from "@emotion/react";
import { PropsWithChildren, useEffect } from "react";

import { theme, globalStyles } from "@/styles";

import ReactQuery from "./ReactQuery";
import Recoil from "./Recoil";
<<<<<<< HEAD
import { useRouter } from "next/router";
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
        <Global styles={globalStyles} />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
=======
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
>>>>>>> develop
      </ReactQuery>
    </Recoil>
  );
}
