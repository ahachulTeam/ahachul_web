import React from 'react';
import { useGetCommunityComments } from 'pages/communicate/api/get-comments';
import type { WithArticleId } from 'features/articles';
import { BaseCommentList } from 'widgets/comments/ui/BaseCommentList';
import * as styles from './ArticleCommentList.css';

export const ArticleCommentList = ({ articleId }: WithArticleId) => {
  const { data } = useGetCommunityComments({ articleId });

  return (
    <BaseCommentList
      commentsMap={data.comments}
      css={styles.commentListLayout}
    />
  );
};
