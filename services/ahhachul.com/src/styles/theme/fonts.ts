import { css } from '@emotion/react';

export const fonts = {
  displayLarge: css`
    font-size: 48px;
    line-height: 128%;
    letter-spacing: -0.032em;
    font-weight: 600;
  `,
  displayMedium: css`
    font-size: 36px;
    line-height: 133%;
    letter-spacing: -0.027em;
    font-weight: 600;
  `,
  displaySmall: css`
    font-size: 32px;
    line-height: 130%;
    letter-spacing: -0.025em;
    font-weight: 600;
  `,
  headlineLarge: css`
    font-size: 24px;
    line-height: 133%;
    letter-spacing: -0.023em;
    font-weight: 600;
  `,
  headlineMedium: css`
    font-size: 20px;
    line-height: 140%;
    letter-spacing: -0.025em;
    font-weight: 600;
  `,
  headlineSmall: css`
    font-size: 18px;
    line-height: 133%;
    letter-spacing: -0.02em;
    font-weight: 600;
  `,
  titleLarge: css`
    font-size: 16px;
    line-height: 150%;
    letter-spacing: -0.02em;
    font-weight: 600;
  `,
  titleMedium: css`
    font-size: 16px;
    line-height: 150%;
    letter-spacing: -0.02em;
    font-weight: 500;
  `,
  titleSmall: css`
    font-size: 15px;
    line-height: 150%;
    letter-spacing: -0.02em;
    font-weight: 600;
  `,
  labelLarge: css`
    font-size: 14px;
    line-height: 150%;
    letter-spacing: -0.02em;
    font-weight: 600;
  `,
  labelMedium: css`
    font-size: 14px;
    line-height: 148%;
    letter-spacing: -0.02em;
    font-weight: 500;
  `,
  labelSmall: css`
    font-size: 12px;
    line-height: 150%;
    letter-spacing: -0.017em;
    font-weight: 600;
  `,
  bodyLarge: css`
    font-size: 16px;
    line-height: 150%;
    letter-spacing: -0.02em;
    font-weight: 400;
  `,
  bodyLargeSemi: css`
    font-size: 15px;
    line-height: 150%;
    letter-spacing: -0.02em;
    font-weight: 400;
  `,
  bodyMedium: css`
    font-size: 13px;
    line-height: 150%;
    letter-spacing: -0.02em;
    font-weight: 400;
  `,
  bodySmall: css`
    font-size: 12px;
    line-height: 145%;
    letter-spacing: -0.02em;
    font-weight: 400;
  `,
} as const;

export type FontType = typeof fonts;
