import { css } from '@emotion/react'

export const fonts = {
  thin23: css`
    font-size: 2.3rem;
    font-weight: 300;
    line-height: 1.2;
    font-family: Pretendard;
  `,
  thin29: css`
    font-size: 2.9rem;
    font-weight: 300;
    line-height: 1.45;
    font-family: Pretendard;
  `,
  regular10: css`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    font-family: Pretendard;
  `,
  regular11: css`
    font-size: 1.1rem;
    font-weight: 400;
    line-height: 1.18182;
    font-family: Pretendard;
  `,
  regular12: css`
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.33333;
    font-family: Pretendard;
  `,
  regular14: css`
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.5714;
    font-family: Pretendard;
  `,
  regular20: css`
    font-size: 2rem;
    font-weight: 400;
    line-height: 1.45;
    font-family: Pretendard;
  `,
  regular16: css`
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.3125;
    font-family: Pretendard;
  `,
  regular24: css`
    font-size: 2.4rem;
    font-weight: 400;
    line-height: 1.875;
    font-family: Pretendard;
  `,
  medium10: css`
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.35714;
    font-family: Pretendard;
  `,
  medium14: css`
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.35714;
    font-family: Pretendard;
  `,
  medium16: css`
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1.5;
    font-family: Pretendard;
  `,
  semibold14: css`
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.35714;
    font-family: Pretendard;
  `,
  semibold16: css`
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1.3125;
    font-family: Pretendard;
  `,
  semibold18: css`
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 1.2;
    font-family: Pretendard;
  `,
  semibold20: css`
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.2;
    font-family: Pretendard;
  `,
  bold14: css`
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1.35714;
    font-family: Pretendard;
  `,
  bold16: css`
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.1875;
    font-family: Pretendard;
  `,
  bold18: css`
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1.27778;
    font-family: Pretendard;
  `,
  bold20: css`
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.25;
    font-family: Pretendard;
  `,
  bold24: css`
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 1.5;
    font-family: Pretendard;
  `,
  extraBold28: css`
    font-size: 2.8rem;
    font-weight: 800;
    font-family: Pretendard;
    line-height: 1.16;
    font-family: Pretendard;
  `,
} as const

export type FontType = typeof fonts
