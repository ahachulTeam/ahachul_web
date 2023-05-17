import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Comments = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Title = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.bold16};
    margin-bottom: 15px;

    & > b {
      color: ${theme.colors.primary};
    }
  `}
`;

export const CommentInput = styled.input`
  ${({ theme }) => css`
    ${theme.input.outline};
    margin-bottom: 15px;
  `}
`;
