import { colors, semanticColors } from './tokens/colors';

export const tailwindBaseColors = {
  primary: colors.primary,
  secondary: colors.secondary,
  subway: colors.subway,
  gray: {
    0: colors.white,
    ...colors.gray,
  },
  green: colors.green,
  'key-color': colors['key-color'],
  red: colors.red,
  white: colors.white,
  black: colors.black,
  black_00: colors.black_00,
  black_secondary: colors.black_secondary,
  dim: colors.dim,
} as const;

export const tailwindSemanticColors = semanticColors;

export const tailwindColors = {
  ...tailwindBaseColors,
  ...tailwindSemanticColors,
} as const;
