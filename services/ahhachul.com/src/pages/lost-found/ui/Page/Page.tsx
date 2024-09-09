import React from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout, Navbar } from 'widgets';
import { renderLeftLogo, renderRight } from 'widgets/layout-header';
import { ArticleListErrorFallback } from 'widgets/articles/ui/ArticleListErrorFallback';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import LostFoundArticleList from '../_common/LostFoundArticleList/LostFoundArticleList';
import * as styles from './Page.css';

const LostFound: ActivityComponentType = () => {
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
        <LostFoundArticleList css={styles.layout} />
      </QueryErrorBoundary>
    </Layout>
  );
};

export default LostFound;
