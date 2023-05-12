import { colors, fonts } from "../foundations";
import { css } from "@emotion/react";

const flexBoxCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const button = {
  size: {
    xs: css`
      ${flexBoxCenter};
      ${fonts.regular14};
      height: 32px;
      border-radius: 10px;
      padding: 0 12px;
    `,
    sm: css`
      ${flexBoxCenter};
      ${fonts.regular14};
      height: 36px;
      border-radius: 10px;
      padding: 0 16px;
    `,
    smd: css`
      ${flexBoxCenter};
      ${fonts.medium14};
      height: 40px;
      border-radius: 10px;
      padding: 0 20px;
    `,
    md: css`
      ${flexBoxCenter};
      ${fonts.medium14};
      height: 44px;
      border-radius: 70px;
      padding: 0 20px;
    `,
    lg: css`
      ${flexBoxCenter};
      ${fonts.semibold16};
      height: 52px;
      border-radius: 10px;
      padding: 0 24px;
    `,
  },
  variant: {
    primary: css`
      color: ${colors.white};
      background-color: ${colors.primary};
      transition: all 0.3s ease-in-out;

      @media (hover: hover) {
        &:not(:disabled):hover {
          background-color: ${colors.primary_hover};
        }
      }

      &:active {
        background-color: ${colors.primary_active};
      }

      &:disabled {
        color: ${colors.gray_30};
        background-color: ${colors.gray_20};
      }
    `,
    secondary: css`
      color: ${colors.primary};
      background-color: ${colors.secondary};
      transition: all 0.3s ease-in-out;

      @media (hover: hover) {
        &:not(:disabled):hover {
          background-color: ${colors.secondary_hover};
        }
      }

      &:active {
        background-color: ${colors.secondary_active};
      }

      &:disabled {
        background-color: ${colors.gray_20};
        opacity: 0.4;
      }
    `,
    icon: css`
      ${flexBoxCenter};
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid ${colors.gray_20};
      background-color: ${colors.white};

      @media (hover: hover) {
        &:not(:disabled):hover {
          background-color: ${colors.gray_10};
        }
      }
    `,
    ghost: css`
      color: ${colors.black};
      background-color: ${colors.white};

      &:disabled {
        color: ${colors.gray_40};
      }
    `,
    outline: css`
      color: ${colors.gray_60};
      background-color: ${colors.white};
      border: 1px solid ${colors.gray_30};
      border-radius: 10px;
    `,
    link: css`
      ${fonts.regular14};
      position: relative;
      height: max-content;
      color: ${colors.gray_60};
      transition: 0.3s;

      &::before {
        content: "";
        position: absolute;
        bottom: 1px;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: ${colors.gray_60};
        transition: 0.3s;
      }

      @media (hover: hover) {
        &:not(:disabled):hover {
          color: ${colors.black};

          &::before {
            background-color: ${colors.black};
          }
        }
      }
    `,
  },
};

export type ButtonTheme = typeof button;
