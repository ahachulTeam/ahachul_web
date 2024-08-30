import { withSuspense } from '@ahhachul/react-hooks-utility';
import type { WithArticleId } from 'features/articles';
import { Loading } from 'entities/app-loaders/ui/Loading';
import { useGetCommunityDetail } from 'pages/communicate/api/get-detail';
import { BaseErrorBoundary } from 'entities/app-errors/ui/ErrorBoundary';
import { BaseArticleTemplate } from 'features/articles/ui/BaseArticleTemplate';

import ArticleCommentList from '../ArticleCommentList/ArticleCommentList';

const CommunityArticleDetail = ({ articleId }: WithArticleId) => {
  const { data } = useGetCommunityDetail({ articleId });

  return (
    <BaseErrorBoundary>
      <BaseArticleTemplate article={data} />
      <BaseErrorBoundary>
        <ArticleCommentList articleId={articleId} />
      </BaseErrorBoundary>
    </BaseErrorBoundary>
  );
};

export default withSuspense(CommunityArticleDetail, {
  fallback: <Loading />,
});
