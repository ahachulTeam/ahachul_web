import React from 'react';
import { useAppSelector } from 'stores';
import DefaultList from './results/DefaultList';
import HashTagList from './results/HashTagList';
import MentionList from './results/MentionList';

const SearchList = () => {
  const { keyword } = useAppSelector((state) => state.search);

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
