import { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';
import { subwayLineHexColors } from '../lib/subway-line-hex-colors';

export const filters = [
  cssUtils.fullWidth,
  ({
    color: { background, text },
    typography: { fontSize, fontWeight },
    layout: {
      radii: { full },
    },
  }: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: background[50],
    marginBottom: '28px',

    '& > ul ': {
      display: 'flex',
      alignItems: 'center',
    },

    '& > ul > li': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      borderRadius: full,
      marginRight: '12px',

      '& > button': {
        color: text[50],
        fontSize: fontSize[16],
        fontWeight: fontWeight[600],
        letterSpacing: '-0.2px',
      },
    },
  }),
] as Interpolation<Theme>;

export const colorful = {
  background: 'linear-gradient(263deg, #2EE477 0%, #50BEFD 100%)',
};

export const inherit = (line: string) => ({
  transition: 'background-color 0.4s ease-in-out',
  background: subwayLineHexColors(line),
});