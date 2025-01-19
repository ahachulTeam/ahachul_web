import styled from '@emotion/styled';
import { Drawer } from 'vaul';

export const FilterButton = styled.button<{ isActive?: boolean }>`
  position: relative;
  text-align: left;
  width: calc(100% - 40px);
  margin: 0 auto;
  border: 1px solid rgba(196, 212, 252, 0.37);
  height: 44px;
  border-radius: 6px;
  padding: 0 12px;
  color: ${({ isActive }) => (isActive ? '#FFFFFF' : '#9da5b6')};
  font-size: 14px;

  &[aria-invalid='true'] {
    border-color: #e02020;
  }
`;

export const ChevronIconWrapper = styled.div`
  width: 14px;
  height: 14px;
  position: absolute;
  top: 51.5%;
  right: 12px;
  transform: translateY(-50%);

  & > svg > path {
    stroke: #9da5b6;
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
  z-index: 999999999;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 96%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const ContentWrapper = styled.div`
  padding: 1.2rem 1rem;
  background-color: #222226;
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
  color: #ffffff;
`;

export const ActionButton = styled.button<{ variant?: 'cancel' | 'done' }>`
  font-size: 16px;
  color: #025fac;
  font-weight: ${({ variant }) => (variant === 'done' ? 600 : 400)};
`;

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  background-color: #222226;
  margin-bottom: 16px;
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
  width: 100%;
  max-width: 100%;
  height: 36px;
  background-color: #2e3034;
  border-radius: 9px;
  padding: 0 12px 0 30px;
  font-size: 16px;
  color: #f0f4ff;
  caret-color: rgba(0, 255, 163, 0.5);

  &::placeholder {
    color: #999aa1;
  }

  &:active:not(:focus) {
    background-color: rgba(119, 119, 119, 0.8);
  }

  transition: all 0.3s ease;
`;

export const ContentArea = styled.div`
  background-color: #2e2f37;
  height: calc(100% - 200px);
  border-radius: 12px;
`;
