import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface NavItemProps {
  isActive: boolean;
}

export const NavItemButton = styled.button<NavItemProps>`
  ${({ theme, isActive }) => css`
    ${theme.fonts.bodySmall}

    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    height: 100%;
    padding: 2px;
    text-align: center;
    text-decoration: none;
    position: relative;
    z-index: 10;

    color: ${isActive ? theme.colors['key-color'] : theme.colors.gray[70]};
    transition: color 0.4s;

    svg {
      width: 20px;
      height: 20px;
    }

    &:focus {
      color: rgb(196, 212, 252);
      box-shadow: none;
    }
  `}
`;
