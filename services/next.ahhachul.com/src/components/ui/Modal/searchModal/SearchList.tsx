import React from 'react';
import { useAppSelector } from '@/src/stores';
import DefaultList from './results/DefaultList';
import HashTagList from './results/HashTagList';
import MentionList from './results/MentionList';

const SearchList = () => {
  const { keyword } = useAppSelector((state) => state.search);

  switch (true) {
    case /^@/.test(keyword as string):
      return <MentionList />;
    case /^#/.test(keyword as string):
      return <HashTagList />;
    case typeof keyword === 'string':
      return <DefaultList />;
    default:
      return null;
  }
};

export default SearchList;
