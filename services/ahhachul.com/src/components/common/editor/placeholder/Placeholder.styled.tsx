import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Pre = styled.pre`
  ${({ theme }) => css`
    ${theme.fonts.bodyLargeSemi};
    position: absolute;
    top: 15px;
    left: 32px;

    display: inline-block;
    line-height: 20px;
    color: ${theme.colors.gray[70]};

    white-space: pre-wrap;
    word-break: break-all;
    word-wrap: break-word;
    user-select: none;
    pointer-events: none;
  `}
`;
