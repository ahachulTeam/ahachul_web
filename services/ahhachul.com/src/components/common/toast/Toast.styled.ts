import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    position: fixed;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: ${theme.zIndex.toast};
    pointer-events: none;
  `}
`;
