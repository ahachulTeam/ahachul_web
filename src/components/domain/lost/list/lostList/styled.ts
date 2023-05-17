import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const LostFoundList = styled.ul`
  ${({ theme }) => css`
    width: 100%;

    & > li {
      border-bottom: 1px solid ${theme.colors.gray_15};
      padding: 16px;
    }

    &[data-view="grid"] {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 16px;
      row-gap: 16px;
      padding: 16px;

      & > li {
        border-bottom: 0;
        padding: 0;
      }
    }
  `}
`;
