import { colors, fonts } from "../foundations";
import { css } from "styled-components";

const flexBoxCenter = css`
  display: flex;
  align-items: center;
  justify-contents: center;
`;

export const toggle = {
  primary: css`
    ${fonts.medium14};
    ${flexBoxCenter};
    flex: 1;
    height: 36px;
    padding: 0 20px;
    color: ${colors.gray_40};
    background-color: ${colors.gray_20};
    user-select: none;
    transition: all 0.3s ease-in-out;

    &:first-child {
      border-top-left-radius: 40px;
      border-bottom-left-radius: 40px;
    }

    &:last-child {
      border-top-right-radius: 40px;
      border-bottom-right-radius: 40px;
    }

    @media (hover: hover) {
      &:not(:disabled):hover {
        color: ${colors.white};
        background-color: ${colors.primary};

        &:not([data-state="active"]) {
          color: ${colors.white};
          background-color: ${colors.primary_hover};
        }
      }
    }

    &[data-state="active"] {
      color: ${colors.white};
      background-color: ${colors.primary};
      font-weight: 600;
    }
  `,
} as const;

export type ToggleType = typeof toggle;
