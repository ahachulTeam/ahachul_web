import { CSSObject, Theme } from '@emotion/react';

const title = ({
  color: {
    primary: { white },
  },
  typography: {
    size: { paragraph1 },
    weight: { semibold },
  },
}: Theme): CSSObject => ({
  color: white,
  fontSize: paragraph1,
  fontWeight: semibold,
});

export { title };
