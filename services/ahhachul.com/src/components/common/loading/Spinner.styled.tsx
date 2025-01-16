import { Theme, css } from '@emotion/react';

export const loader = css`
  width: 130px;
  position: relative;
  top: ${({ sizes }: Theme) => `-${sizes.header}px`};
`;
