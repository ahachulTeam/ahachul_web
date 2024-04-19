import React from 'react';
import { container } from './style';
import SnackBar from './SnackBar';
import { ISnackBar } from '@/src/types';
import { AnimatePresence, motion } from 'framer-motion';
import { snackBarMotionVariants } from '@/src/data/motion';

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

export default SnackBarContainer;
