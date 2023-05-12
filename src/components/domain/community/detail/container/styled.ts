import { css, Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.article`
  width: 100%;
`;

export const MainSection = styled.section`
  padding: 20px 16px;
`;

export const CommentSection = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: 13px 20px;
`;

export const h3 = (theme: Theme) => css`
  ${theme.fonts.bold18};
  color: ${theme.colors.black};
`;

export const Divider = styled.div`
  ${({ theme }) => css`
    min-width: 100%;
    height: 10px;
    background-color: ${theme.colors.gray_10};
  `}
`;

export const visuallyHidden = (theme: Theme) => css`
  ${theme.a11y.visuallyHidden}
`;
