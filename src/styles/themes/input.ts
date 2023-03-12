import { css } from "styled-components";

import { boxShadows } from "@/styles/themes/boxShadows";
import { colors } from "@/styles/themes/colors";
import { fonts } from "@/styles/themes/fonts";

export const input = {
  search48: css`
    ${fonts.regular15};
    width: 100%;
    height: 48px;
    border-radius: 100px;
    border: 1px solid ${colors.blue10};
    padding: 0 32px 0 24px;
    background-color: ${colors.white};
    /* box-shadow: ${boxShadows.input}; */
    transition: 0.3s;

    &::placeholder {
      color: ${colors.gray50};
    }
    &:focus {
      box-shadow: 0 0 0 1px inset ${colors.blue20};
    }

    @media (hover: hover) {
      &:not(:disabled):not(:focus):hover {
        box-shadow: 0 0 0 1px inset ${colors.blue10};
      }
    }
  `,
  search56: css`
    ${fonts.regular16};
    width: 100%;
    height: 56px;
    border-radius: 100px;
    border: 1px solid ${colors.blue10};
    padding: 0 40px 0 28px;
    background-color: ${colors.white};
    /* box-shadow: ${boxShadows.input}; */
    transition: 0.3s;

    &::placeholder {
      color: ${colors.gray50};
    }
    &:focus {
      box-shadow: 0 0 0 1px inset ${colors.blue20};
    }

    @media (hover: hover) {
      &:not(:disabled):not(:focus):hover {
        box-shadow: 0 0 0 1px inset ${colors.blue10};
      }
    }
  `,
  primary: css`
    ${fonts.regular15};
    width: 100%;
    height: 52px;
    border-radius: 10px;
    border: 2px solid ${colors.gray20};
    padding: 0 16px;
    transition: 0.3s;

    &::placeholder {
      color: ${colors.gray50};
    }

    @media (hover: hover) {
      &:not(:disabled):hover {
        border-color: ${colors.blue10};
      }
    }

    &:focus {
      border-color: ${colors.blue20};
    }

    &[aria-invalid="true"] {
      border-color: ${colors.red10};
    }

    &:disabled {
      border-color: ${colors.gray20};
      color: ${colors.gray70};
      background-color: ${colors.gray10};
      -webkit-text-fill-color: rgba(0, 0, 0, 1);
      opacity: 1;
      cursor: not-allowed;
    }
  `,
} as const;

export type InputType = typeof input;
