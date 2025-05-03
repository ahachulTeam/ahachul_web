import styled from '@emotion/styled';

export const FilterBtn = styled.button`
  color: white;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  background: inherit;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border: 0;
  outline: none;
  padding: 0;
  border-radius: 8px;
  transition: all 150ms ease-out;

  & > svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.9);
  }
`;
