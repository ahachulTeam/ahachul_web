import React from 'react';
import { Box, Flex } from '@ahhachul/react-components-layout';

import type { Article } from 'features/articles';
import * as styles from './BaseArticleLIst.css';
import { ArticleCard } from './ArticleCard';

const FetchNextPage = React.lazy(() =>
  import('./FetchNextPage').then((module) => ({
    default: module.FetchNextPage,
  })),
);

interface BaseArticleListProps<TData extends Article> {
  data: TData[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: VoidFunction;
}

export const BaseArticleLIst = <TData extends Article>({
  data,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: BaseArticleListProps<TData>) => {
  return (
    <Box as="section">
      <Flex as="ul" direction="column" css={styles.ul}>
        {data.map((article) => (
          <ArticleCard<TData> key={article.id} data={article} to="Community" />
        ))}
      </Flex>
      {hasNextPage && (
        <FetchNextPage
          callback={() => !isFetchingNextPage && fetchNextPage()}
        />
      )}
    </Box>
  );
};
