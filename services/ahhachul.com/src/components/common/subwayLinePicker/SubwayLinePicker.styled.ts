import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Drawer } from 'vaul';

export const SelectButton = styled.button<{ isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 40px);
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.colors.gray[50]};
  height: 44px;
  border-radius: 6px;
  padding: 0 12px;
  color: ${({ theme, isActive }) => (isActive ? theme.colors.gray[90] : theme.colors.gray[20])};
  font-size: 14px;

  &[aria-invalid='true'] {
    border-color: #e02020;
  }
`;

export const DrawerOverlay = styled(Drawer.Overlay)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const DrawerContainer = styled(Drawer.Content)`
  z-index: 999999999;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: max-content;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const ContentWrapper = styled.div`
  padding: 1.2rem 1rem;
  background-color: ${({ theme }) => theme.colors.gray[20]};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  height: 100%;
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const CancelButton = styled.button`
  ${({ theme }) => theme.fonts.bodyLarge};
  color: ${({ theme }) => theme.colors.red};
`;

export const DrawerTitle = styled(Drawer.Title)`
  ${({ theme }) => theme.fonts.titleLarge};
  color: ${({ theme }) => theme.colors.black};
`;

export const DoneButton = styled.button`
  ${({ theme }) => theme.fonts.titleMedium};
  color: ${({ theme }) => theme.colors.gray[20]};
`;

export const SubwayListContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
`;

export const subwayList = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 8px;
  justify-items: center;
  padding: 16px 0;
`;
