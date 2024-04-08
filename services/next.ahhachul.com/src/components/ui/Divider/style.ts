import { CSSObject, Theme } from '@emotion/react';
import { DividerProps } from './Divider';

const borderStyle =
  ({ orientation, variant, thickness, size, color }: Omit<DividerProps, 'css'>) =>
  ({
    color: {
      scale: { gray },
    },
  }: Theme): CSSObject => ({
    borderColor: color || gray[100],
    borderStyle: variant,
    ...(orientation === 'horizontal'
      ? {
          width: size,
          borderWidth: `0 0 ${thickness === 'thin' ? 1 : 10}px 0`,
        }
      : {
          height: size,
          borderWidth: `0 0 0 ${thickness === 'thin' ? 1 : 10}px`,
        }),
  });

export { borderStyle };
