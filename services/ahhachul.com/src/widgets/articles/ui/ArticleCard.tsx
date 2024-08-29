import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Flex } from '@ahhachul/react-components-layout';
import { Link, type TypeActivities } from 'app/stackflow';
import type { Article } from 'features/articles';
import { subwayLineToKrMap } from 'widgets/train-infos/lib/subway-line-to-kr';
import { subwayLineHexColors } from 'widgets/train-infos/lib/subway-line-hex-colors';
import { LikeIcon } from '../static/icons/like';
import { CommentCountIcon } from '../static/icons/comment-count';
import * as styles from './ArticleCard.css';

interface ArticleCardProps<TData extends Article> {
  to: KeyOf<TypeActivities>;
  data: TData;
}

export const ArticleCard = <TData extends Article>({
  to,
  data,
}: ArticleCardProps<TData>) => {
  return (
    <Link activityName={to} activityParams={{}}>
      <Flex as="article" direction="column" gap="12px" css={styles.card}>
        <Flex direction="column">
          <div css={{ marginBottom: '12px' }}>
            <span css={styles.name}>{data.writer}</span>
            <time css={styles.date}>오후 3:00</time>
          </div>
          <div
            css={styles.subwayLineId(subwayLineHexColors(data.subwayLineId))}
          >
            {subwayLineToKrMap[data.subwayLineId]}
          </div>
        </Flex>
        <Flex justify="space-between">
          <p css={styles.body}>{data.title}</p>
          {/* 이미지가 존재하면 showing */}
          {data?.image && (
            <div css={styles.imageWrappingBox}>
              <LazyLoadImage
                width="100%"
                height="100%"
                effect="opacity"
                css={styles.image}
                src={data.image.imageUrl}
                alt={`${data.title} on ${data.createdAt}`}
              />
            </div>
          )}
        </Flex>
        {/* 카운트 정보가 존재하면 showing */}
        {data?.likeCnt && data?.commentCnt && (
          <Flex align="center">
            <div css={styles.countLabel}>
              <LikeIcon /> <span>{data.likeCnt}</span>
            </div>
            <div css={styles.countLabel}>
              <CommentCountIcon /> <span>{data.commentCnt}</span>
            </div>
          </Flex>
        )}
      </Flex>
    </Link>
  );
};
