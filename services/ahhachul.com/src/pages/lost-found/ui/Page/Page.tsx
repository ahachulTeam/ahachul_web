import React from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { BaseErrorBoundary } from 'entities/app-errors/ui/ErrorBoundary';
import { Layout, Navbar } from 'widgets';
import { renderLeft, renderRight } from 'widgets/layout-header';
import * as styles from './Page.css';

const LostFoundArticleList = React.lazy(
  () => import('../_common/LostFoundArticleList/LostFoundArticleList'),
);

const Lost: ActivityComponentType = () => {
  return (
    <Layout appBar={{ renderLeft, renderRight }} navigationSlot={Navbar}>
      <BaseErrorBoundary>
        <LostFoundArticleList css={styles.articleListLayout} />
      </BaseErrorBoundary>
    </Layout>
  );
};

export default Lost;
