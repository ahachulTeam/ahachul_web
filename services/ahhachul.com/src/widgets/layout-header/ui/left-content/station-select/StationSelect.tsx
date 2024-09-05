import React, { useReducer } from 'react';
import { motion } from 'framer-motion';
import { ChevronIcon } from 'widgets/layout-header/static/icons/chevron';
import * as styles from './StationSelect.css';

const wrapperVariants = {
  open: {
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    transition: {
      stiffness: 300,
      damping: 20,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleX: 0.8,
    scaleY: 0.8,
    opacity: 0,
    transition: {
      duration: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0, transition: { duration: 0.15 } },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.15,
      when: 'beforeChildren',
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.15,
      when: 'afterChildren',
    },
  },
};

const actionTextVariants = {
  open: { scale: 1, y: 0, transition: { duration: 0.15 } },
  closed: { scale: 0, y: -7, transition: { duration: 0.15 } },
};

export const StationSelect = () => {
  const [open, toggle] = useReducer((open) => !open, false);

  return (
    <div css={styles.container}>
      <motion.div
        css={{ position: 'relative' }}
        animate={open ? 'open' : 'closed'}
      >
        <button onClick={toggle} css={styles.button}>
          <span>건대입구</span>
          <motion.span variants={iconVariants}>
            <ChevronIcon />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: 'top' }}
          css={styles.menu}
        >
          <Option text="건대입구" />
          <Option text="신논현" />
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ text }: { text: string }) => {
  return (
    <motion.li variants={itemVariants} css={styles.option}>
      <motion.span variants={actionTextVariants}>{text}</motion.span>
    </motion.li>
  );
};
