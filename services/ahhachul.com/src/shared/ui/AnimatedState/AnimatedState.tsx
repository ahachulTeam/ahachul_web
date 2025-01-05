import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function AnimatedState({
  children,
  className,
  state,
}: {
  children: React.ReactNode;
  className?: string;
  state: string;
}) {
  const variants = {
    initial: { opacity: 0, y: -25 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 25 },
  };

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={state}
        initial="initial"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
