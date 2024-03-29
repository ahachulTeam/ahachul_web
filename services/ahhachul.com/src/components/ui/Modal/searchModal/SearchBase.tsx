import React, { useCallback } from 'react';

import HistoryList from './History';
import HashTagList from './Hashtag';
import SearchGroup from './SearchGroup';

import { CSSObject } from '@emotion/react';
import { useDispatch } from 'react-redux';
import IconBack from 'static/icons/system/IconBack';
import { f } from 'styles';
import { hideModal } from 'stores/search/reducer';

const SearchBase = () => {
  const dispatch = useDispatch();

  const handleModalClose = useCallback(() => {
    dispatch(hideModal());
  }, []);

  return (
    <article css={wrap}>
      <div css={modalHead}>
        <IconBack onClick={handleModalClose} />
        <SearchGroup />
      </div>
      <HistoryList />
      <HashTagList />
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
