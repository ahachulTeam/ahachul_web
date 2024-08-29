import React, { type HTMLAttributes } from 'react';
import { Box, Flex } from '@ahhachul/react-components-layout';

import type { Article } from 'features/articles';
import { ArticleCard } from './ArticleCard';
import * as styles from './BaseArticleList.css';

const FetchNextPage = React.lazy(() =>
  import('./FetchNextPage').then((module) => ({
    default: module.FetchNextPage,
  })),
);

interface BaseArticleListProps<TData extends Article>
  extends HTMLAttributes<HTMLSectionElement> {
  data: TData[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: VoidFunction;
}

export const BaseArticleList = <TData extends Article>({
  data,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  ...props
}: BaseArticleListProps<TData>) => {
  return (
    <Box as="section" {...props}>
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
