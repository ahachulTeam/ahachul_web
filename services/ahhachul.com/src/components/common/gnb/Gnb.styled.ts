import styled from '@emotion/styled';

export const Navbar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  height: 60px;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[20]};
  z-index: ${({ theme }) => theme.zIndex.navbar};
`;
