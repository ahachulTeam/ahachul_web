import { useReducer } from 'react';

import type { ActivityComponentType } from '@stackflow/react';

import { HeaderComponent, LayoutComponent, UiComponent } from '@/components';
import { LostFoundComponent } from '@/components/domain';
import { useLostFoundFilters } from '@/hooks/domain';

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
        errorFallback={<div />}
        suspenseFallback={<LostFoundComponent.SearchedListSkeleton isScale={isScale} />}
      >
        <LostFoundComponent.SearchedList keyword={keyword} filters={filters} isScale={isScale} />
      </UiComponent.SuspenseQueryBoundary>

      <UiComponent.NewButton activityName="NewLostFoundPage" />
    </LayoutComponent.Composed>
  );
};

export default LostFoundPage;
