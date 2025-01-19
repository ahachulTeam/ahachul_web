import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const errorStyle = css`
  margin-top: 12px;
  padding-left: 20px;
`;

export const TextField = styled.input`
  ${({ theme }) => theme.fonts.bodyLargeSemi};

  width: calc(100% - 40px);
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.colors.gray[50]};
  height: 44px;
  border-radius: 5px;
  padding: 0 12px;
  color: ${({ theme }) => theme.colors.black};
  caret-color: ${({ theme }) => theme.colors['key-color']};

  &::placeholder {
    ${({ theme }) => theme.fonts.bodyLargeSemi};
    color: ${({ theme }) => theme.colors.gray[70]};
  }

  &[aria-invalid='true'] {
    border-color: #e02020;
  }
`;
