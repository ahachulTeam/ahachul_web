import React, { Suspense, useEffect } from 'react';

import { ErrorComponent, UiComponent } from 'components';
import TabSection from './tabSection';
import ListSection from './listSection';
import { wrap, err } from './style';
import ErrorDefault from 'components/error-management/ErrorDefault';
import { useDispatch } from 'react-redux';
import { setTab } from 'stores/community';

const Community = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Community Page mounted successfully');

    return () => dispatch(setTab('FREE'));
  }, []);

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
