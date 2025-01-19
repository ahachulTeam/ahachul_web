import styled from '@emotion/styled';

export const ScrollContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  overflow-y: hidden;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

interface SelectButtonProps {
  isActive: boolean;
  isError?: boolean;
}

export const SelectButton = styled.button<SelectButtonProps>`
  ${({ theme }) => theme.fonts.labelMedium}
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};

  flex-shrink: 0;
  height: 35px;
  border-radius: 4px;
  padding: 0 12px;
  width: max-content;
  margin-right: 8px;
  border: 1px solid
    ${({ theme, isActive, isError }) =>
      isError ? theme.colors.red : isActive ? theme.colors['key-color'] : theme.colors.gray[50]};
  background: ${({ theme, isActive }) => (isActive ? theme.colors['key-color'] : 'inherit')};
  color: ${({ theme, isActive }) => (isActive ? theme.colors.white : theme.colors.gray[90])};
`;
