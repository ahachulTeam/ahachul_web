import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const FloatButton = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.bodyLarge};

    position: fixed;
    right: 20px;
    bottom: 80px;

    width: max-content;
    height: 44px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;

    padding: 0 14px;
    border-radius: 100px;
    color: ${theme.colors.white};
    background-color: ${theme.colors.gray[90]};

    z-index: ${theme.zIndex.float};
  `}
`;
