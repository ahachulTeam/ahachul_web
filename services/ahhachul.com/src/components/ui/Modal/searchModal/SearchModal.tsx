import React from 'react';
import { CSSObject } from '@emotion/react';
import { useAppSelector } from 'stores';
import { motion } from 'framer-motion';

import { AnimatePortal } from '../../Portal';
import { defaultFadeInVariants } from 'data/motion';

const FadeInModal = ({ children }: { children: React.ReactNode[] }) => {
  const { showModal, keyword } = useAppSelector((state) => state.search);

  const [base, auto] = children;

  return (
    <>
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
            variants={defaultFadeInVariants}
          >
            {base}
          </motion.dialog>
        </div>
      </AnimatePortal>
      <AnimatePortal isShowing={Boolean(keyword)} mode="sync">
        <div css={dim2}>
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
            {auto}
          </motion.dialog>
        </div>
      </AnimatePortal>
    </>
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

const dim2: CSSObject = {
  position: 'fixed',
  top: '58px', //modal header height
  right: 0,
  bottom: 0,
  left: 0,
  width: '100vw',
  height: 'calc(100vh - 58px)',
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
