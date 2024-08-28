import { withSuspense } from '@ahhachul/react-hooks-utility';
import { useGetComplaintList } from 'pages/complaint/api/get-list';
import type { ComplaintArticle } from 'pages/complaint/model';
import { flattenInfinityList } from 'shared/lib/utils/array/flattenInfinityList';
import { BaseArticleLIst } from 'widgets/articles/ui/BaseArticleLIst';

const ComplaintArticleList = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetComplaintList({
      page: 0,
      size: 10,
    });
  const complaintArticles = flattenInfinityList(data);

  return (
    <BaseArticleLIst<ComplaintArticle>
      data={complaintArticles}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default withSuspense(ComplaintArticleList, {
  fallback: (
    <div css={{ color: 'white' }}>Loading Complaint Article List...</div>
  ),
});
