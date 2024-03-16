import { CSSObject, Theme } from '@emotion/react';

const errWrap = ({
  color: {
    gray: { gray0, gray600, gray900 },
    primary: { mint600 },
  },
  typography: {
    size: { label1, label4 },
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
    color: gray900,
    fontSize: label1,
    fontWeight: bold,
    marginBottom: '6px',
  },

  '& > p': {
    color: gray600,
    fontSize: label4,
    fontWeight: medium,
    marginBottom: '24px',
  },

  '& > button': {
    padding: '12px 22px',
    color: gray0,
    background: mint600,
    fontSize: label4,
    fontWeight: bold,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '44px',
  },
});

export { errWrap };
