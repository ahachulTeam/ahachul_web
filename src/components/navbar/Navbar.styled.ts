import { styled, css } from "styled-components";

export const Navbar = styled.nav`
  ${({ theme }) => css`
    position: fixed;
    bottom: 0;
    left: 50%;
    max-width: ${theme.size.layout.width};
    width: 100%;
    height: ${theme.size.bottomNavbar.height};
    border-top: 1px solid ${theme.colors.gray_30};
    padding-bottom: 4px;
    background-color: ${theme.colors.white};
    transform: translateX(-50%);
    z-index: ${theme.zIndex.sticky};
  `}
`;

export const MenuList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;
