import { css } from "styled-components";

export const fonts = {
  regular13: css`
    font-size: 1.3rem;
    font-weight: 400;
    font-family: Pretendard;
    line-height: 1.53846;
  `,
  regular14: css`
    font-size: 1.4rem;
    font-weight: 400;
    font-family: Pretendard;
    line-height: 1.42857;
  `,
  regular15: css`
    font-size: 1.5rem;
    font-weight: 400;
    font-family: Pretendard;
    line-height: 1.6;
  `,
  regular16: css`
    font-size: 1.6rem;
    font-weight: 400;
    font-family: Pretendard;
    line-height: 1.75;
  `,
  medium14: css`
    font-size: 1.4rem;
    font-weight: 500;
    font-family: Pretendard;
    line-height: 1.42857;
  `,
  medium15: css`
    font-size: 1.5rem;
    font-weight: 500;
    font-family: Pretendard;
    line-height: 1.6;
  `,
  medium16: css`
    font-size: 1.6rem;
    font-weight: 500;
    font-family: Pretendard;
    line-height: 1.75;
  `,
  semibold14: css`
    font-size: 1.4rem;
    font-weight: 600;
    font-family: Pretendard;
    line-height: 1.42857;
  `,
  semibold15: css`
    font-size: 1.5rem;
    font-weight: 600;
    font-family: Pretendard;
    line-height: 1.6;
  `,
  semibold16: css`
    font-size: 1.6rem;
    font-weight: 600;
    font-family: Pretendard;
    line-height: 1.75;
  `,
  semibold17: css`
    font-size: 1.7rem;
    font-weight: 600;
    font-family: Pretendard;
    line-height: 1.64705;
  `,
  bold18: css`
    font-size: 1.8rem;
    font-weight: 700;
    font-family: Pretendard;
    line-height: 1.55555;
  `,
  bold20: css`
    font-size: 2rem;
    font-weight: 700;
    font-family: Pretendard;
    line-height: 1.6;
  `,
  bold24: css`
    font-size: 2.4rem;
    font-weight: 700;
    font-family: Pretendard;
    line-height: 1.5;
  `,
} as const;

export type FontType = typeof fonts;
