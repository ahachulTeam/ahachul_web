import { withSuspense } from '@ahhachul/react-hooks-utility';
import { useGetLostFoundList } from 'pages/lost-found/api/get-list';
import type { LostArticle } from 'pages/lost-found/model';
import { flattenInfinityList } from 'shared/lib/utils/array/flattenInfinityList';
import { BaseArticleLIst } from 'widgets/articles/ui/BaseArticleLIst';

const LostFoundArticleList = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetLostFoundList({
      page: 0,
      size: 10,
    });
  const lostArticles = flattenInfinityList(data);

  return (
    <BaseArticleLIst<LostArticle>
      data={lostArticles}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default withSuspense(LostFoundArticleList, {
  fallback: (
    <div css={{ color: 'white' }}>Loading LostFound Article List...</div>
  ),
});
