import styled from '@emotion/styled';

export const RequiredMark = styled.div`
  background-color: ${({ theme }) => theme.colors.red};
  margin-left: 4px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
`;
