import { CSSObject, Theme } from '@emotion/react';

const pageTitle = ({
  typography: {
    size: { element2 },
    weight: { bold },
  },
}: Theme): CSSObject => ({
  fontSize: element2,
  fontWeight: bold,
  lineHeight: '1.3',
  margin: '100px 0 60px',
  alignSelf: 'flex-start',
});

const title = ({
  typography: {
    size: { element4 },
    weight: { bold },
  },
}: Theme): CSSObject => ({
  fontSize: element4,
  fontWeight: bold,
  lineHeight: '1.3',
  alignSelf: 'flex-start',
});

const subTitle = ({
  typography: {
    size: { element4 },
    weight: { semibold },
  },
}: Theme): CSSObject => ({
  fontSize: element4,
  fontWeight: semibold,
  lineHeight: '1.3',
  margin: '8px 0 36px',
  alignSelf: 'flex-start',
});

const wrap = ({ grids: { layout4 } }: Theme): CSSObject => ({
  ...layout4,
});

export { wrap, pageTitle, title, subTitle };
