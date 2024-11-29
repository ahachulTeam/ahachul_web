import React from 'react';
import cssUtils from 'shared/utils.css';

const EmptyCommentList = () => {
  return (
    <div
      css={[
        cssUtils.sideGutter,
        {
          fontSize: '14px',
          color: '#fff',
          borderTop: '1px solid hsla(0, 0%, 100%, .09)',
          paddingTop: '24px',
        },
      ]}
    >
      댓글이 없어요
    </div>
  );
};

export default EmptyCommentList;
