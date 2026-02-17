import styled from '@emotion/styled';

export const ErrorMessage = styled.div`
  ${({ theme }) => theme.fonts.bodyMedium};

  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.red};
  gap: 6px;

  & > svg > path {
    fill: var(--ah-color-legacy-status-validation);
    stroke: var(--ah-color-white);

    &:first-of-type {
      stroke: var(--ah-color-legacy-status-validation);
    }
  }
`;
