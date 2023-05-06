import { css, ExecutionContext } from "styled-components";

export const anchor = ({ theme }: ExecutionContext) => css`
  ${theme.fonts.bold14};
  display: flex;
  align-items: center;
  color: ${theme.colors.black};
`;

export const visuallyHidden = ({ theme }: ExecutionContext) => css`
  ${theme.a11y.visuallyHidden}
`;
