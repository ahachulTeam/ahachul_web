import React from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { BaseErrorBoundary } from 'entities/app-errors/ui/ErrorBoundary';
import { Layout, Navbar } from 'widgets';
import { renderLeftLogo, renderRight } from 'widgets/layout-header';
import ComplaintArticleList from '../_common/ComplaintArticleList/ComplaintArticleList';
import * as styles from './Page.css';

const Complaint: ActivityComponentType = () => {
  return (
    <Layout
      appBar={{ renderLeft: renderLeftLogo, renderRight }}
      navigationSlot={Navbar}
    >
      <BaseErrorBoundary>
        <ComplaintArticleList css={styles.articleListLayout} />
      </BaseErrorBoundary>
    </Layout>
  );
};

export default Complaint;
