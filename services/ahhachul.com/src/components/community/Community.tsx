import React, { Suspense } from 'react';

import { ErrorComponent, UiComponent } from 'components';
import TabSection from './tabSection';
import ListSection from './listSection';
import { wrap, err } from './style';
import ErrorDefault from 'components/error-management/ErrorDefault';

const Community = () => {
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

export default Community;
