'use client';

import React, { useState, useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useDebounce } from '@/common/hooks/useDebounce';

const SearchFilter = () => {
  const [keyword, setKeyword] = useQueryState('keyword', {
    scroll: true,
  });
  const [inputValue, setInputValue] = useState(keyword);

  const debouncedSetKeyword = useDebounce((value: string) => {
    setKeyword(value || null);
  }, 300);

  useEffect(() => {
    setInputValue(keyword);
  }, [keyword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetKeyword(value);
  };

  return (
    <input
      value={inputValue || ''}
      placeholder="Enter your name"
      className="w-full h-4 text-sm bg-slate-500"
      onChange={handleChange}
    />
  );
};

export default SearchFilter;
