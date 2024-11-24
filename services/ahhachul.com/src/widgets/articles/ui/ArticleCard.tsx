import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Flex } from '@ahhachul/react-components-layout';
import { Link, type TypeActivities } from 'app/stackflow';
import type { Article } from 'features/articles';
import { subwayLineToKrMap } from 'widgets/train-infos/lib/subway-line-to-kr';
import { subwayLineHexColors } from 'widgets/train-infos/lib/subway-line-hex-colors';
import { CommentCountIcon } from '../static/icons/comment-count';
import * as styles from './ArticleCard.css';

interface ArticleCardProps<TData extends Article> {
  to: Extract<
    KeyOf<TypeActivities>,
    'CommunityDetail' | 'ComplaintDetail' | 'LostFoundDetail'
  >;
  data: TData;
}

export const ArticleCard = <TData extends Article>({
  to,
  data,
}: ArticleCardProps<TData>) => {
  return (
    <Link activityName={to} activityParams={{ articleId: data.id }}>
      <Flex as="article" direction="column" gap="12px" css={styles.card}>
        <Flex direction="column">
          <div>
            <span css={styles.name}>{data.writer || 'LOST112'}</span>
            <time css={styles.date}>오후 3:00</time>
          </div>
        </Flex>
        <Flex justify="space-between">
          <div css={styles.info}>
            <span css={styles.body}>{data.title}</span>
            <p>{data.content}</p>
          </div>
          {/* 이미지가 존재하면 showing */}
          {data?.imageUrl && (
            <div css={styles.imageWrappingBox}>
              <LazyLoadImage
                width="100%"
                height="100%"
                effect="opacity"
                css={styles.image}
                src={data.imageUrl}
                alt={`${data.title} on ${data.createdAt}`}
              />
            </div>
          )}
        </Flex>
        <Flex align="center" justify="space-between">
          <div
            css={styles.subwayLineId(subwayLineHexColors(+data.subwayLineId))}
          >
            {subwayLineToKrMap[data.subwayLineId] || '기타 호선'}
          </div>
          <Flex align="center">
            <div css={styles.countLabel}>
              <CommentCountIcon /> <span>{data?.commentCnt}</span>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};
