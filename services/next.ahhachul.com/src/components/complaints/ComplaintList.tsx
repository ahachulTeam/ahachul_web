import React, { Suspense } from 'react';

import { ErrorComponent, UiComponent } from '@/src/components';
import ListSection from './listSection';
import { wrap, pageTitle, err } from './style';
import ErrorDefault from '@/src/components/error-management/ErrorDefault';
import { AnimatePresence, motion } from 'framer-motion';
import { defaultFadeInVariants } from '@/src/data/motion';
// import { useAppSelector } from '@/src/stores';
import FilterSection from './filterSection';

const ComplaintList = () => {
  // const { activeView } = useAppSelector((state) => state.complaint);

  return (
    <AnimatePresence mode="wait">
      {/* {activeView === 'LIST' && ( */}
      <motion.main
        css={[wrap, { gap: 0 }]}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={defaultFadeInVariants}
      >
        <h2 css={pageTitle}>실시간 민원</h2>
        <FilterSection />
        <ErrorComponent.QueryErrorBoundary fallback={(props) => <ErrorDefault {...props} />} fallbackCss={err}>
          <Suspense fallback={<UiComponent.Loading />}>
            <ListSection />
          </Suspense>
        </ErrorComponent.QueryErrorBoundary>
      </motion.main>
      {/* )} */}
    </AnimatePresence>
  );
};

export default ComplaintList;
