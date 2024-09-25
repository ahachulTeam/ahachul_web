import React, { useState, useRef, useCallback, useEffect } from 'react';
import { css } from '@emotion/react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon } from 'widgets/layout-header/static/icons/search';
import { Subject, debounceTime } from 'rxjs';

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

export interface SearchFilterProps {
  handleScale: () => void;
  handleSetKeyword: (keyword: string) => void;
  resetKeyword: () => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  handleScale,
  handleSetKeyword,
  resetKeyword,
}) => {
  const subject = useRef(new Subject<string>());
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleAnimation = useCallback(
    (focusValue: boolean) => {
      setIsFocused(focusValue);
      handleScale();
    },
    [handleScale],
  );

  const handleInputFocus = useCallback(() => {
    if (!isFocused) {
      handleAnimation(true);
    }
  }, [isFocused, handleAnimation]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      subject.current.next(value);
    },
    [],
  );

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const inputValue = formData.get('search') as string;
      subject.current.next(inputValue);
      inputRef.current?.blur();
    },
    [],
  );

  const handleCancel = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    resetKeyword();
    handleAnimation(false);
  }, [resetKeyword, handleAnimation]);

  useEffect(() => {
    const subscription = subject.current
      .pipe(debounceTime(800))
      .subscribe((value) => handleSetKeyword(value));

    return () => subscription.unsubscribe();
  }, [handleSetKeyword]);

  return (
    <form css={searchGroup} onSubmit={handleFormSubmit}>
      <button type="submit" css={addOn}>
        <SearchIcon />
      </button>
      <motion.input
        css={input}
        ref={inputRef}
        name="search"
        placeholder="검색"
        onFocus={handleInputFocus}
        onChange={handleInputChange}
        animate={{ maxWidth: isFocused ? 'calc(100% - 40px)' : '100%' }}
      />
      <AnimatePresence>
        {isFocused && (
          <motion.button
            css={cancel}
            variants={cancelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={handleCancel}
            type="button"
          >
            취소
          </motion.button>
        )}
      </AnimatePresence>
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
