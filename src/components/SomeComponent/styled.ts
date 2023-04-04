import { css, styled } from "styled-components";

export const Paragraph = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    > span {
      ${theme.fonts.bold20};
      color: ${theme.colors.white};
      background-color: ${theme.colors.subway.sin_bundang};
    }
  `}
`;

export const Components = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
`;

export const PrimaryBtn = styled.button`
  ${({ theme }) => css`
    margin-top: 20px;
    ${theme.button.size.md};
    ${theme.button.variant.primary};
    width: max-content;
  `}
`;

export const SecondaryBtn = styled(PrimaryBtn)`
  ${({ theme }) => css`
    ${theme.button.variant.secondary};
  `}
`;

export const GhostBtn = styled.button`
  ${({ theme }) => css`
    ${theme.button.size.md};
    ${theme.button.variant.ghost};
    width: max-content;
  `}
`;

export const OutlineBtn = styled.button`
  ${({ theme }) => css`
    ${theme.button.size.md};
    ${theme.button.variant.outline};
    width: max-content;
  `}
`;
