import { css, Theme } from "@emotion/react";

import { theme } from "@/styles";

export const anchor = css`
  ${theme.fonts.bold14};
  display: flex;
  align-items: center;
  color: ${theme.colors.black};
`;

export const visuallyHidden = (theme: Theme) => css`
  ${theme.a11y.visuallyHidden}
`;
