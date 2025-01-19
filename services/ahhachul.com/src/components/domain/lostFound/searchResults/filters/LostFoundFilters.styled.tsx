import styled from '@emotion/styled';

import mixins from '@/styles/mixins';

interface MotionProps {
  isScale: boolean;
}

export const Motion = styled.div<MotionProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ isScale }) => (isScale ? '58px' : 0)};
  z-index: ${({ isScale }) => (isScale ? 8 : 0)};
  background-color: ${({ theme, isScale }) => (isScale ? theme.colors.white : 'rgba(0,0,0,0)')};
  transition: background-color 0.15s ease;
`;

interface FilterGroupProps {
  isScale: boolean;
  isActive: boolean;
}

export const FilterGroup = styled.div<FilterGroupProps>`
  position: fixed;
  top: 58px;
  left: 0;
  flex-direction: column;
  width: 100%;
  gap: ${({ isScale }) => (isScale ? '9px' : '16px')};
  transform: ${({ isScale }) => (isScale ? 'translateY(-42px)' : 'translateY(0)')};
  transition: all 0.4s ease;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
  background-color: ${({ theme }) => theme.colors.white};
  padding-bottom: 16px;
  z-index: ${({ isActive, isScale }) => (isActive || isScale ? 9 : 0)};
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
`;

export const FilterListWrap = styled.div`
  ${mixins.fullWidth}
  ${mixins.flexAlignCenter}
  ${mixins.overflowXScroll}
  padding-left: 20px;
  padding-right: 20px;
  gap: 8px;
`;
