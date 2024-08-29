import React, { type HTMLAttributes } from 'react';
import { withSuspense } from '@ahhachul/react-hooks-utility';
import { useGetLostFoundList } from 'pages/lost-found/api/get-list';
import type { LostArticle } from 'pages/lost-found/model';
import { Loading } from 'entities/app-loaders/ui/Loading';
import { flattenInfinityList } from 'shared/lib/utils/array/flattenInfinityList';
import { BaseArticleList } from 'widgets/articles/ui/BaseArticleList';

interface LostFoundArticleListProps
  extends HTMLAttributes<HTMLSectionElement> {}
const LostFoundArticleList = ({ ...props }: LostFoundArticleListProps) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetLostFoundList({
      page: 0,
      size: 10,
    });
  const lostArticles = flattenInfinityList(data);

  return (
    <BaseArticleList<LostArticle>
      data={lostArticles}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      {...props}
    />
  );
};

export default withSuspense(LostFoundArticleList, {
  fallback: <Loading />,
});
