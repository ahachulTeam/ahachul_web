import React from 'react';
import { useAppSelector } from 'stores';
import DefaultSearchList from './results/DefaultList';
import HashTagList from './results/HashTagList';
import MentionList from './results/MentionList';

const SearchList = () => {
  const { keyword } = useAppSelector((state) => state.search);

  switch (true) {
    case /^@/.test(keyword):
      return <MentionList />;
    case /^#/.test(keyword):
      return <HashTagList />;
    default:
      return <DefaultSearchList />;
  }
};

export default SearchList;
