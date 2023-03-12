import { css } from "styled-components";

import { colors } from "@/styles/themes/colors";
import { fonts } from "@/styles/themes/fonts";

const flexSpaceBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const dropdown = {
  thin: css`
    ${flexSpaceBetween};
    ${fonts.regular15};
    column-gap: 12px;
    width: 100%;
    height: 48px;
    border-radius: 10px;
    border: 1px solid ${colors.gray20};
    padding: 0 12px 0 16px;
    color: ${colors.gray80};
    background-color: ${colors.white};
    transition: 0.3s;

    & > svg {
      fill: ${colors.gray50};
    }

    &[aria-expanded="true"] > svg {
      transform: rotate(180deg);
    }

    @media (hover: hover) {
      &:not(:disabled):hover {
        box-shadow: 0 0 0 2px inset ${colors.blue10};
      }
    }
  `,
  bold: css`
    ${flexSpaceBetween};
    ${fonts.regular15};
    column-gap: 12px;
    width: 100%;
    height: 52px;
    border-radius: 10px;
    border: 2px solid ${colors.gray20};
    padding: 0 12px 0 16px;
    color: ${colors.gray80};
    background-color: ${colors.white};
    transition: 0.3s;

    & > svg {
      fill: ${colors.gray50};
    }

    &[aria-expanded="true"] > svg {
      transform: rotate(180deg);
    }

    &[aria-invalid="true"] {
      border-color: ${colors.red10};
    }

    &[disabled] {
      color: ${colors.gray70};
      background-color: ${colors.gray10};
    }

    @media (hover: hover) {
      &:not(:disabled):hover {
        border-color: ${colors.blue10};
      }
    }
  `,
};

export type DropdownTheme = typeof dropdown;
