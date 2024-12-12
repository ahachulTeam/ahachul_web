import React, { useReducer } from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import { ComposeLayout } from 'widgets/layout/ui/ComposeLayout';
import { renderLeftLogo, renderRight } from 'widgets/layout-header';
import { ArticleListErrorFallback } from 'widgets/articles/ui/ArticleListErrorFallback';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import { Loading } from 'entities/app-loaders';
import { useLostFoundFilterStore } from 'pages/lost-found/lib/useLostFoundFilterStore';

import { LostFoundFilters } from '../_common/LostFoundFilters/LostFoundFilters';
import { LostFoundArticleList } from '../_common/LostFoundArticleList/LostFoundArticleList';

import * as styles from './Page.css';

interface LostFoundProps {
  keyword?: string;
}
const LostFound: ActivityComponentType<LostFoundProps> = ({ params }) => {
  const [isScale, toggleScale] = useReducer((scale) => !scale, false);
  const keyword = params?.keyword || '';

  const { filterProps, boundaryKeys } = useLostFoundFilterStore(keyword);

  if (!filterProps.loaded) {
    return <Loading opacity={0.1} />;
  }

  return (
    <ComposeLayout data-vaul-drawer-wrapper="true">
      <LostFoundFilters
        isScale={isScale}
        filterProps={filterProps}
        handleScale={toggleScale}
      />
      <Layout showNavbar appBar={{ renderLeft: renderLeftLogo, renderRight }}>
        <QueryErrorBoundary
          keys={boundaryKeys}
          errorFallback={({ error, reset }) =>
            ArticleListErrorFallback({
              css: styles.layout(isScale),
              error,
              reset,
            })
          }
        >
          <LostFoundArticleList
            keyword={keyword}
            filterProps={filterProps}
            css={styles.layout(isScale)}
          />
        </QueryErrorBoundary>
      </Layout>
    </ComposeLayout>
  );
};

export default LostFound;
