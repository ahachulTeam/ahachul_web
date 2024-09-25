import React, { useReducer } from 'react';
import { useActivity } from '@stackflow/react';
import type { ActivityComponentType } from 'app/stackflow';
import { Layout } from 'widgets';
import { ComposeLayout } from 'widgets/layout/ui/ComposeLayout';
import { renderLeftLogo, renderRight } from 'widgets/layout-header';
import { ArticleListErrorFallback } from 'widgets/articles/ui/ArticleListErrorFallback';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import { CommunityFilters } from '../_common/CommunityFilters/CommunityFilters';
import * as styles from './Page.css';

const CommunityArticleList = React.lazy(
  () => import('../_common/CommunityArticleList/CommunityArticleList'),
);

const Community: ActivityComponentType = () => {
  const activity = useActivity();
  const [isScale, toggleScale] = useReducer((scale) => !scale, false);

  return (
    <ComposeLayout>
      <CommunityFilters
        isScale={isScale}
        isActive={activity.isActive}
        handleScale={toggleScale}
      />
      <Layout
        showNavbar
        appBar={{
          renderRight,
          renderLeft: renderLeftLogo,
        }}
      >
        <QueryErrorBoundary
          errorFallback={({ error, reset }) =>
            ArticleListErrorFallback({
              css: styles.layout(isScale),
              error,
              reset,
            })
          }
        >
          <CommunityArticleList css={styles.layout(isScale)} />
        </QueryErrorBoundary>
      </Layout>
    </ComposeLayout>
  );
};

export default Community;
