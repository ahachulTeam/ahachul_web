import React, { useReducer } from 'react';

import type { ActivityComponentType } from '@stackflow/react';

import { HeaderComponent, LayoutComponent, UiComponent } from '@/components';
import { LostFoundComponent } from '@/components/domain';
import { useLostFoundFilters } from '@/hooks/domain';

const SearchedListSkeleton = React.lazy(
  () => import('@/components/domain/lostFound/searchResults/skeleton/SearchedList.skeleton'),
);
const SearchedList = React.lazy(
  () => import('@/components/domain/lostFound/searchResults/searchedList/SearchedList.component'),
);

const LostFoundPage: ActivityComponentType = () => {
  const [isScale, toggleScale] = useReducer(scale => !scale, false);

  const { loaded, keyword, filters, boundaryKeys, getFilterProps } = useLostFoundFilters();

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
        <LostFoundComponent.FilterList
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
            title="유실물 목록을 불러오지 못했습니다."
            description="잠시 후 다시 시도해주세요."
            onAction={reset}
          />
        )}
        suspenseFallback={<SearchedListSkeleton isScale={isScale} />}
      >
        <SearchedList keyword={keyword} filters={filters} isScale={isScale} />
      </UiComponent.SuspenseQueryBoundary>

      <UiComponent.NewButton activityName="NewLostFoundPage" />
    </LayoutComponent.Composed>
  );
};

export default LostFoundPage;
