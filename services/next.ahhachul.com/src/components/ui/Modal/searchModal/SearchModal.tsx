import React from 'react';
import { CSSObject } from '@emotion/react';
// import { useAppSelector } from '@/src/stores';
import { motion } from 'framer-motion';

import { AnimatePortal } from '../../Portal';
import { defaultFadeInVariants } from '@/src/data/motion';

const FadeInModal = ({ children }: { children: React.ReactNode }) => {
  // const { showModal } = useAppSelector((state) => state.search);

  return (
    <AnimatePortal isShowing mode="sync">
      <div css={dim}>
        <motion.dialog
          css={dialog}
          tabIndex={0}
          aria-haspopup="true"
          aria-labelledby="modal"
          aria-modal="true"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={defaultFadeInVariants}
        >
          {children}
        </motion.dialog>
      </div>
    </AnimatePortal>
  );
};

const dim: CSSObject = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'unset',
  zIndex: 100000,
};

const dialog: CSSObject = {
  position: 'relative',
  display: 'block',
  padding: 0,
  border: 0,
  width: '100%',
  height: '100%',
  backgroundColor: '#141517',
  zIndex: 10000000,
};

export default FadeInModal;
