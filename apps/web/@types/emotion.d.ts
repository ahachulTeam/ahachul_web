import "@emotion/react";

import { theme } from "@/styles/themes";

type CustomTheme = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends CustomTheme {}
}
