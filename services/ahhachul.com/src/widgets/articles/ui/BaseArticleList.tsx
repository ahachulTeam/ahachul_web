import React, { type HTMLAttributes } from 'react';
import { Box, Flex } from '@ahhachul/react-components-layout';

import type { Article } from 'features/articles';
import { ArticleCard } from './ArticleCard';
import * as styles from './BaseArticleList.css';
import { TypeActivities } from 'app/stackflow';
import { useDisableScroll } from 'shared/lib/hooks/useDisableScroll';

const FetchNextPage = React.lazy(() =>
  import('./FetchNextPage').then((module) => ({
    default: module.FetchNextPage,
  })),
);

interface BaseArticleListProps<TData extends Article>
  extends HTMLAttributes<HTMLSectionElement> {
  to: Extract<
    KeyOf<TypeActivities>,
    'CommunityDetail' | 'ComplaintDetail' | 'LostFoundDetail'
  >;
  data: TData[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: VoidFunction;
}

const EmptyList = () => {
  useDisableScroll();

  return (
    <Box as="p" css={styles.empty}>
      검색결과가 없어요.
    </Box>
  );
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
    <Box as="section" {...props}>
      {isEmpty && <EmptyList />}
      {!isEmpty && (
        <>
          <Flex as="ul" direction="column" css={styles.ul}>
            {data.map((article, idx) => (
              <li key={`${article.id}-${idx}`}>
                <ArticleCard<TData> data={article} to={to} />
              </li>
            ))}
          </Flex>
          {hasNextPage && (
            <FetchNextPage
              callback={() => !isFetchingNextPage && fetchNextPage()}
            />
          )}
        </>
      )}
    </Box>
  );
};
