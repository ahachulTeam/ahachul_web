import React, { useReducer } from 'react';
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

interface LostFoundProps {
  keyword?: string;
}
const LostFound: ActivityComponentType<LostFoundProps> = ({ params }) => {
  const [isScale, toggleScale] = useReducer((scale) => !scale, false);

  return (
    <ComposeLayout data-vaul-drawer-wrapper="true">
      <LostFoundFilters isScale={isScale} handleScale={toggleScale} />
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
          <LostFoundArticleList
            keyword={params.keyword}
            css={styles.layout(isScale)}
          />
        </QueryErrorBoundary>
      </Layout>
    </ComposeLayout>
  );
};

export default LostFound;
