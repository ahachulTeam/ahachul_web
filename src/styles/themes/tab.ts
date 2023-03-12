import { css } from "styled-components";

import { colors } from "@/styles/themes/colors";
import { fonts } from "@/styles/themes/fonts";

const flexBoxCenter = css`
  display: flex;
  align-items: center;
`;

export const tab = {
  body36: css`
    ${flexBoxCenter};
    ${fonts.medium15};
    position: relative;
    height: 100%;
    padding: 4px 16px;
    color: ${colors.gray60};
    transition: 0.3s;

    &[aria-selected="true"],
    &[aria-current="page"] {
      ${fonts.semibold15};
      color: ${colors.blue30};

      &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 2px;
        background-color: ${colors.blue30};
      }
    }

    @media (hover: hover) {
      &:not([aria-selected="true"]):not([aria-current="page"]):hover {
        color: ${colors.gray70};
      }
    }
  `,
  body40: css`
    ${flexBoxCenter};
    ${fonts.medium16};
    position: relative;
    height: 100%;
    padding: 4px 18px;
    color: ${colors.gray60};
    transition: 0.3s;

    &[aria-selected="true"] {
      ${fonts.semibold16};
      color: ${colors.blue30};

      &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 2px;
        background-color: ${colors.blue30};
      }
    }

    @media (hover: hover) {
      &:not([aria-selected="true"]):hover {
        color: ${colors.gray70};
      }
    }
  `,

  header: css`
    ${flexBoxCenter};
    ${fonts.medium16};
    height: 100%;
    color: ${colors.gray50};
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
    ${fonts.medium15};
    height: 100%;
    color: ${colors.gray60};
    transition: 0.3s;

    &[aria-current="page"] {
      ${fonts.semibold15};
      color: ${colors.blue40};
    }

    @media (hover: hover) {
      &:not([aria-current="page"]):hover {
        color: ${colors.gray70};
      }
    }
  `,
  sub: css`
    ${flexBoxCenter};
    ${fonts.medium15};
    position: relative;
    height: 100%;
    padding: 6px 16px;
    color: ${colors.gray60};
    transition: 0.3s;

    &[aria-selected="true"] {
      ${fonts.semibold15};
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
        color: ${colors.gray70};
      }
    }
  `,
} as const;

export type TabType = typeof tab;
