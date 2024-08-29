import React from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { BaseErrorBoundary } from 'entities/app-errors/ui/ErrorBoundary';
import { Layout, Navbar } from 'widgets';
import { renderLeft, renderRight } from 'widgets/layout-header';
import { BottomDim } from 'shared/ui';

const CommunityArticleList = React.lazy(
  () => import('../_common/CommunityArticleList/CommunityArticleList'),
);

const Community: ActivityComponentType = () => {
  return (
    <Layout
      appBar={{ renderLeft, renderRight }}
      navigationSlot={<Navbar />}
      dimSlot={<BottomDim />}
    >
      <BaseErrorBoundary>
        <CommunityArticleList />
      </BaseErrorBoundary>
    </Layout>
  );
};

export default Community;
