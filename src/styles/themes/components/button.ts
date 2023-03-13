import { colors, fonts } from "../foundations";
import { css } from "styled-components";

const flexBoxCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const button = {
  size: {
    xs: css`
      ${flexBoxCenter};
      ${fonts.semibold14};
      height: 32px;
      border-radius: 10px;
      padding: 0 12px;
    `,
    sm: css`
      ${flexBoxCenter};
      ${fonts.semibold14};
      height: 36px;
      border-radius: 10px;
      padding: 0 16px;
    `,
    smd: css`
      ${flexBoxCenter};
      ${fonts.semibold14};
      height: 40px;
      border-radius: 10px;
      padding: 0 20px;
    `,
    md: css`
      ${flexBoxCenter};
      ${fonts.semibold16};
      height: 44px;
      border-radius: 10px;
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
      transition: 0.3s;

      @media (hover: hover) {
        &:not(:disabled):hover {
          background-color: ${colors.secondary};
        }
      }

      &:disabled {
        background-color: ${colors.primary};
        opacity: 0.4;
      }
    `,
    secondary: css`
      color: ${colors.gray_60};
      background-color: ${colors.gray_20};
      transition: 0.3s;

      @media (hover: hover) {
        &:not(:disabled):hover {
          background-color: ${colors.gray_30};
        }
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
      ${fonts.medium14};
      position: relative;
      color: ${colors.gray_60};

      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: transparent;
        transition: 0.3s;
      }

      @media (hover: hover) {
        &:not(:disabled):hover::before {
          background-color: ${colors.gray_60};
        }
      }
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
