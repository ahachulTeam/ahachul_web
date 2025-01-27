'use client';

import { BookmarkIcon } from '@/asset/icon';
import { BaseCommentList, SuspenseQueryBoundary, CommentListSuspenseFallback } from '@/component';

import { useGetLostFoundComments } from '../../_lib';

interface Props {
  commentCnt: number;
  articleId: number;
}

export const CommentListInner = ({ articleId }: Pick<Props, 'articleId'>) => {
  const { data } = useGetLostFoundComments(articleId);

  return <BaseCommentList commentsMap={data.comments} />;
};

export const LostFoundCommentList = ({ commentCnt, articleId }: Props) => {
  return (
    <section>
      <div className=" border-t border-t-gray-30 h-[50px] flex items-center justify-between px-5">
        <div className=" flex items-center gap-1 text-gray-80 text-label-medium">
          <span>댓글</span>
          <span>{commentCnt}</span>
        </div>
        <BookmarkIcon />
      </div>
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
