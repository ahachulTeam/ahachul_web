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

const resolveBorderColor = ({
  isError,
  isActive,
  theme,
}: SelectButtonProps & {
  theme: {
    colors: {
      red: string;
      'key-color': string;
      gray: Record<number, string>;
    };
  };
}) => {
  if (isError) {
    return theme.colors.red;
  }

  if (isActive) {
    return theme.colors['key-color'];
  }

  return theme.colors.gray[50];
};

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
    ${({ theme, isActive, isError }) => resolveBorderColor({ theme, isActive, isError })};
  background: ${({ theme, isActive }) => (isActive ? theme.colors['key-color'] : 'inherit')};
  color: ${({ theme, isActive }) => (isActive ? theme.colors.white : theme.colors.gray[90])};
`;
