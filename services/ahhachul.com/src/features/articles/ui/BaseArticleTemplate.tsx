import React from 'react';

import type { ArticleDetail } from 'features/articles/model';
import { LikeIcon } from 'widgets/articles/static/icons/like';
import { BookmarkIcon } from 'widgets/articles/static/icons/bookmark';
import { ArticleContentParser } from './ArticleContentParser';
import * as styles from './BaseArticleTemplate.css';
import BaseArticleImages from './BaseArticleImages';

interface BaseArticleTemplateProps {
  article: ArticleDetail;
}

export const BaseArticleTemplate = React.memo(
  ({ article }: BaseArticleTemplateProps) => {
    return (
      <>
        <BaseArticleImages label={article.title} images={article.images} />

        <h1 css={styles.articleTitle}>{article.title}</h1>
        <div css={styles.articleBasicInfos}>
          <h2>{article.writer || 'LOST112'}</h2>
          <time>{article.createdAt}</time>
          <span>자유</span>
        </div>

        <ArticleContentParser
          content={article.content}
          isPlainContent={!article.writer}
        />

        {article.likeCnt && (
          <div css={styles.countLabelInfos}>
            <div css={styles.likeCount}>
              <LikeIcon />
              <span>{article.likeCnt}</span>
            </div>
            <BookmarkIcon />
          </div>
        )}
      </>
    );
  },
);
