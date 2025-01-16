import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';

interface NavbarProps {
  visible: boolean;
}

export const Navbar = styled.nav<NavbarProps>`
  position: fixed;
  bottom: 12px;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  width: fit-content;
  margin: 16px auto;
  padding: 12px 16px 14px;
  border-radius: 24px;
  backdrop-filter: blur(20px);
  background: linear-gradient(91deg, rgba(35, 40, 52, 0.7) 0%, rgba(39, 40, 62, 0.7) 100%);

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) => (visible ? 'translateY(0)' : 'translateY(8%)')};
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-out;
  z-index: ${({ theme }: { theme: Theme }) => theme.dimensions.zIndexes.nav};
`;
