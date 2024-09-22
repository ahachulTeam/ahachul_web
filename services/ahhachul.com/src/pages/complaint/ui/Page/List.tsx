import React from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import { Layout } from 'widgets';
import { ArticleListErrorFallback } from 'widgets/articles/ui/ArticleListErrorFallback';
import * as styles from './List.css';

const ComplaintArticleList = React.lazy(
  () => import('../_common/ComplaintArticleList/ComplaintArticleList'),
);

const ComplaintList: ActivityComponentType = () => {
  return (
    <Layout>
      <QueryErrorBoundary
        errorFallback={({ error, reset }) =>
          ArticleListErrorFallback({
            css: styles.layout,
            error,
            reset,
          })
        }
      >
        <ComplaintArticleList css={styles.layout} />
      </QueryErrorBoundary>
    </Layout>
  );
};

export default ComplaintList;
