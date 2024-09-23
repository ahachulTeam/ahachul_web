import React, { useReducer } from 'react';
import { useActivity } from '@stackflow/react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout, Navbar } from 'widgets';
import { renderLeftLogo, renderRight } from 'widgets/layout-header';
import { ArticleListErrorFallback } from 'widgets/articles/ui/ArticleListErrorFallback';
import { FilterGroup } from 'widgets/filters/ui/FilterGroup';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import * as styles from './Page.css';

const LostFoundArticleList = React.lazy(
  () => import('../_common/LostFoundArticleList/LostFoundArticleList'),
);

const LostFound: ActivityComponentType = () => {
  const activity = useActivity();
  const [isScale, toggleScale] = useReducer((scale) => !scale, false);

  return (
    <div css={styles.wrap} data-vaul-drawer-wrapper="true">
      <FilterGroup
        isScale={isScale}
        isActive={activity.isActive}
        typeList={['유실물', '분실물']}
        toggleScale={toggleScale}
      />
      <Layout
        appBar={{ renderLeft: renderLeftLogo, renderRight }}
        navigationSlot={Navbar}
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
          <LostFoundArticleList css={styles.layout(isScale)} />
        </QueryErrorBoundary>
      </Layout>
    </div>
  );
};

export default LostFound;
