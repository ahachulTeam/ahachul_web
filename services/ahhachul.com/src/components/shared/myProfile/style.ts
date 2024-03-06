import { CSSObject, Theme } from '@emotion/react';

const title = ({
  typography: {
    size: { paragraph1 },
    weight: { semibold },
  },
}: Theme): CSSObject => ({
  fontSize: paragraph1,
  fontWeight: semibold,
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
