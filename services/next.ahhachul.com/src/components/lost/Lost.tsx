import React, { Suspense } from 'react';

import { ErrorComponent, UiComponent } from '@/src/components';
import ErrorDefault from '@/src/components/error-management/ErrorDefault';
import { TabSection } from './tabSection';
import ListSection from './listSection/ListSection';
import { wrap, err } from './style';
import FilterSection from './filterSection';

const Lost = () => {
  return (
    <main css={wrap}>
      <TabSection />
      <FilterSection />
      <ErrorComponent.QueryErrorBoundary fallback={(props) => <ErrorDefault {...props} />} fallbackCss={err}>
        <Suspense fallback={<UiComponent.Loading />}>
          <ListSection />
        </Suspense>
      </ErrorComponent.QueryErrorBoundary>
    </main>
  );
};

export default Lost;
