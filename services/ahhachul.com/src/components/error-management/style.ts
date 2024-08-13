import { CSSObject, Theme } from '@emotion/react';

const errWrap = ({ color: { gray, mint }, typography: { fontSize, fontWeight, lineHeight } }: Theme): CSSObject => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',

  '& > p': {
    color: '#c9cedc',
    fontSize: fontSize[14],
    fontWeight: fontWeight[500],
    lineHeight: lineHeight[150],
    marginBottom: '16px',
    textAlign: 'center',
  },

  '& > button': {
    padding: '10px 18px',
    color: gray[1000],
    background: mint[50],
    fontSize: '14px',
    fontWeight: fontWeight[700],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '44px',
  },
});

export { errWrap };
