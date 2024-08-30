import React, { type HTMLAttributes } from 'react';
import { withSuspense } from '@ahhachul/react-hooks-utility';
import { useGetCommunityList } from 'pages/communicate/api/get-list';
import type { CommunityArticle } from 'pages/communicate/model';
import { Loading } from 'entities/app-loaders/ui/Loading';
import { flattenInfinityList } from 'shared/lib/utils/array/flattenInfinityList';
import { BaseArticleList } from 'widgets/articles/ui/BaseArticleList';

interface CommunityArticleListProps
  extends HTMLAttributes<HTMLSectionElement> {}
const CommunityArticleList = ({ ...props }: CommunityArticleListProps) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetCommunityList({
      page: 0,
      size: 10,
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
  fallback: <Loading />,
});
