import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { SearchIcon } from 'widgets/layout-header/static/icons/search';

const cancelVariants = {
  initial: {
    opacity: 0,
    transform: 'translate(100%, -50%)',
    transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] },
    willChange: 'opacity, transform',
  },
  animate: {
    opacity: 1,
    transform: 'translate(0, -50%)',
    transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] },
    willChange: 'opacity, transform',
  },
  exit: {
    opacity: 0,
    transform: 'translate(100%, -50%)',
    transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] },
    willChange: 'opacity, transform',
  },
};

interface SearchFilterProps {
  handleFocus: VoidFunction;
}
export const SearchFilter = (props: SearchFilterProps) => {
  const [showCancel, setShowCancel] = useState(false);
  const toggleFocus = () => props.handleFocus?.();
  const onFocus = () => {
    toggleFocus();
    setShowCancel(true);
  };
  const handleCancel = () => {
    toggleFocus();
    setShowCancel(false);
  };

  return (
    <div css={searchGroup}>
      <button css={addOn}>
        <SearchIcon />
      </button>
      <motion.input
        css={input}
        placeholder="검색"
        onFocus={onFocus}
        animate={{ maxWidth: showCancel ? 'calc(100% - 40px)' : '100%' }}
      />
      {showCancel && (
        <motion.button
          css={cancel}
          variants={cancelVariants}
          exit="exit"
          animate="animate"
          initial="initial"
          onClick={handleCancel}
        >
          취소
        </motion.button>
      )}
    </div>
  );
};

const searchGroup = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  width: '100%',
  padding: '0 20px',
  backgroundColor: '#141517',
});

const addOn = css({
  position: 'absolute',
  left: '34px',
  top: '50%',
  transform: 'translateY(-50%)',

  '& > .search-icon': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '18px',
    height: '18px',
    opacity: 0.7,
  },
});

const input = css({
  width: '100%',
  maxWidth: '100%',
  height: '32px',
  backgroundColor: 'rgba(119, 119, 119, 0.388)',
  borderRadius: '7px',
  padding: '0 12px 0 34px',
  fontSize: '16px',
  color: '#f0f4ff',
  caretColor: 'rgba(0, 255, 163, .5)',

  '&::placeholder': {
    color: '#f0f4ff',
  },

  '&:active:not(:focus)': {
    backgroundColor: 'rgba(119, 119, 119, 0.8)',
  },

  transition: 'all 0.3s ease',
});

const cancel = css({
  position: 'absolute',
  right: '20px',
  top: '50%',
  transform: 'translate(100%, -50%)',
  fontSize: '16px',
  color: '#025FAC',
});
