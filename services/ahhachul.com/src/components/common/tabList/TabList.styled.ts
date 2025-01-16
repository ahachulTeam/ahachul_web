import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const TabListContainer = styled.div`
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.gray20};
    padding: 0 20px;
    overflow-x: overlay;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }

    @media ${theme.breakPoint.device.tablet} {
      padding: 0;
    }
  `}
`;

export const TabList = styled.div`
  display: flex;
  column-gap: 2px;
  flex-wrap: nowrap;
  min-width: 100%;
  width: max-content;
  padding: 2px;
`;

export const SkeletonTabList = styled.div`
  display: flex;
  column-gap: 20px;
  margin-bottom: 8px;
`;
