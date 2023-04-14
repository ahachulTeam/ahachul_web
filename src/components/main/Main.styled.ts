import { css, styled } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    min-height: 100vh;
    margin: 0 auto;
    width: 100%;
    max-width: ${theme.size.layout.width};
    min-height: ${`calc(100vh - ${theme.size.header.height})`};
    padding-top: ${theme.size.header.height};
    background-color: ${theme.colors.white};
  `}
`;
