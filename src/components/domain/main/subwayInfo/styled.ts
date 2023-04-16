import { css, styled } from "styled-components";

export const SubwayInfo = styled.div`
  ${({ theme }) => css`
    width: 100%;
    min-height: 180px;
    border: 1px solid ${theme.colors.primary};
    border-radius: 20px;
    background-color: ${theme.colors.white};
    overflow: hidden;
  `}
`;
