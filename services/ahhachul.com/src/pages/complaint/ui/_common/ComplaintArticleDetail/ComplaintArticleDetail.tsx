import { BaseErrorBoundary } from 'entities/app-errors/ui/ErrorBoundary';
import type { WithArticleId } from 'features/articles';
import { BaseArticleTemplate } from 'features/articles/ui/BaseArticleTemplate';
import { useGetComplaintDetail } from 'pages/complaint/api/get-detail';

const ComplaintArticleDetail = ({ articleId }: WithArticleId) => {
  const { data } = useGetComplaintDetail({ articleId });

  return (
    <BaseErrorBoundary>
      <BaseArticleTemplate article={data} />
    </BaseErrorBoundary>
  );
};

export default ComplaintArticleDetail;
