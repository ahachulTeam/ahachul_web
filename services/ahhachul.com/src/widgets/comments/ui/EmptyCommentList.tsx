import React from 'react';
import * as styles from './EmptyCommentList.css';

interface Props {
  className?: string;
}

const EmptyCommentList = ({ className }: Props) => {
  return (
    <div css={styles.wrap} className={className}>
      <p>댓글이 없어요.</p>
      <p>첫 댓글을 남겨주세요.</p>
    </div>
  );
};

export default EmptyCommentList;
