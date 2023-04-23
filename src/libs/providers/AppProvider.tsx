"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";

import { GlobalStyle, theme } from "@/styles";

import ReactQuery from "./ReactQuery";
import Recoil from "./Recoil";
import { AuthProvider } from "@/context";

export default function AppProvider({ children }: PropsWithChildren) {
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
