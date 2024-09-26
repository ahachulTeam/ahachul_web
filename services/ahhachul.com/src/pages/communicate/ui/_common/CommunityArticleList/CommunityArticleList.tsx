import React, { type HTMLAttributes } from 'react';
import { withSuspense } from '@ahhachul/react-hooks-utility';
import { useGetCommunityList } from 'pages/communicate/api/get-list';
import type { CommunityArticle } from 'pages/communicate/model';
import { Loading } from 'entities/app-loaders/ui/Loading';
import { flattenInfinityList } from 'shared/lib/utils/array/flattenInfinityList';
import { BaseArticleList } from 'widgets/articles/ui/BaseArticleList';
import { useFilters } from 'widgets/filters/ui/FilterContext';

interface CommunityArticleListProps
  extends HTMLAttributes<HTMLSectionElement> {}
const CommunityArticleList = ({ ...props }: CommunityArticleListProps) => {
  const { keyword, filters } = useFilters();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetCommunityList({
      page: 0,
      size: 10,
      sort: 'createdAt,asc',
      content: keyword,
      ...filters,
    });
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
};

export default withSuspense(CommunityArticleList, {
  fallback: <Loading opacity={1} deferredMs={0} />,
});
