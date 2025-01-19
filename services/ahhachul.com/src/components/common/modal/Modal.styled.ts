import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Dim = styled.div`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.dim};
    z-index: ${theme.zIndex.drawer};
  `}
`;
