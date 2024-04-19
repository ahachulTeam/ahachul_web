import React, { Suspense } from 'react';

import { ErrorComponent, UiComponent } from '@/src/components';
import ListSection from './listSection';
import { wrap, pageTitle, err } from './style';
import ErrorDefault from '@/src/components/error-management/ErrorDefault';
import FilterSection from './filterSection';

const ComplaintList = () => {
  return (
    <section css={[wrap, { gap: 0 }]}>
      <h2 css={pageTitle}>실시간 민원</h2>
      <FilterSection />
      <ErrorComponent.QueryErrorBoundary fallback={(props) => <ErrorDefault {...props} />} fallbackCss={err}>
        <Suspense fallback={<UiComponent.Loading />}>
          <ListSection />
        </Suspense>
      </ErrorComponent.QueryErrorBoundary>
    </section>
  );
};

export default ComplaintList;
