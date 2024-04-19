import { CSSObject, Theme } from '@emotion/react';

const title = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  color: '#e6e6e6',
  fontSize: fontSize[16],
  fontWeight: fontWeight[600],
});

const left: CSSObject = {
  marginLeft: '8px',
};

const right: CSSObject = {
  display: 'grid',
  gridTemplateColumns: '24px 24px',
  gap: '16px',
  marginRight: '8px',
};

export { title, left, right };
