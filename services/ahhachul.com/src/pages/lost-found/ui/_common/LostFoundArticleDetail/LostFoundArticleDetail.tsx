import React from 'react';
import type { WithArticleId } from 'features/articles';
import { useGetLostFoundDetail } from 'pages/lost-found/api/get-detail';
import { BaseArticleTemplate } from 'features/articles/ui/BaseArticleTemplate';
import { ArticleCommentList } from '../ArticleCommentList/ArticleCommentList';
import RecommendArticleList from '../RecommendArticleList/RecommendArticleList';
import * as styles from './LostFoundArticleDetail.css';

const LostFoundArticleDetail = ({ articleId }: WithArticleId) => {
  const { data } = useGetLostFoundDetail({ articleId });
  const commentCnt = data.commentCnt;
  const recommendPosts = data.recommendPosts;

  return (
    <article css={styles.article}>
      <BaseArticleTemplate article={data} />

      <ArticleCommentList articleId={articleId} commentCnt={commentCnt} />

      <RecommendArticleList recommendPosts={recommendPosts} />
    </article>
  );
};

export default LostFoundArticleDetail;
