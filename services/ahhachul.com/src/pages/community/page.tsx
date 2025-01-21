import { useReducer } from 'react';

import { CommunityComponent, HeaderComponent, LayoutComponent, UiComponent } from '@/components';
import { useCommunityFilters } from '@/hooks/domain/community';

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
        errorFallback={<div />}
        suspenseFallback={<CommunityComponent.SearchedListSkeleton isScale={isScale} />}
      >
        <CommunityComponent.SearchedList keyword={keyword} filters={filters} isScale={isScale} />
      </UiComponent.SuspenseQueryBoundary>

      <UiComponent.NewButton activityName="NewCommunityPage" />
    </LayoutComponent.Composed>
  );
};

export default CommunityPage;
