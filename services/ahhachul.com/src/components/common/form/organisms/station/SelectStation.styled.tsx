import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Label = styled.p`
  color: ${({ theme }) => theme.colors.gray[80]};
`;

export const errorStyle = css`
  margin-top: 5px;
  margin-left: 20px;
`;
