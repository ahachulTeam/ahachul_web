import { Theme, css } from '@emotion/react';

export const loader = css`
  width: 130px;
  position: relative;
  top: ${({ dimensions }: Theme) => `-${dimensions.size.height.header}px`};
`;
