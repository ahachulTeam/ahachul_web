import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import type { ArticleDetail } from 'features/articles/model';
import { LikeIcon } from 'widgets/articles/static/icons/like';
import { BookmarkIcon } from 'widgets/articles/static/icons/bookmark';
import { ArticleContentParser } from './ArticleContentParser';
import * as styles from './BaseArticleTemplate.css';

interface BaseArticleTemplateProps {
  article: ArticleDetail;
}

export const BaseArticleTemplate = React.memo(
  ({ article }: BaseArticleTemplateProps) => {
    const thumbnail = article?.images?.[0]?.imageUrl;

    return (
      <>
        {thumbnail && (
          <div css={styles.thumbnailContainer}>
            <LazyLoadImage
              src={thumbnail}
              alt={article.title}
              css={styles.thumbnail}
              effect="opacity"
            />
          </div>
        )}

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
