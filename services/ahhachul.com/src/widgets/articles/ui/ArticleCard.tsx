import { LazyLoadImage } from 'react-lazy-load-image-component';

import { css } from '@emotion/react';
import { Link, type TypeActivities } from 'app/stackflow';
import type { Article } from 'features/articles';
import { checkContentType } from 'features/articles/lib/check-content-type';
import { ArticleContentParser } from 'features/articles/ui/ArticleContentParser';
import { formatDate } from 'shared/lib/utils/date/format-date';
import { subwayLineHexColors } from 'widgets/train-infos/lib/subway-line-hex-colors';
import { subwayLineToKrMap } from 'widgets/train-infos/lib/subway-line-to-kr';

import * as styles from './ArticleCard.css';

import { CommentCountIcon } from '../static/icons/comment-count';

interface ArticleCardProps<TData extends Article> {
  to: Extract<KeyOf<TypeActivities>, 'CommunityDetail' | 'ComplaintDetail' | 'LostFoundDetail'>;
  article: TData;
}

export const ArticleCard = <TData extends Article>({ to, article }: ArticleCardProps<TData>) => {
  const contentType = checkContentType(article.content);
  const isPlainContent = contentType !== 'json';

  return (
    <Link activityName={to} activityParams={{ articleId: article.id }}>
      <article css={styles.card}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <span css={styles.name}>{article.writer || 'LOST112'}</span>
            <time css={styles.date}>{formatDate(article.createdAt, false)}</time>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div css={styles.info}>
            <span css={styles.body}>{article.title}</span>
            {isPlainContent ? (
              <p>{article.content}</p>
            ) : (
              <ArticleContentParser
                content={article.content}
                overrideCss={articleCardContentParser}
              />
            )}
          </div>
          {/* 이미지가 존재하면 showing */}
          {article?.imageUrl && (
            <div css={styles.imageWrappingBox}>
              <LazyLoadImage
                width="100%"
                height="100%"
                effect="opacity"
                css={styles.image}
                src={article.imageUrl}
                alt={`${article.title} on ${article.createdAt}`}
              />
            </div>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div css={styles.subwayLineId(subwayLineHexColors(+article.subwayLineId))}>
            {subwayLineToKrMap[article.subwayLineId] || '기타 호선'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div css={styles.countLabel}>
              <CommentCountIcon /> <span>{article?.commentCnt}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

const articleCardContentParser = css`
  padding: 0;
  margin-top: 12px;

  & > div {
    border: none;
  }

  .editor-input {
    min-height: unset !important;
    max-height: 46px !important;

    p {
      margin-bottom: 4px !important;
    }
  }
`;
