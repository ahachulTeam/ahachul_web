import { css } from "@emotion/react";
import { fonts } from "@/styles/themes/foundations/fonts";
import { colors } from "@/styles/themes/foundations/colors";

const flexBoxCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const tagCommon = css`
  ${fonts.regular12};
  padding: 0 18px;
  border-radius: 135px;
  transition: 0.3s;
`;

export const tag = {
  primary: css`
    ${flexBoxCenter};
    ${tagCommon};
    height: 30px;
    border-radius: 135px;
    color: ${colors.primary};
    background-color: ${colors.secondary};

    @media (hover: hover) {
      &:not(:disabled):hover {
        color: ${colors.primary_hover};
        background-color: ${colors.secondary_hover};
      }
    }
  `,
  outline: css`
    ${flexBoxCenter};
    ${tagCommon};
<<<<<<< HEAD
    height: 30px;
    padding: 0 16px;
    border: 1px solid ${colors.gray_25};
=======
    height: 36px;
    border: 1px solid ${colors.gray_70};
>>>>>>> develop
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
