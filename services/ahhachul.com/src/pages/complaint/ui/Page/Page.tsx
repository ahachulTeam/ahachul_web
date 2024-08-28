import React from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { BaseErrorBoundary } from 'entities/app-errors/ui/ErrorBoundary';
import { Layout, Navbar } from 'widgets';
import { renderLeft, renderRight } from 'widgets/layout-header';

const ComplaintArticleList = React.lazy(
  () => import('../_common/ComplaintArticleList/ComplaintArticleList'),
);

const Complaint: ActivityComponentType = () => {
  return (
    <Layout appBar={{ renderLeft, renderRight }} navigationSlot={<Navbar />}>
      <BaseErrorBoundary>
        <ComplaintArticleList />
      </BaseErrorBoundary>
    </Layout>
  );
};

export default Complaint;
