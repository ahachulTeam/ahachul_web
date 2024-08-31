import React, { Suspense } from 'react';

import { ErrorComponent, UiComponent } from '@/src/components';
import TabSection from './tabSection';
import ListSection from './listSection';
import { wrap, err } from './style';
import ErrorDefault from '@/src/components/error-management/ErrorDefault';
import FilterSection from './filterSection';

const Community = () => {
  return (
    <div css={wrap}>
      <TabSection />
      <FilterSection />
      <ErrorComponent.QueryErrorBoundary fallback={(props) => <ErrorDefault {...props} />} fallbackCss={err}>
        <Suspense fallback={<UiComponent.Loading />}>
          <ListSection />
        </Suspense>
      </ErrorComponent.QueryErrorBoundary>
    </div>
  );
};

export default Community;
