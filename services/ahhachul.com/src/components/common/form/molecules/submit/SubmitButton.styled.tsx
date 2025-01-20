import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const SubmitContainer = styled.button`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    right: 20px;
    background: ${theme.colors.white};
    z-index: 15;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const SubmitButton = styled.button`
  ${({ theme }) => theme.fonts.bodySmall}

  color: ${({ theme }) => theme.colors.black};
  width: max-content;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  padding: 0 13px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors['key-color']};

  &:disabled {
    color: ${({ theme }) => theme.colors.gray[70]};
    background-color: ${({ theme }) => theme.colors.gray[30]};
  }
`;
