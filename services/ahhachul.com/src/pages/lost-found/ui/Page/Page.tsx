import React, { useReducer } from 'react';
import { useActivity } from '@stackflow/react';
import type { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import { renderLeftLogo, renderRight } from 'widgets/layout-header';
import { FilterProvider } from 'widgets/filters/ui/FilterContext';
import { ArticleListErrorFallback } from 'widgets/articles/ui/ArticleListErrorFallback';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import { LostFoundFilters } from '../_common/LostFoundFilters/LostFoundFilters';
import * as styles from './Page.css';
import { LOST_FOUND_FILTER_DEFAULT_VALUES } from 'pages/lost-found/data';

const LostFoundArticleList = React.lazy(
  () => import('../_common/LostFoundArticleList/LostFoundArticleList'),
);

const LostFound: ActivityComponentType = () => {
  const activity = useActivity();
  const [isScale, toggleScale] = useReducer((scale) => !scale, false);

  return (
<<<<<<< HEAD
    <FilterProvider
      id="lostFound"
      defaultValues={LOST_FOUND_FILTER_DEFAULT_VALUES}
    >
=======
    <ComposeLayout>
>>>>>>> main
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
    </FilterProvider>
  );
};

export default LostFound;
