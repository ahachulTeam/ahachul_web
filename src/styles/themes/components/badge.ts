import { colors, fonts } from "../foundations";
import { css } from "styled-components";

const flexBoxCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const badgeCommon = css`
  ${fonts.regular12};
  padding: 2px 8px;
  transition: 0.3s;
`;

export const badge = {
  primary: css`
    ${flexBoxCenter};
    ${badgeCommon};
    width: max-content;
    height: 20px;
    border-radius: 3px;
    color: ${colors.white};
  `,
};

export type BadgeTheme = typeof badge;
