import { css } from '@emotion/react'

export const common = {
  flexAlignCenter: css`
    display: flex;
    align-items: center;
  `,
  flexCenter: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  flexColumn: css`
    display: flex;
    flex-direction: column;
  `,
  flexColumnAlignCenter: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  flexGrowOne: css`
    flex-grow: 1;
  `,
  flexShrinkZero: css`
    flex-shrink: 0;
  `,
} as const

export type StyledFlexTheme = typeof common
