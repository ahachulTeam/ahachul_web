import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ToolbarContainer = styled.article`
  position: absolute;
  bottom: 0;
  right: 24px;
  padding: 12px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const MicButton = styled.button<{ isActive: boolean }>`
  ${({ theme, isActive }) => css`
    &.toolbar-item {
      padding: 0 !important;
    }

    &.spaced {
      margin: 0;
    }

    &.mic {
      ${isActive &&
      css`
        &.active {
          color: ${theme.colors.primary.primary};
        }
      `}
    }
  `}
`;
