import React from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import type { WithArticleId } from 'features/articles';
import { ArticleDetailErrorFallback } from 'features/articles/ui/ArticleDetailErrorFallback';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';

const LostFoundArticleDetail = React.lazy(
  () => import('../_common/LostFoundArticleDetail/LostFoundArticleDetail'),
);

const LostFoundDetail: ActivityComponentType<WithArticleId> = ({
  params: { articleId },
}) => {
  return (
    <Layout>
      <QueryErrorBoundary errorFallback={ArticleDetailErrorFallback}>
        <LostFoundArticleDetail articleId={articleId} />
      </QueryErrorBoundary>
    </Layout>
  );
};

export default LostFoundDetail;
