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
  outline: css`
    ${fonts.regular14};
    display: flex;
    align-items: center;
    max-width: 100%;
    min-height: 44px;
    border-radius: 110px;
    border: 1px solid ${colors.gray_19};
    padding-left: 25px;
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
} as const;

export type InputType = typeof input;
