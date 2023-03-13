import { colors, fonts } from "../foundations";
import { css } from "styled-components";

const flexBoxCenter = css`
  display: grid;
  grid-template-columns: minmax(0, max-content) 1fr;
  justify-content: center;
  align-items: center;
`;

const tagCommon = css`
  ${fonts.medium14};
  padding: 0 12px;
  transition: 0.3s;

  & > svg {
    width: 12px;
    height: 12px;
    margin-left: 8px;
    fill: ${colors.gray_50};
    transition: 0.3s;
  }
`;

export const tag = {
  primary: css`
    ${flexBoxCenter};
    ${tagCommon};
    height: 32px;
    border-radius: 10px;
    color: ${colors.gray_70};
    background-color: ${colors.gray_40};

    @media (hover: hover) {
      &:not(:disabled):hover {
        color: ${colors.gray_80};
        background-color: ${colors.gray_40};

        & > svg {
          fill: ${colors.gray_60};
        }
      }
    }
  `,
  outline: css`
    ${flexBoxCenter};
    ${tagCommon};
    height: 36px;
    border-radius: 10px;
    border: 1px solid ${colors.gray_70};
    background-color: ${colors.white};

    @media (hover: hover) {
      &:not(:disabled):hover {
        background-color: ${colors.gray_20};
      }
    }
  `,
  ghost: css`
    ${flexBoxCenter};
    ${tagCommon};
    height: 28px;

    @media (hover: hover) {
      &:not(:disabled):hover {
        color: ${colors.black};

        & > svg {
          fill: ${colors.gray_80};
        }
      }
    }
  `,
};

export type TagTheme = typeof tag;
