import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.button`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    right: 16px;
    background: ${theme.colors.white};
    z-index: ${theme.zIndex.header};
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  `}
`;

export const ActionButton = styled.button`
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
`;
