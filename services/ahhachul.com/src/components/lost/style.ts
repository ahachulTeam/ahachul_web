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

export { title };
