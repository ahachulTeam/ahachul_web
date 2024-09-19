import { withSuspense } from '@ahhachul/react-hooks-utility';
import type { WithArticleId } from 'features/articles';
import { Loading } from 'entities/app-loaders/ui/Loading';
import { useGetLostFoundDetail } from 'pages/lost-found/api/get-detail';
import { BaseErrorBoundary } from 'entities/app-errors/ui/ErrorBoundary';
import { BaseArticleTemplate } from 'features/articles/ui/BaseArticleTemplate';

const LostFoundArticleDetail = ({ articleId }: WithArticleId) => {
  const { data } = useGetLostFoundDetail({ articleId });

  return (
    <BaseErrorBoundary>
      <BaseArticleTemplate article={data} />
    </BaseErrorBoundary>
  );
};

export default withSuspense(LostFoundArticleDetail, {
  fallback: <Loading opacity={1} />,
});
