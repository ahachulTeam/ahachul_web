import React, { useReducer } from 'react';

import { CommunityComponent, HeaderComponent, LayoutComponent, UiComponent } from '@/components';
import { useCommunityFilters } from '@/hooks/domain/community';

const SearchedListSkeleton = React.lazy(
  () => import('@/components/domain/community/searchResults/skeleton/SearchedList.skeleton'),
);
const SearchedList = React.lazy(
  () => import('@/components/domain/community/searchResults/searchedList/SearchedList.component'),
);

const CommunityPage = () => {
  const [isScale, toggleScale] = useReducer(scale => !scale, false);

  const { loaded, keyword, filters, boundaryKeys, getFilterProps } = useCommunityFilters();

  if (!loaded) {
    return <UiComponent.LoadingSpinner opacity={0.1} />;
  }

  return (
    <LayoutComponent.Composed
      appBar={{
        renderLeft: HeaderComponent.HeaderBrand,
        renderRight: HeaderComponent.HeaderActions,
      }}
      outerChildren={
        <CommunityComponent.FilterList
          isScale={isScale}
          toggleScale={toggleScale}
          {...getFilterProps()}
        />
      }
    >
      <UiComponent.SuspenseQueryBoundary
        keys={boundaryKeys}
        errorFallback={({ reset }) => (
          <UiComponent.AppErrorFallback
            title="커뮤니티 목록을 불러오지 못했습니다."
            description="잠시 후 다시 시도해주세요."
            onAction={reset}
          />
        )}
        suspenseFallback={<SearchedListSkeleton isScale={isScale} />}
      >
        <CommunityComponent.CommunityReliabilitySignal
          subwayLineFilterValue={filters.subwayLineId}
          stationId={Number(filters.stationId)}
          scopeLabel={
            Number(filters.stationId) > 0 ? '역 범위 지연 신뢰 신호' : '호선 범위 지연 신뢰 신호'
          }
        />
        <SearchedList keyword={keyword} filters={filters} isScale={isScale} />
      </UiComponent.SuspenseQueryBoundary>

      <UiComponent.NewButton activityName="NewCommunityPage" />
    </LayoutComponent.Composed>
  );
};

export default CommunityPage;
