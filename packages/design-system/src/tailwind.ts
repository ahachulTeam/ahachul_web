import { colors, semanticColors } from './tokens/colors';
import { fontSansFallback, fontWeights, typographyScale } from './tokens/typography';

export const tailwindBaseColors = {
  primary: colors.primary,
  secondary: colors.secondary,
  subway: colors.subway,
  gray: {
    0: colors.white,
    ...colors.gray,
  },
  green: colors.green,
  badge: colors.badge,
  social: colors.social,
  brand: colors.brand,
  icon: colors.icon,
  skeleton: colors.skeleton,
  'key-color': colors['key-color'],
  red: colors.red,
  white: colors.white,
  black: colors.black,
  black_00: colors.black_00,
  black_secondary: colors.black_secondary,
  dim: colors.dim,
  legacy: colors.legacy,
} as const;

export const tailwindSemanticColors = semanticColors;

export const tailwindColors = {
  ...tailwindBaseColors,
  ...tailwindSemanticColors,
} as const;

function toKebabCase(value: string) {
  return value.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export const tailwindTypographyScale = Object.fromEntries(
  Object.entries(typographyScale).map(([key, token]) => [
    toKebabCase(key),
    [
      token.fontSize,
      {
        lineHeight: token.lineHeight,
        letterSpacing: token.letterSpacing,
        fontWeight: token.fontWeight,
      },
    ],
  ]),
) as Record<string, [string, { lineHeight: string; letterSpacing: string; fontWeight: string }]>;

export const tailwindFontWeights = fontWeights;

export function createTailwindSansFontFamily(variableName = '--font-pretendard') {
  return {
    sans: [`var(${variableName})`, ...fontSansFallback] as string[],
  };
}
