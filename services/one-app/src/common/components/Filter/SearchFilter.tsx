'use client';

import React, { useState, useEffect } from 'react';
<<<<<<< HEAD

import { useQueryState } from 'nuqs';

import { SearchIcon } from '@/common/assets/icons';
import { useDebounce } from '@/common/hooks';
=======
import { useQueryState } from 'nuqs';

import { useDebounce } from '@/common/hooks';
import { SearchIcon } from '@/common/assets/icons';
>>>>>>> main

export const SearchFilter = () => {
  const [keyword, setKeyword] = useQueryState('keyword', {
    scroll: true,
    defaultValue: '',
  });
  const [inputValue, setInputValue] = useState(keyword);

  const debouncedSetKeyword = useDebounce((value: string) => {
    setKeyword(value || null);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetKeyword(value);
  };

  useEffect(() => {
    setInputValue(keyword);
  }, [keyword]);

  return (
    <div className=" relative py-[3px] px-1 flex items-center justify-center bg-gray-20 rounded-lg">
      <button>
        <SearchIcon />
      </button>
      <input
        value={inputValue}
        placeholder="검색 키워드를 입력해주세요"
        className="w-full h-[30px] text-sm bg-gray-20"
        onChange={handleChange}
      />
    </div>
  );
};
