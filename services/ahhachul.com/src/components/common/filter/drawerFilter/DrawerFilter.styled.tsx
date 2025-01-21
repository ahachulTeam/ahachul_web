import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Drawer } from 'vaul';

export const FilterButton = styled.button<{ isActive: boolean }>`
  flex-shrink: 0;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.gray[10]};
  border: 1px solid
    ${({ theme, isActive }) => (isActive ? theme.colors.gray[100] : theme.colors.gray[20])};
  border-radius: 18px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  transition: background-color 0.2s ease-out;
  gap: 2px;

  & > span {
    ${({ theme }) => theme.fonts.labelMedium};
    color: ${({ theme }) => theme.colors.gray[90]};
  }
`;

export const Overlay = styled(Drawer.Overlay)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const DrawerContent = styled(Drawer.Content)`
  z-index: ${({ theme }) => theme.zIndex.drawer};
  display: flex;
  flex-direction: column;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: max-content;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0px -10px 16px 0px rgba(0, 0, 0, 0.17);
`;

export const ContentWrapper = styled.div`
  padding: 1.2rem 1rem;
  background-color: ${({ theme }) => theme.colors.gray[10]};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const HeaderTitle = styled(Drawer.Title)`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[90]};
`;

export const ActionButton = styled.button<{ variant?: 'cancel' | 'done' }>`
  font-size: 16px;
  color: ${({ theme, variant }) =>
    variant === 'cancel' ? theme.colors.gray[90] : theme.colors['key-color']};
  font-weight: ${({ variant }) => (variant === 'done' ? 600 : 400)};
`;

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray[20]};
  margin-bottom: 16px;
  border-radius: 12px;
`;

export const SearchIconWrapper = styled.button`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-48%);

  & > svg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 17.5px;
    height: 17.5px;
    opacity: 0.7;
  }
`;

export const SearchInput = styled.input`
  ${({ theme }) => css`
    width: 100%;
    max-width: 100%;
    height: 36px;
    border: 0;
    color: ${theme.colors.gray[90]};
    background-color: ${theme.colors.gray[20]};
    padding: 0 12px 0 30px;
    font-size: 16px;
    caret-color: ${theme.colors['key-color']};
    border-radius: 12px;

    &::placeholder {
      color: ${theme.colors.gray[70]};
    }

    &:active:not(:focus) {
      background-color: rgba(119, 119, 119, 0.8);
    }

    transition: all 0.3s ease;
  `}
`;

export const ContentArea = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[20]};
  height: 500px;
  border-radius: 12px;
`;
