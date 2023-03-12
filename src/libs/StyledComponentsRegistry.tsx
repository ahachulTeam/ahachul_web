"use client";

import { useServerInsertedHTML } from "next/navigation";
import React, { PropsWithChildren, useState } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

import { theme } from "@/styles";

type CustomTheme = typeof theme;

declare module "styled-components" {
  export type DefaultTheme = CustomTheme;
}

export default function StyledComponentsRegistry({ children }: PropsWithChildren) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>
  );
}
