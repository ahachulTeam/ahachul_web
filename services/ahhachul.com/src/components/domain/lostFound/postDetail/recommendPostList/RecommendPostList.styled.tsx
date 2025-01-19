import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const SectionWrapper = styled.section``;

export const HeaderWrapper = styled.div`
  height: 48px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[30]};
`;

export const Title = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.titleLarge};
    color: ${theme.colors.gray[90]};
  `}
`;
