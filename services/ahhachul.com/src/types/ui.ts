import { Interpolation, Theme } from '@emotion/react';
import { theme } from 'styles';
import { ValueOf } from 'types/utility-types/ValueOf';

export type PrimaryColorValuesType = ValueOf<typeof theme.color.primary>;
export type SubColorValuesType = ValueOf<typeof theme.color.sub>;
export type BackgroundColorValuesType = ValueOf<typeof theme.color.background>;
export type LineColorValuesType = ValueOf<typeof theme.color.line>;
export type GrayColorValuesType = ValueOf<typeof theme.color.gray>;
export type BlueGrayColorValuesType = ValueOf<typeof theme.color.bluegray>;

export type ColorValueType =
  | PrimaryColorValuesType
  | SubColorValuesType
  | BackgroundColorValuesType
  | LineColorValuesType
  | GrayColorValuesType
  | BlueGrayColorValuesType;

export type SizeType = 'small' | 'medium' | 'large';

export type DividerOrientationType = 'horizontal' | 'vertical';

export type DividerThicknessType = 'thin' | 'bold';

export type SizeWithPxType = `${number}px`;

export type SizeWithPercentType = `${number}%`;

export type IconType = React.FC<{
  onClick?: VoidFunction;
  css?: Interpolation<Theme>;
}>;
