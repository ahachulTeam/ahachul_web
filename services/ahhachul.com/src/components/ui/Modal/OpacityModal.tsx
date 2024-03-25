import React from 'react';
import { CSSObject } from '@emotion/react';
import { useAppSelector } from 'stores';
import { motion, type Variants } from 'framer-motion';

import { AnimatePortal } from '../Portal';

const OpacityModal = ({ children }: { children: React.ReactNode }) => {
  const { showModal } = useAppSelector((state) => state.ui);

  return (
    <AnimatePortal isShowing={showModal} mode="sync">
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
          variants={fadeInVariants}
        >
          {children}
        </motion.dialog>
      </div>
    </AnimatePortal>
  );
};

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInVariants: Variants = {
  initial: {
    opacity: 0,
    transition: { duration: 0.3, ease: easing },
    willChange: 'opacity',
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: easing },
    willChange: 'opacity',
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: easing },
    willChange: 'opacity',
  },
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

export default OpacityModal;
