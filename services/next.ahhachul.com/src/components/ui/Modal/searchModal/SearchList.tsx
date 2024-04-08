import React from 'react';
// import { useAppSelector } from '@/src/stores';
import DefaultList from './results/DefaultList';
import HashTagList from './results/HashTagList';
import MentionList from './results/MentionList';

const SearchList = () => {
  // const { keyword } = useAppSelector((state) => state.search);
  let keyword = '';

  switch (true) {
    case /^@/.test(keyword):
      return <MentionList />;
    case /^#/.test(keyword):
      return <HashTagList />;
    case typeof keyword === 'string':
      return <DefaultList />;
    default:
      return null;
  }
};

export default SearchList;
