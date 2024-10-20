import React from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import type { WithArticleId } from 'features/articles';
import { ArticleDetailErrorFallback } from 'features/articles/ui/ArticleDetailErrorFallback';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import * as styles from './Page.css';

const ComplaintArticleDetail = React.lazy(
  () => import('../_common/ComplaintArticleDetail/ComplaintArticleDetail'),
);

const ComplaintDetail: ActivityComponentType<WithArticleId> = ({
  params: { articleId },
}) => {
  return (
    <Layout>
      <QueryErrorBoundary
        errorFallback={({ error, reset }) =>
          ArticleDetailErrorFallback({
            css: styles.layout,
            error,
            reset,
          })
        }
      >
        <ComplaintArticleDetail articleId={articleId} />
      </QueryErrorBoundary>
    </Layout>
  );
};

export default ComplaintDetail;
