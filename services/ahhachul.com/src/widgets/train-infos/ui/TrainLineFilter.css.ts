import { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';
import { subwayLineHexColors } from '../lib/subway-line-hex-colors';

export const filters = [
  cssUtils.fullWidth,
  cssUtils.flexAlignCenter,
  ({
    color: { background, text },
    typography: { fontSize, fontWeight },
    layout: {
      radii: { full },
    },
  }: Theme) => ({
    backgroundColor: background[50],
    marginBottom: '28px',

    '& > li': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50px',
      height: '32px',
      borderRadius: full,
      padding: '0 6px',
      marginRight: '12px',

      '& > button': {
        color: text[50],
        fontSize: fontSize[14],
        fontWeight: fontWeight[600],
        letterSpacing: '-0.2px',
      },
    },
  }),
] as Interpolation<Theme>;

export const inherit = (line: number) => ({
  transition: 'background-color 0.4s ease-in-out',
  background: subwayLineHexColors(line),
});
