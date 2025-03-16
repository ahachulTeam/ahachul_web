import React, { useReducer } from 'react';

import styled from '@emotion/styled';
import { useActivity } from '@stackflow/react';

import { HeaderComponent, LayoutComponent, UiComponent } from '@/components';
import { CommunityType, SubwayLineFilterOptions } from '@/types';

const SearchedListSkeleton = React.lazy(
  () => import('@/components/domain/community/searchResults/skeleton/SearchedList.skeleton'),
);
const SearchedList = React.lazy(
  () => import('@/components/domain/community/searchResults/searchedList/SearchedList.component'),
);

const HashtagPage = ({ params: { keyword } }: any) => {
  const { isActive } = useActivity();
  const [isScale, toggleScale] = useReducer(scale => !scale, false);

  return (
    <LayoutComponent.Composed
      navigationSlot={false}
      appBar={{
        renderLeft: HeaderComponent.HeaderBrand,
        renderRight: HeaderComponent.HeaderActions,
      }}
      outerChildren={
        <>
          <Motion isScale />
          <FilterGroup isScale isActive={isActive}>
            <UiComponent.SearchInput uniqueId="HashtagPage" toggleScale={toggleScale} />
          </FilterGroup>
        </>
      }
    >
      <UiComponent.SuspenseQueryBoundary
        keys={[keyword]}
        errorFallback={<div />}
        suspenseFallback={<SearchedListSkeleton isScale={isScale} />}
      >
        <SearchedList
          keyword={keyword}
          filters={{
            communityType: CommunityType.FREE,
            subwayLineId: SubwayLineFilterOptions.ALL_LINES,
          }}
          isScale
        />
      </UiComponent.SuspenseQueryBoundary>
    </LayoutComponent.Composed>
  );
};

interface MotionProps {
  isScale: boolean;
}

const Motion = styled.div<MotionProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 58px;
  z-index: 40;
  background-color: white;
  transition: background-color 0.15s ease;
`;

interface FilterGroupProps {
  isScale: boolean;
  isActive: boolean;
}

const FilterGroup = styled.div<FilterGroupProps>`
  position: fixed;
  top: 58px;
  left: 0;
  flex-direction: column;
  width: 100%;
  gap: 9px;
  transform: translateY(-42px);
  transition: all 0.4s ease;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
  background-color: ${({ theme }) => theme.colors.white};
  padding-bottom: 16px;
  z-index: 50;
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
`;

export default HashtagPage;
