import { withSuspense } from '@ahhachul/react-hooks-utility';
import type { WithArticleId } from 'features/articles';
import { Loading } from 'entities/app-loaders/ui/Loading';
import { useGetComplaintDetail } from 'pages/complaint/api/get-detail';
import { BaseErrorBoundary } from 'entities/app-errors/ui/ErrorBoundary';
import { BaseArticleTemplate } from 'features/articles/ui/BaseArticleTemplate';

const ComplaintArticleDetail = ({ articleId }: WithArticleId) => {
  const { data } = useGetComplaintDetail({ articleId });

  return (
    <BaseErrorBoundary>
      <BaseArticleTemplate article={data} />
    </BaseErrorBoundary>
  );
};

export default withSuspense(ComplaintArticleDetail, {
  fallback: <Loading opacity={1} />,
});
