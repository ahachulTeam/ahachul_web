import React, { type HTMLAttributes } from 'react';
import { withSuspense } from '@ahhachul/react-hooks-utility';
import { useGetLostFoundList } from 'pages/lost-found/api/get-list';
import type { LostFoundArticle } from 'pages/lost-found/model';
import { Loading } from 'entities/app-loaders/ui/Loading';
import { flattenInfinityList } from 'shared/lib/utils/array/flattenInfinityList';
import { BaseArticleList } from 'widgets/articles/ui/BaseArticleList';
import { useFilters } from 'widgets/filters/ui/FilterContext';

interface LostFoundArticleListProps
  extends HTMLAttributes<HTMLSectionElement> {}
const LostFoundArticleList = ({ ...props }: LostFoundArticleListProps) => {
  const { keyword, filters } = useFilters();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetLostFoundList({
      page: 0,
      size: 10,
      lostType: 'ACQUIRE',
      keyword,
      ...filters,
    });
  const lostArticles = flattenInfinityList(data);

  return (
    <BaseArticleList<LostFoundArticle>
      to="LostFoundDetail"
      data={lostArticles}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      {...props}
    />
  );
};

export default withSuspense(LostFoundArticleList, {
  fallback: <Loading opacity={1} deferredMs={0} />,
});
