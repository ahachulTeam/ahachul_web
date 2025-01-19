import styled from '@emotion/styled';

export const ErrorMessage = styled.div`
  ${({ theme }) => theme.fonts.bodyMedium};

  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.red};
  gap: 6px;

  & > div > svg > path {
    fill: #e02020;
    stroke: #ffffff;

    &:first-of-type {
      stroke: #e02020;
    }
  }
`;
