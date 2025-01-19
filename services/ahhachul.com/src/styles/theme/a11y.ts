import { css } from '@emotion/react';

export const a11y = {
  visuallyHidden: css`
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    white-space: nowrap;
    clip: rect(0, 0, 0, 0);
    overflow: hidden;
  `,
  clearHidden: css`
    position: static;
    width: auto;
    height: auto;
    margin: 0;
    border: 0;
    padding: 0;
    white-space: normal;
    clip: auto;
    overflow: auto;
  `,
} as const;

export type A11yTheme = typeof a11y;
