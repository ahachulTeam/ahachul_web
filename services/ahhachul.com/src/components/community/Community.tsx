import React, { Suspense } from 'react';

import { ErrorComponent } from 'components';
import TabSection from './tabSection';
import ListSection from './listSection';
import { wrap } from './style';

const Community = () => {
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

export default Community;
