import React, { type HTMLAttributes } from 'react';
import { Box, Flex } from '@ahhachul/react-components-layout';

import type { Article } from 'features/articles';
import { ArticleCard } from './ArticleCard';
import * as styles from './BaseArticleList.css';
import { TypeActivities } from 'app/stackflow';

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
      {isEmpty && <p css={styles.empty}>검색결과가 없어요.</p>}
      {!isEmpty && (
        <>
          <Flex as="ul" direction="column" css={styles.ul}>
            {data.map((article) => (
              <ArticleCard<TData> key={article.id} data={article} to={to} />
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
