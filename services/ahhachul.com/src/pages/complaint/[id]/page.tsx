import React, { Suspense } from 'react';

import type { ActivityComponentType } from '@stackflow/react';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import { Loading } from 'entities/app-loaders/ui/Loading';
import type { WithArticleId } from 'features/articles';
import { ArticleDetailErrorFallback } from 'features/articles/ui/ArticleDetailErrorFallback';
import { Layout } from 'widgets';

import * as styles from './Page.css';

const ComplaintArticleDetail = React.lazy(
  () => import('../_common/ComplaintArticleDetail/ComplaintArticleDetail'),
);

// eslint-disable-next-line react/prop-types
const ComplaintDetailPage: ActivityComponentType<WithArticleId> = ({ params: { articleId } }) => {
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
        <Suspense fallback={<Loading opacity={1} />}>
          <ComplaintArticleDetail articleId={articleId} />
        </Suspense>
      </QueryErrorBoundary>
    </Layout>
  );
};

export default ComplaintDetailPage;
