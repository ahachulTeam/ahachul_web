import { useState, useRef, useCallback } from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
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
export const SearchFilter = ({ handleFocus }: SearchFilterProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFocus = useCallback(() => {
    if (!isFocused) {
      setIsFocused(true);
      handleFocus();
    }
  }, [isFocused, handleFocus]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
    },
    [],
  );

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      inputRef.current?.blur();
    },
    [],
  );

  const handleCancel = useCallback(() => {
    setIsFocused(false);
    handleFocus();
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.blur();
    }
  }, [handleFocus]);

  return (
    <form css={searchGroup} onSubmit={handleFormSubmit}>
      <button type="submit" css={addOn}>
        <SearchIcon />
      </button>
      <motion.input
        css={input}
        ref={inputRef}
        placeholder="검색"
        onFocus={handleInputFocus}
        onChange={handleInputChange}
        animate={{ maxWidth: isFocused ? 'calc(100% - 40px)' : '100%' }}
      />
      {isFocused && (
        <motion.button
          css={cancel}
          variants={cancelVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={handleCancel}
        >
          취소
        </motion.button>
      )}
    </form>
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
  left: '27px',
  top: '50%',
  transform: 'translateY(-48%)',

  '& > .search-icon': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '17.5px',
    height: '17.5px',
    opacity: 0.7,
  },
});

const input = css({
  width: '100%',
  maxWidth: '100%',
  height: '36px',
  backgroundColor: '#2E3034',
  borderRadius: '9px',
  padding: '0 12px 0 28px',
  fontSize: '16px',
  color: '#f0f4ff',
  caretColor: 'rgba(0, 255, 163, .5)',

  '&::placeholder': {
    color: '#999AA1',
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
