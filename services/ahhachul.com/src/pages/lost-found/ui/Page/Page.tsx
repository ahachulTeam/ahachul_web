import React from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { BaseErrorBoundary } from 'entities/app-errors/ui/ErrorBoundary';
import { Layout, Navbar } from 'widgets';
import { renderLeft, renderRight } from 'widgets/layout-header';
import { BottomDim } from 'shared/ui';

const LostFoundArticleList = React.lazy(
  () => import('../_common/LostFoundArticleList/LostFoundArticleList'),
);

const Lost: ActivityComponentType = () => {
  return (
    <Layout
      appBar={{ renderLeft, renderRight }}
      navigationSlot={<Navbar />}
      dimSlot={<BottomDim />}
    >
      <BaseErrorBoundary>
        <LostFoundArticleList />
      </BaseErrorBoundary>
    </Layout>
  );
};

export default Lost;
