import { DefaultTheme, css } from "styled-components";

import { theme } from "@/styles";

export const anchor = css`
  ${theme.fonts.bold14};
  display: flex;
  align-items: center;
  color: ${theme.colors.black};
`;
