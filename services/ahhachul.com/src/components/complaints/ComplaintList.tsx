import React, { Suspense } from 'react';

import { ErrorComponent, UiComponent } from 'components';
import ListSection from './listSection';
import { wrap, err } from './style';
import ErrorDefault from 'components/error-management/ErrorDefault';
import { AnimatePresence, motion } from 'framer-motion';
import { defaultFadeInVariants } from 'data/motion';
import { useAppSelector } from 'stores';

const ComplaintList = () => {
  const { activeView } = useAppSelector((state) => state.complaint);

  return (
    <AnimatePresence mode="wait">
      {activeView === 'LIST' && (
        <motion.main css={wrap} initial="initial" animate="animate" exit="exit" variants={defaultFadeInVariants}>
          <ErrorComponent.QueryErrorBoundary fallback={(props) => <ErrorDefault {...props} />} fallbackCss={err}>
            <Suspense fallback={<UiComponent.Loading />}>
              <ListSection />
            </Suspense>
          </ErrorComponent.QueryErrorBoundary>
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default ComplaintList;
