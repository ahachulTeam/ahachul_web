import styled from '@emotion/styled';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const FilterButton = styled.button`
  flex-shrink: 0;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.gray[10]};
  border: 1px solid ${({ theme }) => theme.colors.gray[20]};
  border-radius: 18px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 2px;
  transition: background-color 0.2s ease-out;
`;

export const FilterCount = styled.span`
  ${({ theme }) => theme.fonts.labelSmall};
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.black};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const Label = styled(DropdownMenu.Label)`
  ${({ theme }) => theme.fonts.labelSmall};
  padding: 10px 12px 4px;
  color: ${({ theme }) => theme.colors.gray[90]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
`;

export const Item = styled(DropdownMenu.Item)`
  font-size: 16px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.red};
  display: flex;
  align-items: center;
  height: 45px;
  position: relative;
  padding: 2px 12px;
  user-select: none;
  outline: none;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
  }
`;
