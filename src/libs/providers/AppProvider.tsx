import { Global, ThemeProvider } from "@emotion/react";
import { PropsWithChildren, useEffect } from "react";

import { theme, globalStyles } from "@/styles";

import ReactQuery from "./ReactQuery";
import Recoil from "./Recoil";
import { useRouter } from "next/router";

export default function AppProvider({ children }: PropsWithChildren) {
  const { pathname, query } = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, query]);

  return (
    <Recoil>
      <ReactQuery>
        <Global styles={globalStyles} />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ReactQuery>
    </Recoil>
  );
}
