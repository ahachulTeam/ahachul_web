import styled from '@emotion/styled';

interface FilterButtonProps {
  isActive?: boolean;
}

export const FilterButton = styled.button<FilterButtonProps>`
  flex-shrink: 0;
  height: 30px;
  background-color: ${({ theme }) => theme.color.whiteAlpha[50]};
  border: 1px solid ${({ theme }) => theme.color.whiteAlpha[100]};
  border-radius: 18px;
  display: flex;
  align-items: center;
  padding: 0 4px;
  transition: background-color 0.2s ease-out;

  .arrow-down-img {
    width: 19px;
    margin-left: 4px;
    transform: rotate(0deg);

    path {
      stroke-width: 1px;
    }

    &.rotate {
      transform: rotate(180deg);
    }
  }

  ${({ isActive }) =>
    isActive &&
    `
    background-color: #267CDD;
  `}
`;

export const FilterCount = styled.span`
  background-color: #ffffff;
  color: #277fe1;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  font-size: 9px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
