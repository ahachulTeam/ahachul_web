import React from 'react';

import { useGetLostFoundComments } from '../../_lib/comments';
import { BaseCommentList } from '@/common/components/Comment/BaseCommentList';
import { SuspenseQueryBoundary } from '@/common/components/SuspenseQueryBoundary/SuspenseQueryBoundary';
import { CommentListSuspenseFallback } from '@/common/components/Comment/BaseCommentList.suspense';

interface Props {
  articleId: number;
}

export const CommentListInner = ({ articleId }: Props) => {
  const { data } = useGetLostFoundComments(articleId);

  return <BaseCommentList commentsMap={data.comments} />;
};

export const LostFoundCommentList = ({ articleId }: Props) => {
  return (
    <section>
      <SuspenseQueryBoundary
        errorFallback={<></>}
        suspenseFallback={<CommentListSuspenseFallback />}
        keys={[articleId]}
      >
        <CommentListInner articleId={articleId} />
      </SuspenseQueryBoundary>
    </section>
  );
};
