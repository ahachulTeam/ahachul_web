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

export const SearchableContainer = styled.div`
  display: grid;
  gap: 8px;
  padding: 0 20px;
`;

export const SelectedStationText = styled.p`
  ${({ theme }) => theme.fonts.bodySmall}
  color: ${({ theme }) => theme.colors.gray[70]};
`;

export const SearchInput = styled.input`
  ${({ theme }) => theme.fonts.bodySmall}
  width: 100%;
  height: 36px;
  border-radius: 8px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray[40]};
  color: ${({ theme }) => theme.colors.gray[90]};
  background: ${({ theme }) => theme.colors.white};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[60]};
  }
`;

export const SearchResultsWrapper = styled.div`
  display: grid;
  gap: 8px;
  max-height: 220px;
  overflow-y: auto;
  padding-right: 2px;
`;

export const SearchResultButton = styled.button<SelectButtonProps>`
  ${({ theme }) => theme.fonts.labelMedium}
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  width: 100%;
  min-height: 36px;
  border-radius: 8px;
  padding: 0 12px;
  text-align: left;
  border: 1px solid
    ${({ theme, isActive, isError }) => resolveBorderColor({ theme, isActive, isError })};
  background: ${({ theme, isActive }) =>
    isActive ? theme.colors['key-color'] : theme.colors.white};
  color: ${({ theme, isActive }) => (isActive ? theme.colors.white : theme.colors.gray[90])};
`;

export const EmptyText = styled.p`
  ${({ theme }) => theme.fonts.bodySmall}
  color: ${({ theme }) => theme.colors.gray[60]};
  padding: 8px 0;
`;
