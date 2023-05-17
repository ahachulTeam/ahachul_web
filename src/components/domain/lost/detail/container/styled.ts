import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Section = styled.section`
  ${({ theme }) => css`
    padding: 19px 0;
    background-color: ${theme.colors.white};
  `}
`;
