import type { Theme } from '@emotion/react';

export const errMsgWrap = ({
  color: { error },
  typography: { fontSize, fontWeight },
}: Theme) => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: error[50],
  fontSize: fontSize[14],
  fontWeight: fontWeight[400],
  gap: '6px',

  '& > div > svg > path': {
    fill: '#E02020',
    stroke: '#ffffff',

    '&:first-of-type': {
      stroke: '#E02020',
    },
  },
});
