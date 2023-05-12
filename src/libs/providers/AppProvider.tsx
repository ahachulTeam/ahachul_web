"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { ThemeProvider } from "styled-components";

import { GlobalStyle, theme } from "@/styles";

import ReactQuery from "./ReactQuery";
import Recoil from "./Recoil";
import { AuthProvider } from "@/context";

export default function AppProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, searchParams]);

  return (
    <Recoil>
      <ReactQuery>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </ReactQuery>
    </Recoil>
  );
}
