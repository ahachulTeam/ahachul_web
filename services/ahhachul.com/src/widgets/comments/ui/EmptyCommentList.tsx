import React from 'react';
import cssUtils from 'shared/utils.css';

interface Props {
  className?: string;
}

const EmptyCommentList = ({ className }: Props) => {
  return (
    <div
      css={[
        cssUtils.sideGutter,
        {
          fontSize: '14px',
          fontWeight: 500,
          color: '#fff',
          borderTop: '1px solid hsla(0, 0%, 100%, .09)',
          paddingTop: '24px',
          paddingBottom: '24px',
          height: '240px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
      className={className}
    >
      <p>등록된 댓글이 없습니다.</p>
      <p>첫 댓글을 남겨주세요.</p>
    </div>
  );
};

export default EmptyCommentList;
