import React, { useReducer } from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { ChevronIcon } from 'widgets/layout-header/static/icons/chevron';

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
      when: 'afterChildren',
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
    <div css={containerStyle}>
      <motion.div
        css={{ position: 'relative' }}
        animate={open ? 'open' : 'closed'}
      >
        <button onClick={toggle} css={buttonStyle}>
          <span>건대입구</span>
          <motion.span variants={iconVariants}>
            <ChevronIcon />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: 'top' }}
          css={menuStyle}
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
    <motion.li variants={itemVariants} css={optionStyle}>
      <motion.span variants={actionTextVariants}>{text}</motion.span>
    </motion.li>
  );
};

const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const buttonStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 6px;
  color: #f0f4ff;
  font-size: 18px;
  font-weight: bold;
`;

const menuStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  background-color: white;
  box-shadow:
    0 10px 15px rgba(0, 0, 0, 0.1),
    0 4px 6px rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 120%;
  left: 12px;
  width: 192px;
  overflow: hidden;
`;

const optionStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  border-radius: 6px;
  color: #334155;
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;
  &:hover {
    background-color: #e0e7ff;
    color: #6366f1;
  }
`;
