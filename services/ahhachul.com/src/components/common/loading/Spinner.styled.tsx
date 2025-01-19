import { Theme, css } from '@emotion/react';

export const loader = (theme: Theme) => css`
  width: 130px;
  position: relative;
  top: -${theme.size.header.height_m};
`;
