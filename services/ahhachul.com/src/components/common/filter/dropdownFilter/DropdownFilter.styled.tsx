import styled from '@emotion/styled';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

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

export const Content = styled(DropdownMenu.Content)`
  min-width: 225px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 14px;
  box-shadow:
    0px 5px 18px -10px rgba(22, 23, 24, 0.35),
    0px 5px 10px -15px rgba(22, 23, 24, 0.2);
  animation: slideUpAndFade 700ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

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
`;

export const RadioItem = styled(DropdownMenu.RadioItem)`
  font-size: 16px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.gray[90]};
  display: flex;
  align-items: center;
  height: 45px;
  position: relative;
  padding-left: 32px;
  user-select: none;
  outline: none;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
  }
`;

export const ItemIndicator = styled(DropdownMenu.ItemIndicator)`
  position: absolute;
  left: 6px;
  width: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 22px;
    height: 22px;
  }
`;
