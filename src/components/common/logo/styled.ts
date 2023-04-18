import { css } from "styled-components";

import { theme } from "@/styles";

export const anchor = css`
  ${theme.fonts.bold14};
  display: flex;
  align-items: center;
  color: ${theme.colors.black};
`;

export const visuallyHidden = css`
  ${theme.a11y.visuallyHidden}
`;
