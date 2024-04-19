import React from 'react';
// import { useFlow } from 'stackflow';
import IconChevron from '@/src/static/icons/system/IconChevron';

import { wrap } from './style';

const Filter = () => {
  // const { push } = useFlow();

  return (
    <div css={wrap}>
      <ul>
        <li>2</li>
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
