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
  background-color: ${({ isScale }) => (isScale ? '#141517' : 'rgba(0,0,0,0)')};
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
  border-bottom: 1px solid #c9c9c92f;
  background-color: #141517;
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

export const DropdownMenuStyles = styled.div`
  .DropdownMenuContent,
  .DropdownMenuSubContent {
    min-width: 225px;
    background-color: #2a2b2c;
    border-radius: 10px;
    box-shadow:
      0px 10px 38px -10px rgba(22, 23, 24, 0.35),
      0px 10px 20px -15px rgba(22, 23, 24, 0.2);
    animation-duration: 700ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
  }

  .DropdownMenuContent[data-side='bottom'] {
    animation-name: slideUpAndFade;
  }

  .DropdownMenuSubContent[data-side='right'] {
    animation-name: slideRightAndFade;
  }

  .DropdownMenuItem {
    font-size: 16px;
    line-height: 1;
    color: #f6f6f6;
    display: flex;
    align-items: center;
    height: 45px;
    position: relative;
    padding-left: 12px;
    user-select: none;
    outline: none;

    &:not(:last-of-type) {
      border-bottom: 1px solid #535456;
    }

    &.red {
      color: #f94539;
    }
  }

  .DropdownMenuRadioItem {
    font-size: 16px;
    line-height: 1;
    color: #f6f6f6;
    display: flex;
    align-items: center;
    height: 45px;
    position: relative;
    padding-left: 32px;
    user-select: none;
    outline: none;

    &:not(:last-of-type) {
      border-bottom: 1px solid #535456;
    }
  }

  .DropdownMenuSubTrigger {
    font-size: 16px;
    line-height: 1;
    color: #f6f6f6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    position: relative;
    padding-left: 32px;
    padding-right: 12px;
    user-select: none;
    outline: none;

    &[data-state='open'],
    &[data-highlighted] {
      background-color: #c7d2fe;
      color: #4f46e5;
    }
  }

  .DropdownMenuItemIndicator {
    position: absolute;
    left: 6px;
    width: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  .DropdownMenuLabel {
    padding: 2px 12px;
    font-size: 12px;
    line-height: 25px;
    color: #c7d2fe;
    border-bottom: 1px solid #535456;
  }

  .DropdownMenuSeparator {
    height: 1px;
    background-color: #535456;
  }

  .DropdownMenuArrow {
    fill: white;
  }

  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideRightAndFade {
    from {
      opacity: 0;
      transform: translateX(-2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
