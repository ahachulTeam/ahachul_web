import * as React from 'react';
import { Interpolation, Theme } from '@emotion/react';
import {
  DividerOrientationType,
  DividerThicknessType,
  SizeWithPxType,
  SizeWithPercentType,
  ColorValueType,
} from 'types';
import { borderStyle } from './style';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: DividerOrientationType;
  variant?: React.CSSProperties['borderColor'];
  thickness?: DividerThicknessType;
  color?: ColorValueType;
  size?: SizeWithPxType | SizeWithPercentType;
  css?: Interpolation<Theme>;
}

function Divider(props: DividerProps) {
  const { orientation = 'horizontal', variant = 'solid', thickness = 'thin', size = '100%', color, css } = props;

  return <hr {...props} css={[borderStyle({ orientation, variant, thickness, size, color }), css]} />;
}

export default Divider;
