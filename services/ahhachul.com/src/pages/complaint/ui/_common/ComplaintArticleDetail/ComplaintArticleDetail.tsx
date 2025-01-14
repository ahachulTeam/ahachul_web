import type { WithArticleId } from 'features/articles';
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

export default ComplaintArticleDetail;
