import React from 'react';
import IconChevron from 'static/icons/system/IconChevron';

import { wrap } from './style';

const Filter = () => {
  return (
    <div css={wrap}>
      <ul>
        <li>4</li>
        <li>1</li>
        <li>9</li>
      </ul>
      <button>
        <span>전체 노선도 보기</span>
        <IconChevron />
      </button>
    </div>
  );
};

export default Filter;
