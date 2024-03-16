import { CSSObject, Theme } from '@emotion/react';

const errWrap = ({
  color: {
    primary: { white, black },
  },
  typography: {
    weight: { medium, bold },
  },
}: Theme): CSSObject => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',

  '& > img': {
    marginBottom: '10px',
  },

  '& > span': {
    color: black,
    fontSize: '18px',
    fontWeight: bold,
    marginBottom: '6px',
  },

  '& > p': {
    color: '#777777',
    fontSize: '14px',
    fontWeight: medium,
    marginBottom: '24px',
  },

  '& > button': {
    padding: '12px 22px',
    color: white,
    background: '#27CDC8',
    fontSize: '14px',
    fontWeight: bold,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '44px',
  },
});

export { errWrap };
