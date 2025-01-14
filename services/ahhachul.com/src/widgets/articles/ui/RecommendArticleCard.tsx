import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Link, type TypeActivities } from 'app/stackflow';
import type { RecommendArticle } from 'features/articles';

import { Flex } from '@ahhachul/react-components-layout';

import * as styles from './RecommendArticleCard.css';

interface Props {
  to: Extract<KeyOf<TypeActivities>, 'CommunityDetail' | 'ComplaintDetail' | 'LostFoundDetail'>;
  recommendArticle: RecommendArticle;
}

const RecommendArticleCard = ({ to, recommendArticle }: Props) => {
  return (
    <Link activityName={to} activityParams={{ articleId: recommendArticle.id }}>
      <Flex as="article" direction="column" gap="6px" css={styles.card}>
        <Flex direction="column">
          <div>
            <span css={styles.name}>
              {recommendArticle.writer === 'SYSTEM' ? 'LOST112' : recommendArticle.writer}
            </span>
            <time css={styles.date}>오후 3:00</time>
          </div>
        </Flex>
        <div css={styles.info}>
          <span css={styles.body}>{recommendArticle.title}</span>
        </div>
        {/* 이미지가 존재하면 showing */}
        {recommendArticle?.imageUrl && (
          <div css={styles.imageWrappingBox}>
            <LazyLoadImage
              width="100%"
              height="100%"
              effect="opacity"
              css={styles.image}
              src={recommendArticle.imageUrl}
              alt={`${recommendArticle.title} on ${recommendArticle.createdAt}`}
            />
          </div>
        )}
      </Flex>
    </Link>
  );
};

export default RecommendArticleCard;
