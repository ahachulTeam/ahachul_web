import { css } from '@emotion/react';
import styled from '@emotion/styled';

/* eslint-disable import/prefer-default-export */
export const Textarea = styled.textarea`
  ${({ theme }) => css`
    ${theme.input.primary};
    width: 100%;
    height: 320px;
    padding: 14px 16px;
    resize: none;
  `}
`;
