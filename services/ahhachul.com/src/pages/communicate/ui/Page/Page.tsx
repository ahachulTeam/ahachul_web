import React from 'react';
import type { ActivityComponentType } from 'app/stackflow';
import { Layout, Navbar } from 'widgets';
import { renderLeftLogo, renderRight } from 'widgets/layout-header';
import { ArticleListErrorFallback } from 'widgets/articles/ui/ArticleListErrorFallback';
import { FilterGroup } from 'widgets/filters/ui/FilterGroup';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import * as styles from './Page.css';

const CommunityArticleList = React.lazy(
  () => import('../_common/CommunityArticleList/CommunityArticleList'),
);

const Community: ActivityComponentType = () => {
  return (
    <Layout
      appBar={{ renderLeft: renderLeftLogo, renderRight }}
      navigationSlot={Navbar}
    >
      <FilterGroup />
      <QueryErrorBoundary
        errorFallback={({ error, reset }) =>
          ArticleListErrorFallback({
            css: styles.layout,
            error,
            reset,
          })
        }
      >
        <CommunityArticleList css={styles.layout} />
      </QueryErrorBoundary>
    </Layout>
  );
};

export default Community;
