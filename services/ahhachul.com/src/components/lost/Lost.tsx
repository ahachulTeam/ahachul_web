import React, { Suspense } from 'react';

import { ErrorComponent, UiComponent } from 'components';
import ErrorDefault from 'components/error-management/ErrorDefault';
import { TabSection } from './tabSection';
import ListSection from './listSection/ListSection';
import { wrap, err } from './style';

const Lost = () => {
  return (
    <main css={wrap}>
      <TabSection />
      <ErrorComponent.QueryErrorBoundary fallback={(props) => <ErrorDefault {...props} />} fallbackCss={err}>
        <Suspense fallback={<UiComponent.Loading />}>
          <ListSection />
        </Suspense>
      </ErrorComponent.QueryErrorBoundary>
    </main>
  );
};

export default Lost;
