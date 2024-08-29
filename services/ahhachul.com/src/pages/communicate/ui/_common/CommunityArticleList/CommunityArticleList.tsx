import { withSuspense } from '@ahhachul/react-hooks-utility';
import { useGetCommunityList } from 'pages/communicate/api/get-list';
import type { CommunityArticle } from 'pages/communicate/model';
import { flattenInfinityList } from 'shared/lib/utils/array/flattenInfinityList';
import { BaseArticleLIst } from 'widgets/articles/ui/BaseArticleLIst';

const CommunityArticleList = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetCommunityList({
      page: 0,
      size: 10,
    });
  const communityArticles = flattenInfinityList(data);

  return (
    <BaseArticleLIst<CommunityArticle>
      data={communityArticles}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default withSuspense(CommunityArticleList, {
  fallback: (
    <div css={{ color: 'white' }}>Loading Community Article List...</div>
  ),
});
