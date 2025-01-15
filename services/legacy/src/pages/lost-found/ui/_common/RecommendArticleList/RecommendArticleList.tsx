import type { RecommendArticle } from 'features/articles';
import RecommendArticleCard from 'widgets/articles/ui/RecommendArticleCard';

import * as styles from './RecommendArticleList.css';

interface Props {
  recommendPosts: RecommendArticle[];
}

const RecommendArticleList = ({ recommendPosts }: Props) => {
  return recommendPosts.length > 0 ? (
    <section css={styles.section}>
      <div css={styles.decs}>
        <p>추천 습득물</p>
      </div>
      <ul>
        {recommendPosts.map(item => (
          <li key={item.id}>
            <RecommendArticleCard to="LostFoundDetail" recommendArticle={item} />
          </li>
        ))}
      </ul>
    </section>
  ) : null;
};

export default RecommendArticleList;
