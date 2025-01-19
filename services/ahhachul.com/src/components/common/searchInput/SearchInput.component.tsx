import React, { useState, useRef, useCallback, useEffect } from 'react';

import { AnimatePresence } from 'motion/react';
import { Subject, debounceTime } from 'rxjs';

import { SearchIcon } from '@/assets/icons/system';
import type { AppUniqueFilterId } from '@/types/filter';

import useSearchInput from './SearchInput.hook';
import * as S from './SearchInput.styled';

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

export interface SearchInputProps {
  uniqueId: AppUniqueFilterId;
  toggleScale: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ uniqueId, toggleScale }) => {
  const { updateKeyword, resetKeyword } = useSearchInput(uniqueId);

  const subject = useRef(new Subject<string>());
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleAnimation = useCallback(
    (focusValue: boolean) => {
      setIsFocused(focusValue);
      toggleScale();
    },
    [toggleScale],
  );

  const handleInputFocus = useCallback(() => {
    if (!isFocused) {
      handleAnimation(true);
    }
  }, [isFocused, handleAnimation]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    subject.current.next(value);
  }, []);

  const handleFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const inputValue = formData.get('search') as string;
    updateKeyword(inputValue);
    inputRef.current?.blur();
  }, []);

  const handleCancel = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    resetKeyword();
    handleAnimation(false);
  }, [resetKeyword, handleAnimation]);

  useEffect(() => {
    const subscription = subject.current
      .pipe(debounceTime(300))
      .subscribe(value => updateKeyword(value));

    return () => subscription.unsubscribe();
  }, [updateKeyword]);

  return (
    <S.Form onSubmit={handleFormSubmit}>
      <S.SearchIconWrapper type="submit">
        <SearchIcon />
      </S.SearchIconWrapper>
      <S.SearchInput
        ref={inputRef}
        name="search"
        placeholder="검색"
        onFocus={handleInputFocus}
        onChange={handleInputChange}
        animate={{ maxWidth: isFocused ? 'calc(100% - 40px)' : '100%' }}
      />
      <AnimatePresence>
        {isFocused && (
          <S.CancelButton
            initial="initial"
            animate="animate"
            exit="exit"
            variants={cancelVariants}
            onClick={handleCancel}
            type="button"
          >
            취소
          </S.CancelButton>
        )}
      </AnimatePresence>
    </S.Form>
  );
};

export default SearchInput;
