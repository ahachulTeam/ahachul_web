import React from 'react';
import { Box, Flex } from '@ahhachul/react-components-layout';

import { BaseArticle } from 'features/articles';
import * as styles from './BaseArticleLIst.css';

const FetchNextPage = React.lazy(() =>
  import('./FetchNextPage').then((module) => ({
    default: module.FetchNextPage,
  })),
);

interface BaseArticleLIstProps<TData> {
  data: TData[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: VoidFunction;
}

export const BaseArticleLIst = <TData extends BaseArticle>({
  data,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: BaseArticleLIstProps<TData>) => {
  return (
    <Box as="section">
      <Flex as="ul" direction="column" css={styles.ul}>
        {data.map((article) => (
          <li key={article.id}>{article.title}</li>
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
