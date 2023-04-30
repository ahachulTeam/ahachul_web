import { Global, ThemeProvider } from "@emotion/react";
import { usePathname, useSearchParams } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

import { theme, globalStyles } from "@/styles";

import ReactQuery from "./ReactQuery";
import Recoil from "./Recoil";

export default function AppProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, searchParams]);

  return (
    <Recoil>
      <ReactQuery>
        <Global styles={globalStyles} />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ReactQuery>
    </Recoil>
  );
}
