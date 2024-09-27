import React, { type HTMLAttributes } from 'react';
import { useGetLostFoundList } from 'pages/lost-found/api/get-list';
import type { LostFoundArticle } from 'pages/lost-found/model';
import { Loading } from 'entities/app-loaders/ui/Loading';
import { flattenInfinityList } from 'shared/lib/utils/array/flattenInfinityList';
import { BaseArticleList } from 'widgets/articles/ui/BaseArticleList';
import { useLostFoundFilterStore } from 'pages/lost-found/slice';

interface LostFoundArticleListProps extends HTMLAttributes<HTMLSectionElement> {
  keyword?: string;
}
export default function LostFoundArticleList({
  keyword,
  ...props
}: LostFoundArticleListProps) {
  const { filters } = useLostFoundFilterStore();
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetLostFoundList({
      page: 0,
      size: 10,
      keyword,
      ...filters,
    });

  if (!data || isLoading) return <Loading opacity={1} deferredMs={0} />;

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
}
