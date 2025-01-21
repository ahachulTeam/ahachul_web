import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Section = styled.section``;

export const HeaderWrapper = styled.div`
  height: 50px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[30]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export const CommentCountWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.labelMedium};
    color: ${theme.colors.gray[80]};
    display: flex;
    align-items: center;
    gap: 4px;
  `}
`;
