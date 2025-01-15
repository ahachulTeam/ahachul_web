import { type HTMLAttributes } from 'react';

import { TypeActivities } from 'app/stackflow';
import type { Article } from 'features/articles';
import { useDisableScroll } from 'shared/lib/hooks/useDisableScroll';

import { ArticleCard } from './ArticleCard';
import * as styles from './BaseArticleList.css';
import { FetchNextPage } from './FetchNextPage';

interface BaseArticleListProps<TData extends Article> extends HTMLAttributes<HTMLSectionElement> {
  to: Extract<KeyOf<TypeActivities>, 'CommunityDetail' | 'ComplaintDetail' | 'LostFoundDetail'>;
  data: TData[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: VoidFunction;
}

const EmptyList = () => {
  useDisableScroll();

  return <p css={styles.empty}>검색결과가 없어요.</p>;
};

export const BaseArticleList = <TData extends Article>({
  to,
  data,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  ...props
}: BaseArticleListProps<TData>) => {
  const isEmpty = data.length === 0;

  return (
    <section {...props}>
      {isEmpty && <EmptyList />}
      {!isEmpty && (
        <>
          <ul css={styles.ul}>
            {data.map((article, idx) => (
              <li key={`${article.id}-${idx}`}>
                <ArticleCard<TData> article={article} to={to} />
              </li>
            ))}
          </ul>
          {hasNextPage && <FetchNextPage callback={() => !isFetchingNextPage && fetchNextPage()} />}
        </>
      )}
    </section>
  );
};
