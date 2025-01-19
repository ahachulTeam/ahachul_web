export const breakPoint = {
  value: {
    mobile: 767,
    tablet: 1229,
  },
  device: {
    tablet: `(min-width:  767px)`,
    desktop: `(min-width: 1229px)`,
  },
} as const;

export type BreakPointTheme = typeof breakPoint;
