import { css, styled } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    min-height: 100vh;
    margin: 0 auto;
    max-width: ${theme.size.layout.width};
    background-color: ${theme.colors.white};
  `}
`;
