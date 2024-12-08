import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Flex } from '@ahhachul/react-components-layout';
import { css } from '@emotion/react';
import { Link, type TypeActivities } from 'app/stackflow';
import type { Article } from 'features/articles';
import { subwayLineToKrMap } from 'widgets/train-infos/lib/subway-line-to-kr';
import { subwayLineHexColors } from 'widgets/train-infos/lib/subway-line-hex-colors';
import { CommentCountIcon } from '../static/icons/comment-count';
import * as styles from './ArticleCard.css';
import { ArticleContentParser } from 'features/articles/ui/ArticleContentParser';
import { checkContentType } from 'features/articles/lib/check-content-type';

interface ArticleCardProps<TData extends Article> {
  to: Extract<
    KeyOf<TypeActivities>,
    'CommunityDetail' | 'ComplaintDetail' | 'LostFoundDetail'
  >;
  article: TData;
}

export const ArticleCard = <TData extends Article>({
  to,
  article,
}: ArticleCardProps<TData>) => {
  const contentType = checkContentType(article.content);
  const isPlainContent = contentType !== 'json';

  return (
    <Link activityName={to} activityParams={{ articleId: article.id }}>
      <Flex as="article" direction="column" gap="12px" css={styles.card}>
        <Flex direction="column">
          <div>
            <span css={styles.name}>{article.writer || 'LOST112'}</span>
            <time css={styles.date}>오후 3:00</time>
          </div>
        </Flex>
        <Flex justify="space-between">
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
        </Flex>
        <Flex align="center" justify="space-between">
          <div
            css={styles.subwayLineId(
              subwayLineHexColors(+article.subwayLineId),
            )}
          >
            {subwayLineToKrMap[article.subwayLineId] || '기타 호선'}
          </div>
          <Flex align="center">
            <div css={styles.countLabel}>
              <CommentCountIcon /> <span>{article?.commentCnt}</span>
            </div>
          </Flex>
        </Flex>
      </Flex>
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
