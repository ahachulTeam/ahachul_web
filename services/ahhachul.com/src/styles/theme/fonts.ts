import { css, type SerializedStyles } from '@emotion/react';

import { typographyScale } from '@ahhachul/design-system';

const fonts = Object.fromEntries(
  Object.entries(typographyScale).map(([tokenName, token]) => [
    tokenName,
    css`
      font-size: ${token.fontSize};
      line-height: ${token.lineHeight};
      letter-spacing: ${token.letterSpacing};
      font-weight: ${token.fontWeight};
    `,
  ]),
) as Record<keyof typeof typographyScale, SerializedStyles>;

export { fonts };

export type FontType = typeof fonts;
