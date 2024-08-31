import React, { type HTMLAttributes } from 'react';
import { withSuspense } from '@ahhachul/react-hooks-utility';
import { useGetComplaintList } from 'pages/complaint/api/get-list';
import type { ComplaintArticle } from 'pages/complaint/model';
import { Loading } from 'entities/app-loaders/ui/Loading';
import { flattenInfinityList } from 'shared/lib/utils/array/flattenInfinityList';
import { BaseArticleList } from 'widgets/articles/ui/BaseArticleList';

interface ComplaintArticleListProps
  extends HTMLAttributes<HTMLSectionElement> {}
const ComplaintArticleList = ({ ...props }: ComplaintArticleListProps) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetComplaintList({
      page: 0,
      size: 10,
    });
  const complaintArticles = flattenInfinityList(data);

  return (
    <BaseArticleList<ComplaintArticle>
      to="ComplaintDetail"
      data={complaintArticles}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      {...props}
    />
  );
};

export default withSuspense(ComplaintArticleList, {
  fallback: <Loading />,
});
