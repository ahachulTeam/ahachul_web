import React, { useReducer } from 'react';
import { ActivityComponentType } from 'app/stackflow';
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

interface CommunityProps {
  keyword?: string;
}
const Community: ActivityComponentType<CommunityProps> = ({ params }) => {
  const [isScale, toggleScale] = useReducer((scale) => !scale, false);

  return (
    <ComposeLayout data-vaul-drawer-wrapper="true">
      <CommunityFilters isScale={isScale} handleScale={toggleScale} />
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
          <CommunityArticleList
            keyword={params.keyword}
            css={styles.layout(isScale)}
          />
        </QueryErrorBoundary>
      </Layout>
    </ComposeLayout>
  );
};

export default Community;
