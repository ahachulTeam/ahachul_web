import { styled, css } from "styled-components";

export const Navbar = styled.nav`
  ${({ theme }) => css`
    position: fixed;
    bottom: 0;
    left: 50%;
    max-width: ${theme.size.layout.width};
    width: 100%;
    height: ${theme.size.bottomNavbar.height};
    max-height: 0;
    border-top: 1px solid ${theme.colors.gray_30};
    background-color: ${theme.colors.white};
    transform: translateX(-50%);
    transition: max-height 500ms cubic-bezier(0.43, 0.03, 0.15, 0.95);
    overflow: hidden;
    z-index: ${theme.zIndex.sticky};

    &[data-show="true"] {
      max-height: ${theme.size.bottomNavbar.height};
    }
  `}
`;

export const MenuList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;
