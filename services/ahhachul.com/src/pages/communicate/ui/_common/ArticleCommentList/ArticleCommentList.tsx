import React from 'react';
import { withSuspense } from '@ahhachul/react-hooks-utility';
import { useGetCommunityComments } from 'pages/communicate/api/get-comments';
import type { WithArticleId } from 'features/articles';
import { BaseCommentList } from 'widgets/comments/ui/BaseCommentList';
import * as styles from './ArticleCommentList.css';

const ArticleCommentList = ({ articleId }: WithArticleId) => {
  const { data } = useGetCommunityComments({ articleId });

  return (
    <BaseCommentList
      commentsMap={data.comments}
      css={styles.commentListLayout}
    />
  );
};

export default withSuspense(ArticleCommentList, {
  fallback: <></>,
});
