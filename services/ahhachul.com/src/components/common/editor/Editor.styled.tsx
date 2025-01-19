import { type Theme, css } from '@emotion/react';
import styled from '@emotion/styled';

export const EditorContainer = styled.div`
  position: relative;
`;

export const contentEditableCss = (theme: Theme) => css`
  ${theme.fonts.bodyLargeSemi};
  height: 100%;
  width: 100%;
  border: 1px solid ${theme.colors.gray[50]};
  border-radius: 5px;
  padding: 12px;
  overflow: hidden;
  text-wrap: wrap;
  color: ${theme.colors.gray[90]};

  &:focus {
    outline: none;
  }
`;
