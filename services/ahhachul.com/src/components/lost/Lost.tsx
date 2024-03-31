import React, { Suspense } from 'react';

import { ErrorComponent, UiComponent } from 'components';
import ErrorDefault from 'components/error-management/ErrorDefault';
import { TabSection } from './tabSection';
import ListSection from './listSection/ListSection';
import { wrap, err } from './style';
// import { useDispatch } from 'react-redux';
// import { setTab } from 'stores/lost';

const Lost = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('Lost Page mounted successfully');

  //   return () => dispatch(setTab('LOST'));
  // }, []);

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
