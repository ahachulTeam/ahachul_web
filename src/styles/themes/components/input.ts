import { colors, fonts } from "../foundations";
import { css } from "@emotion/react";

export const input = {
  search: css`
    ${fonts.regular14};
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 95px;
    padding: 2px 16px;
    padding-right: 74px;
    color: ${colors.black};
    background-color: ${colors.gray_15};
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
