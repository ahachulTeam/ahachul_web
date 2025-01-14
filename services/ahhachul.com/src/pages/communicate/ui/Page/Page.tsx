import React, { useReducer } from 'react';

import { ActivityComponentType } from 'app/stackflow';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import { Layout } from 'widgets';
import { ArticleListErrorFallback } from 'widgets/articles/ui/ArticleListErrorFallback';
import { renderLeftLogo, renderRight } from 'widgets/layout-header';
import { ComposeLayout } from 'widgets/layout/ui/ComposeLayout';

import * as styles from './Page.css';

import { CommunityFilters } from '../_common/CommunityFilters/CommunityFilters';

const CommunityArticleList = React.lazy(
  () => import('../_common/CommunityArticleList/CommunityArticleList'),
);

interface CommunityProps {
  keyword?: string;
}
// eslint-disable-next-line react/prop-types
const Community: ActivityComponentType<CommunityProps> = ({ params }) => {
  const [isScale, toggleScale] = useReducer(scale => !scale, false);

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
          {/* eslint-disable-next-line react/prop-types */}
          <CommunityArticleList keyword={params.keyword} css={styles.layout(isScale)} />
        </QueryErrorBoundary>
      </Layout>
    </ComposeLayout>
  );
};

export default Community;
