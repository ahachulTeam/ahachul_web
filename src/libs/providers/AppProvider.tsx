"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";

import { GlobalStyle, theme } from "@/styles";

import NextAuth from "./NextAuth";
import ReactQuery from "./ReactQuery";
import Recoil from "./Recoil";

export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <NextAuth>
      <Recoil>
        <ReactQuery>
          <GlobalStyle />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ReactQuery>
      </Recoil>
    </NextAuth>
  );
}
