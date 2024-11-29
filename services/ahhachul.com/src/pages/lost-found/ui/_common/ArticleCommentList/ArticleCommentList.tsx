import React from 'react';
import type { WithArticleId } from 'features/articles';
import { BaseCommentList } from 'widgets/comments/ui/BaseCommentList';
import { useGetLostFoundComments } from 'pages/lost-found/api/get-comments';
import * as styles from './ArticleCommentList.css';

export const ArticleCommentList = ({ articleId }: WithArticleId) => {
  const { data } = useGetLostFoundComments({ articleId });

  return (
    <BaseCommentList
      commentsMap={data.comments}
      css={styles.commentListLayout}
    />
  );
};
