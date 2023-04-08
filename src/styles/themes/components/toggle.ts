import { colors, fonts } from "../foundations";
import { css } from "styled-components";

const flexBoxCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const toggle = {
  primary: css`
    ${fonts.medium14};
    ${flexBoxCenter};
    flex: 1;
    height: 36px;
    padding: 0 20px;
    color: ${colors.gray_40};
    user-select: none;
    transition: all 0.3s ease-in-out;
    z-index: 2;

    &:first-child {
      border-top-left-radius: 40px;
      border-bottom-left-radius: 40px;
    }

    &:last-child {
      border-top-right-radius: 40px;
      border-bottom-right-radius: 40px;
    }

    &[data-state="active"] {
      color: ${colors.white};
    }
  `,
} as const;

export type ToggleType = typeof toggle;
