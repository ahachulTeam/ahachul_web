import React, { useCallback, useEffect } from 'react';

import HistoryList from './History';
import RankKeywords from './RankKeywords';
import SearchGroup from './SearchGroup';

import { CSSObject } from '@emotion/react';
import { useDispatch } from 'react-redux';
import IconBack from 'static/icons/system/IconBack';
import { f } from 'styles';
import { hideModal, setKeyword } from 'stores/search/reducer';
import { useAppSelector } from 'stores';
import SearchList from './SearchList';

const SearchBase = () => {
  const dispatch = useDispatch();
  const { keyword, showModal } = useAppSelector((state) => state.search);

  const handleModalClose = useCallback(() => {
    dispatch(hideModal());
  }, []);

  useEffect(() => {
    if (showModal) {
      dispatch(setKeyword(null));
    }
  }, [showModal]);

  return (
    <article css={wrap}>
      <div css={modalHead}>
        <IconBack onClick={handleModalClose} />
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
