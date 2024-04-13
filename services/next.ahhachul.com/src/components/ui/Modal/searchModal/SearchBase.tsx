import React, { useEffect } from 'react';

import HistoryList from './History';
import RankKeywords from './RankKeywords';
import SearchGroup from './SearchGroup';

import { CSSObject } from '@emotion/react';
import { useDispatch } from 'react-redux';
import IconBack from '@/src/static/icons/system/IconBack';
import { f } from '@/src/styles';
import { hideModal, setKeyword } from '@/src/stores/search/reducer';
import { useAppSelector } from '@/src/stores';
import SearchList from './SearchList';
import { debounce } from 'lodash-es';

const SearchBase = () => {
  const dispatch = useDispatch();
  const { keyword, showModal } = useAppSelector((state) => state.search);

  const closeModal = () => dispatch(hideModal());
  const debouncedHide = debounce(closeModal, 200);

  useEffect(() => {
    if (!showModal) return;
    else dispatch(setKeyword(null));
  }, [showModal]);

  return (
    <article css={wrap}>
      <div css={modalHead}>
        <IconBack onClick={debouncedHide} />
        <SearchGroup />
      </div>
      {!keyword ? (
        <>
          <HistoryList />
          <RankKeywords />
        </>
      ) : (
        <SearchList />
      )}
    </article>
  );
};

const wrap = {
  width: '100%',
  height: '100%',
  backgroundColor: '#141517',
};

const modalHead: [CSSObject[], CSSObject] = [
  f.flexAlignCenter,
  {
    position: 'relative',
    height: '58px',
    padding: '0 20px',

    '& > div > svg > path': {
      stroke: '#6E7D9D',
    },
  },
];

export default SearchBase;
