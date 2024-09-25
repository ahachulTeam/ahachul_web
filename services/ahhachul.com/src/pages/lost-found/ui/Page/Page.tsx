import React, { useReducer } from 'react';
import { useActivity } from '@stackflow/react';
import type { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import { ComposeLayout } from 'widgets/layout/ui/ComposeLayout';
import { renderLeftLogo, renderRight } from 'widgets/layout-header';
import { ArticleListErrorFallback } from 'widgets/articles/ui/ArticleListErrorFallback';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import { LostFoundFilters } from '../_common/LostFoundFilters/LostFoundFilters';
import * as styles from './Page.css';

const LostFoundArticleList = React.lazy(
  () => import('../_common/LostFoundArticleList/LostFoundArticleList'),
);

const LostFound: ActivityComponentType = () => {
  const activity = useActivity();
  const [isScale, toggleScale] = useReducer((scale) => !scale, false);

  return (
    <ComposeLayout>
      <LostFoundFilters
        isScale={isScale}
        isActive={activity.isActive}
        handleScale={toggleScale}
      />
      <Layout showNavbar appBar={{ renderLeft: renderLeftLogo, renderRight }}>
        <QueryErrorBoundary
          errorFallback={({ error, reset }) =>
            ArticleListErrorFallback({
              css: styles.layout(isScale),
              error,
              reset,
            })
          }
        >
          <LostFoundArticleList css={styles.layout(isScale)} />
        </QueryErrorBoundary>
      </Layout>
    </ComposeLayout>
  );
};

export default LostFound;
