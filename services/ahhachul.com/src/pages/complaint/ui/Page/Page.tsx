import React from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import { Layout, Navbar } from 'widgets';
import { renderLeftLogo, renderRight } from 'widgets/layout-header';
import { ArticleListErrorFallback } from 'widgets/articles/ui/ArticleListErrorFallback';
import { FileComplaint } from '../_common/FileComplaint(민원을넣다)/FileComplaint';
import ComplaintArticleList from '../_common/ComplaintArticleList/ComplaintArticleList';
import * as styles from './Page.css';

interface ComplaintProps {
  tab?: 'FILE' | 'LIST';
}

const Complaint: ActivityComponentType<ComplaintProps> = ({ params }) => {
  const currentTab = params.tab ?? 'FILE';

  return (
    <Layout
      appBar={{ renderLeft: renderLeftLogo, renderRight }}
      navigationSlot={Navbar}
    >
      {currentTab === 'FILE' && <FileComplaint />}
      {currentTab === 'LIST' && (
        <QueryErrorBoundary
          keys={[currentTab]}
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
      )}
    </Layout>
  );
};

export default Complaint;
