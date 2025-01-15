import styled from '@emotion/styled';

interface NavItemProps {
  isActive: boolean;
}

/* font-size: ${({ theme }) => theme.typography.fontSize[11]}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight[500]}; */

export const NavItemButton = styled.button<NavItemProps>`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2px;
  width: 48px;
  text-align: center;
  text-decoration: none;
  position: relative;
  z-index: 10;

  color: ${({ isActive }) => (isActive ? 'rgb(196, 212, 252)' : 'rgb(65, 66, 89)')};
  transition: color 0.4s;

  svg {
    width: 20px;
    height: 20px;

    path,
    rect {
      fill: ${({ isActive }) => (isActive ? 'rgb(196, 212, 252)' : 'rgb(65, 66, 89)')};
    }
  }

  &:focus {
    color: rgb(196, 212, 252);
    box-shadow: none;
  }

  span {
    margin-top: 4px;
  }

  div {
    margin: 1px auto;
  }
`;
