type TypographyScaleToken = {
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  fontWeight: string;
};

export const fontWeights = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
} as const;

export const fontSansFallback = [
  'Pretendard',
  '-apple-system',
  'BlinkMacSystemFont',
  'system-ui',
  'Roboto',
  'Helvetica Neue',
  'Segoe UI',
  'Apple SD Gothic Neo',
  'Noto Sans KR',
  'Malgun Gothic',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
  'sans-serif',
] as const;

export const fontMonoFallback = [
  'source-code-pro',
  'Menlo',
  'Monaco',
  'Consolas',
  'Courier New',
  'monospace',
] as const;

export const fontSansCssStack =
  "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif";

export const fontMonoCssStack =
  "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace";

export const typographyScale = {
  displayLarge: {
    fontSize: '48px',
    lineHeight: '128%',
    letterSpacing: '-0.032em',
    fontWeight: fontWeights.semiBold,
  },
  displayMedium: {
    fontSize: '36px',
    lineHeight: '133%',
    letterSpacing: '-0.027em',
    fontWeight: fontWeights.semiBold,
  },
  displaySmall: {
    fontSize: '32px',
    lineHeight: '130%',
    letterSpacing: '-0.025em',
    fontWeight: fontWeights.semiBold,
  },
  headlineLarge: {
    fontSize: '24px',
    lineHeight: '133%',
    letterSpacing: '-0.023em',
    fontWeight: fontWeights.semiBold,
  },
  headlineMedium: {
    fontSize: '20px',
    lineHeight: '140%',
    letterSpacing: '-0.025em',
    fontWeight: fontWeights.semiBold,
  },
  headlineSmall: {
    fontSize: '18px',
    lineHeight: '133%',
    letterSpacing: '-0.02em',
    fontWeight: fontWeights.semiBold,
  },
  titleLarge: {
    fontSize: '16px',
    lineHeight: '150%',
    letterSpacing: '-0.02em',
    fontWeight: fontWeights.semiBold,
  },
  titleMedium: {
    fontSize: '16px',
    lineHeight: '150%',
    letterSpacing: '-0.02em',
    fontWeight: fontWeights.medium,
  },
  titleSmall: {
    fontSize: '15px',
    lineHeight: '150%',
    letterSpacing: '-0.02em',
    fontWeight: fontWeights.semiBold,
  },
  labelLarge: {
    fontSize: '14px',
    lineHeight: '150%',
    letterSpacing: '-0.02em',
    fontWeight: fontWeights.semiBold,
  },
  labelMedium: {
    fontSize: '14px',
    lineHeight: '148%',
    letterSpacing: '-0.02em',
    fontWeight: fontWeights.medium,
  },
  labelSmall: {
    fontSize: '12px',
    lineHeight: '150%',
    letterSpacing: '-0.017em',
    fontWeight: fontWeights.semiBold,
  },
  bodyLarge: {
    fontSize: '16px',
    lineHeight: '150%',
    letterSpacing: '-0.02em',
    fontWeight: fontWeights.regular,
  },
  bodyLargeSemi: {
    fontSize: '15px',
    lineHeight: '150%',
    letterSpacing: '-0.02em',
    fontWeight: fontWeights.regular,
  },
  bodyMedium: {
    fontSize: '13px',
    lineHeight: '150%',
    letterSpacing: '-0.02em',
    fontWeight: fontWeights.regular,
  },
  bodySmall: {
    fontSize: '12px',
    lineHeight: '145%',
    letterSpacing: '-0.02em',
    fontWeight: fontWeights.regular,
  },
} as const satisfies Record<string, TypographyScaleToken>;

export type FontWeights = typeof fontWeights;
export type TypographyScale = typeof typographyScale;
