import React from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import { Layout, Navbar } from 'widgets';
import { renderLeftLogo, renderRight } from 'widgets/layout-header';
import { ArticleListErrorFallback } from 'widgets/articles/ui/ArticleListErrorFallback';
import ComplaintArticleList from '../_common/ComplaintArticleList/ComplaintArticleList';
import * as styles from './Page.css';

const Complaint: ActivityComponentType = () => {
  return (
    <Layout
      appBar={{ renderLeft: renderLeftLogo, renderRight }}
      navigationSlot={Navbar}
    >
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

export default Complaint;
