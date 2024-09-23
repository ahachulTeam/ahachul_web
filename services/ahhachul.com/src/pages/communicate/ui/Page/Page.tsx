import React, { useReducer } from 'react';
import { useActivity } from '@stackflow/react';
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
  const activity = useActivity();
  const [isScale, toggleScale] = useReducer((scale) => !scale, false);

  return (
    <div css={styles.wrap} data-vaul-drawer-wrapper="true">
      <FilterGroup
        isScale={isScale}
        isActive={activity.isActive}
        typeList={['인기', '자유', '정보', '질문']}
        toggleScale={toggleScale}
      />
      <Layout
        appBar={{
          overflow: 'visible',
          renderLeft: renderLeftLogo,
          renderRight,
        }}
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
          <CommunityArticleList css={styles.layout(isScale)} />
        </QueryErrorBoundary>
      </Layout>
    </div>
  );
};

export default Community;
