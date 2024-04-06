import React from 'react';

import { wrap, pageTitle } from './style';
import { AnimatePresence, motion } from 'framer-motion';
import { defaultFadeInVariants } from 'data/motion';
import { useAppSelector } from 'stores';

const PartyList = () => {
  const { activeView } = useAppSelector((state) => state.blindDate);

  return (
    <AnimatePresence mode="wait">
      {activeView === 'PARTY' && (
        <motion.main
          css={[wrap, { gap: 0 }]}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={defaultFadeInVariants}
        >
          <h2 css={pageTitle}>파티</h2>
          <div css={{ minHeight: '800px' }} />
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default PartyList;
