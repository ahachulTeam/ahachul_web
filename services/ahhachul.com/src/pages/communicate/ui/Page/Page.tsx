import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useActivity } from '@stackflow/react';
import type { ActivityComponentType } from 'app/stackflow';
import { Layout, Navbar } from 'widgets';
import { ComposeLayout } from 'widgets/layout/ui/ComposeLayout';
import { renderLeftLogo, renderRight } from 'widgets/layout-header';
import { ArticleListErrorFallback } from 'widgets/articles/ui/ArticleListErrorFallback';
import { FilterGroup } from 'widgets/filters/ui/FilterGroup';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import { useScrollTracker } from 'shared/lib/hooks/useScrollTracker';
import * as styles from './Page.css';

const CommunityArticleList = React.lazy(
  () => import('../_common/CommunityArticleList/CommunityArticleList'),
);

const Community: ActivityComponentType = () => {
  const activity = useActivity();
  const [isScale, setIsScale] = useState(false);
  const toggleScale = useCallback(() => {
    setIsScale((prev) => !prev);
  }, []);

  const layoutRef = useRef<HTMLDivElement>(null);
  const { condition } = useScrollTracker(layoutRef);

  useEffect(() => {
    setIsScale(condition === 'downState');
  }, [condition]);

  return (
    <ComposeLayout>
      <FilterGroup
        isScale={isScale}
        isActive={activity.isActive}
        typeList={['인기', '자유', '정보', '질문']}
        toggleScale={toggleScale}
      />
      <Layout
        ref={layoutRef}
        condition={condition}
        navigationSlot={Navbar}
        appBar={{
          renderLeft: renderLeftLogo,
          renderRight,
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
