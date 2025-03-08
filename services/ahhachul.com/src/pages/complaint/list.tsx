import React, { useReducer } from 'react';

import type { ActivityComponentType } from '@stackflow/react';

import { HeaderComponent, LayoutComponent, UiComponent } from '@/components';
import { ComplaintComponent } from '@/components/domain';
import { useComplaintFilters } from '@/hooks/domain';

const SearchedListSkeleton = React.lazy(
  () => import('@/components/domain/complaint/searchResults/skeleton/SearchedList.skeleton'),
);
const SearchedList = React.lazy(
  () => import('@/components/domain/complaint/searchResults/searchedList/SearchedList.component'),
);

const ComplaintListPage: ActivityComponentType = () => {
  const [isScale, toggleScale] = useReducer(scale => !scale, false);

  const { loaded, keyword, filters, boundaryKeys, getFilterProps } = useComplaintFilters();

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
        <ComplaintComponent.FilterList
          isScale={isScale}
          toggleScale={toggleScale}
          {...getFilterProps()}
        />
      }
    >
      <UiComponent.SuspenseQueryBoundary
        keys={boundaryKeys}
        errorFallback={<div />}
        suspenseFallback={<SearchedListSkeleton isScale={isScale} />}
      >
        <SearchedList keyword={keyword} filters={filters} isScale={isScale} />
      </UiComponent.SuspenseQueryBoundary>

      <UiComponent.NewButton
        activityName="ComplaintPage"
        label="민원 생성하기"
        checkAuth={false}
        replace
      />
    </LayoutComponent.Composed>
  );
};

export default ComplaintListPage;
