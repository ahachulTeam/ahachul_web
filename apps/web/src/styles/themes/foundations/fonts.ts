import { css } from "@emotion/react";

export const fonts = {
  regular10: css`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  `,
  regular11: css`
    font-size: 1.1rem;
    font-weight: 400;
    font-family: Pretendard;
    line-height: 1.18182;
  `,
  regular12: css`
    font-size: 1.2rem;
    font-weight: 400;
    font-family: Pretendard;
    line-height: 1.33333;
  `,
  regular14: css`
    font-size: 1.4rem;
    font-weight: 400;
    font-family: Pretendard;
    line-height: 1.35714;
  `,
  regular20: css`
    font-size: 2rem;
    font-weight: 400;
    font-family: Pretendard;
    line-height: 1.45;
  `,
  regular16: css`
    font-size: 1.6rem;
    font-weight: 400;
    font-family: Pretendard;
    line-height: 1.875;
  `,
  medium10: css`
    font-size: 1rem;
    font-weight: 500;
    font-family: Pretendard;
    line-height: 1.35714;
  `,
  medium14: css`
    font-size: 1.4rem;
    font-weight: 500;
    font-family: Pretendard;
    line-height: 1.35714;
  `,
  medium16: css`
    font-size: 1.6rem;
    font-weight: 500;
    font-family: Pretendard;
    line-height: 1.5;
  `,
  semibold14: css`
    font-size: 1.4rem;
    font-weight: 600;
    font-family: Pretendard;
    line-height: 1.35714;
  `,
  semibold16: css`
    font-size: 1.6rem;
    font-weight: 600;
    font-family: Pretendard;
    line-height: 1.3125;
  `,
  semibold20: css`
    font-size: 2rem;
    font-weight: 600;
    font-family: Pretendard;
    line-height: 1.2;
  `,
  bold14: css`
    font-size: 1.4rem;
    font-weight: 700;
    font-family: Pretendard;
    line-height: 1.35714;
  `,
  bold16: css`
    font-size: 1.6rem;
    font-weight: 700;
    font-family: Pretendard;
    line-height: 1.1875;
  `,
  bold18: css`
    font-size: 1.8rem;
    font-weight: 700;
    font-family: Pretendard;
    line-height: 1.27778;
  `,
  bold20: css`
    font-size: 2rem;
    font-weight: 700;
    font-family: Pretendard;
    line-height: 1.25;
  `,
  bold24: css`
    font-size: 2.4rem;
    font-weight: 700;
    font-family: Pretendard;
    line-height: 1.5;
  `,
  extraBold28: css`
    font-size: 2.8rem;
    font-weight: 800;
    font-family: Pretendard;
    line-height: 1.16;
  `,
} as const;

export type FontType = typeof fonts;
