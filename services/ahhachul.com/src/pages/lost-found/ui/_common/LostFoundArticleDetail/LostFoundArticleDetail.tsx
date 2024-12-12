import React from 'react';
import type { WithArticleId } from 'features/articles';
import { useGetLostFoundDetail } from 'pages/lost-found/api/get-detail';
import { LikeIcon } from 'widgets/articles/static/icons/like';
import { BookmarkIcon } from 'widgets/articles/static/icons/bookmark';
import { checkContentType } from 'features/articles/lib/check-content-type';
import { ArticleContentParser } from 'features/articles/ui/ArticleContentParser';
import BaseArticleImages from 'features/articles/ui/BaseArticleImages';
import { getRandomInt } from 'shared/lib/utils/common/getRandomInt';

import { ArticleCommentList } from '../ArticleCommentList/ArticleCommentList';
import RecommendArticleList from '../RecommendArticleList/RecommendArticleList';
import * as styles from './LostFoundArticleDetail.css';
import * as articleStyles from 'features/articles/ui/BaseArticleTemplate.css';

const LostFoundArticleDetail = ({ articleId }: WithArticleId) => {
  const { data: article } = useGetLostFoundDetail({ articleId });
  const commentCnt = article.commentCnt;
  const recommendPosts = article.recommendPosts;
  const images = article.isFromLost112
    ? [
        {
          imageId: getRandomInt(),
          imageUrl: article.externalSourceImageUrl,
        },
      ]
    : article.images;

  const contentType = checkContentType(article.content);
  const isPlainContent = contentType !== 'json';

  return (
    <article css={styles.article}>
      <BaseArticleImages label={article.title} images={images} />

      <h1 css={articleStyles.articleTitle}>{article.title}</h1>
      <div css={articleStyles.articleBasicInfos}>
        <h2>{article.isFromLost112 ? 'LOST112' : article.writer}</h2>
        <time>{article.createdAt}</time>
        <span>자유</span>
      </div>

      <ArticleContentParser
        content={article.content}
        isPlainContent={isPlainContent}
      />

      {article.likeCnt && (
        <div css={articleStyles.countLabelInfos}>
          <div css={articleStyles.likeCount}>
            <LikeIcon />
            <span>{article.likeCnt}</span>
          </div>
          <BookmarkIcon />
        </div>
      )}

      <ArticleCommentList articleId={articleId} commentCnt={commentCnt} />

      <RecommendArticleList recommendPosts={recommendPosts} />
    </article>
  );
};

export default LostFoundArticleDetail;
