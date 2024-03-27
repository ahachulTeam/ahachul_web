import { CSSObject, Theme } from '@emotion/react';

const errWrap = ({
  color: {
    scale: { gray },
  },
  typography: { fontWeight },
}: Theme): CSSObject => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',

  '& > img': {
    marginBottom: '24px',
  },

  '& > p': {
    color: '#c9cedc',
    fontSize: '14px',
    fontWeight: fontWeight[500],
    marginBottom: '24px',
  },

  '& > button': {
    padding: '10px 18px',
    color: gray[1000],
    background: '#27CDC8',
    fontSize: '14px',
    fontWeight: fontWeight[700],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '44px',
  },
});

export { errWrap };
