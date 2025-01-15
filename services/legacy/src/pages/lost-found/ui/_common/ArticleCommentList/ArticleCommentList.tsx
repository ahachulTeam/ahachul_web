import { Suspense } from 'react';

import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import type { WithArticleId } from 'features/articles';
import { useGetLostFoundComments } from 'pages/lost-found/api/get-comments';
import { BaseCommentList } from 'widgets/comments/ui/BaseCommentList';
import CommentListSuspenseFallback from 'widgets/comments/ui/CommentListSuspenseFallback';

import * as styles from './ArticleCommentList.css';

export const ArticleCommentList = ({
  articleId,
  commentCnt,
}: WithArticleId & { commentCnt: number }) => {
  return (
    <section css={styles.commentSection}>
      <div css={styles.decs}>
        <p>전체 댓글 {commentCnt}</p>
      </div>
      <QueryErrorBoundary errorFallback={() => null} keys={[articleId]}>
        <Suspense fallback={<CommentListSuspenseFallback />}>
          <ArticleCommentListInner articleId={articleId} />
        </Suspense>
      </QueryErrorBoundary>
    </section>
  );
};

export const ArticleCommentListInner = ({ articleId }: WithArticleId) => {
  const { data } = useGetLostFoundComments(articleId);

  return <BaseCommentList commentsMap={data.comments} />;
};
