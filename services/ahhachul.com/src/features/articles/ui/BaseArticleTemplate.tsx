import React from 'react';

import type { ArticleDetail } from 'features/articles/model';
import { LikeIcon } from 'widgets/articles/static/icons/like';
import { BookmarkIcon } from 'widgets/articles/static/icons/bookmark';
import { subwayLineToKrMap } from 'widgets/train-infos/lib/subway-line-to-kr';
import { checkContentType } from 'features/articles/lib/check-content-type';
import { formatDate } from 'shared/lib/utils/date/format-date';
import { ArticleContentParser } from './ArticleContentParser';
import BaseArticleImages from './BaseArticleImages';
import * as styles from './BaseArticleTemplate.css';

interface BaseArticleTemplateProps {
  article: ArticleDetail;
}

export const BaseArticleTemplate = React.memo(
  ({ article }: BaseArticleTemplateProps) => {
    const contentType = checkContentType(article.content);
    const isPlainContent = contentType !== 'json';

    return (
      <>
        <BaseArticleImages label={article.title} images={article.images} />

        <h1 css={styles.articleTitle}>{article.title}</h1>
        <div css={styles.articleBasicInfos}>
          <h2>{article.writer || 'LOST112'}</h2>
          <div>
            {`${formatDate(article.createdAt)}. ${subwayLineToKrMap[article.subwayLineId]}`}
          </div>
          <span>자유</span>
        </div>

        <ArticleContentParser
          content={article.content}
          isPlainContent={isPlainContent}
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
