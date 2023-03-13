import { colors, fonts } from "../foundations";
import { css } from "styled-components";

const flexBoxCenter = css`
  display: flex;
  align-items: center;
`;

export const tab = {
  body36: css`
    ${flexBoxCenter};
    ${fonts.medium14};
    position: relative;
    height: 100%;
    padding: 4px 16px;
    color: ${colors.gray_60};
    transition: 0.3s;

    &[aria-selected="true"],
    &[aria-current="page"] {
      ${fonts.semibold14};
      color: ${colors.primary};

      &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 2px;
        background-color: ${colors.primary};
      }
    }

    @media (hover: hover) {
      &:not([aria-selected="true"]):not([aria-current="page"]):hover {
        color: ${colors.gray_70};
      }
    }
  `,
  body40: css`
    ${flexBoxCenter};
    ${fonts.semibold16};
    position: relative;
    height: 100%;
    padding: 4px 18px;
    color: ${colors.gray_60};
    transition: 0.3s;

    &[aria-selected="true"] {
      ${fonts.semibold16};
      color: ${colors.primary};

      &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 2px;
        background-color: ${colors.primary};
      }
    }

    @media (hover: hover) {
      &:not([aria-selected="true"]):hover {
        color: ${colors.gray_70};
      }
    }
  `,

  header: css`
    ${flexBoxCenter};
    ${fonts.semibold16};
    height: 100%;
    color: ${colors.gray_50};
    transition: 0.3s;

    &[aria-current="page"] {
      ${fonts.semibold16};
      color: ${colors.black};
    }

    @media (hover: hover) {
      &:not([aria-current="page"]):hover {
        color: ${colors.black};
      }
    }
  `,
  navMenu: css`
    ${flexBoxCenter};
    ${fonts.medium14};
    height: 100%;
    color: ${colors.gray_60};
    transition: 0.3s;

    &[aria-current="page"] {
      ${fonts.semibold16};
      color: ${colors.primary};
    }

    @media (hover: hover) {
      &:not([aria-current="page"]):hover {
        color: ${colors.gray_70};
      }
    }
  `,
  sub: css`
    ${flexBoxCenter};
    ${fonts.medium14};
    position: relative;
    height: 100%;
    padding: 6px 16px;
    color: ${colors.gray_60};
    transition: 0.3s;

    &[aria-selected="true"] {
      ${fonts.semibold16};
      color: ${colors.black};

      &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: ${colors.black};
      }
    }

    @media (hover: hover) {
      &:not([aria-selected="true"]):hover {
        color: ${colors.gray_70};
      }
    }
  `,
} as const;

export type TabType = typeof tab;
