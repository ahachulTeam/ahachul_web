import { colors, fonts } from "../foundations";
import { css } from "styled-components";

export const input = {
  search48: css`
    ${fonts.regular14};
    width: 100%;
    height: 48px;
    border-radius: 100px;
    border: 1px solid ${colors.primary};
    padding: 0 32px 0 24px;
    background-color: ${colors.white};
    transition: 0.3s;

    &::placeholder {
      color: ${colors.gray_50};
    }
    &:focus {
      box-shadow: 0 0 0 1px inset ${colors.primary};
    }

    @media (hover: hover) {
      &:not(:disabled):not(:focus):hover {
        box-shadow: 0 0 0 1px inset ${colors.primary};
      }
    }
  `,
  primary: css`
    ${fonts.regular14};
    width: 100%;
    height: 52px;
    border-radius: 10px;
    border: 2px solid ${colors.gray_20};
    padding: 0 16px;
    transition: 0.3s;

    &::placeholder {
      color: ${colors.gray_50};
    }

    @media (hover: hover) {
      &:not(:disabled):hover {
        border-color: ${colors.primary};
      }
    }

    &:focus {
      border-color: ${colors.primary};
    }

    &[aria-invalid="true"] {
      border-color: ${colors.red_10};
    }

    &:disabled {
      border-color: ${colors.gray_20};
      color: ${colors.gray_70};
      background-color: ${colors.gray_10};
      -webkit-text-fill-color: rgba(0, 0, 0, 1);
      opacity: 1;
      cursor: not-allowed;
    }
  `,
} as const;

export type InputType = typeof input;
