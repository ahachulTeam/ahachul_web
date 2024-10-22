import React, { type HTMLAttributes } from 'react';
import { useGetCommunityList } from 'pages/communicate/api/get-list';
import type { CommunityArticle } from 'pages/communicate/model';
import { Loading } from 'entities/app-loaders/ui/Loading';
import { flattenInfinityList } from 'shared/lib/utils/array/flattenInfinityList';
import { BaseArticleList } from 'widgets/articles/ui/BaseArticleList';
import { useCommunityFilterStore } from 'pages/communicate/slice';

interface CommunityArticleListProps extends HTMLAttributes<HTMLSectionElement> {
  keyword?: string;
}
export default function CommunityArticleList({
  keyword,
  ...props
}: CommunityArticleListProps) {
  const { filters } = useCommunityFilterStore();
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetCommunityList({
      page: 0,
      size: 10,
      content: keyword,
      ...filters,
    });

  if (!data || isLoading) return <Loading opacity={1} deferredMs={0} />;

  const communityArticles = flattenInfinityList(data);
  return (
    <BaseArticleList<CommunityArticle>
      to="CommunityDetail"
      data={communityArticles}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      {...props}
    />
  );
}
