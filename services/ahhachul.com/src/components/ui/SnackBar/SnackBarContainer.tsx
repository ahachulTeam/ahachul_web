import React from 'react';
import { container } from './style';
import SnackBar from './SnackBar';
import { ISnackBar } from 'types';
import { AnimatePresence, motion } from 'framer-motion';

function SnackBarContainer({ list, posBottom }: ISnackBar) {
  return (
    <AnimatePresence mode="wait">
      {list.map((snackBar) => (
        <motion.div
          key={snackBar.id}
          css={container(posBottom)}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={snackBarMotionVariants}
        >
          <SnackBar {...snackBar} />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

const snackBarMotionVariants = {
  initial: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.3,
    },
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.3,
    },
  },
};

export default SnackBarContainer;
