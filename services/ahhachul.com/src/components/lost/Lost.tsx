import React, { Suspense } from 'react';

import { TabSection } from './tabSection';
import { wrap } from './style';
import ListSection from './listSection/ListSection';
import { ErrorComponent } from 'components';

const Lost = () => {
  return (
    <main css={wrap}>
      <TabSection />
      <ErrorComponent.QueryErrorBoundary>
        <Suspense fallback={<div>loading</div>}>
          <ListSection />
        </Suspense>
      </ErrorComponent.QueryErrorBoundary>
    </main>
  );
};

export default Lost;
