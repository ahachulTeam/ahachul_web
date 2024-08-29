import React from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { BaseErrorBoundary } from 'entities/app-errors/ui/ErrorBoundary';
import { Layout, Navbar } from 'widgets';
import { renderLeft, renderRight } from 'widgets/layout-header';
import * as styles from './Page.css';

const CommunityArticleList = React.lazy(
  () => import('../_common/CommunityArticleList/CommunityArticleList'),
);

const Community: ActivityComponentType = () => {
  return (
    <Layout appBar={{ renderLeft, renderRight }} navigationSlot={Navbar}>
      <BaseErrorBoundary>
        <CommunityArticleList css={styles.articleListLayout} />
      </BaseErrorBoundary>
    </Layout>
  );
};

export default Community;
