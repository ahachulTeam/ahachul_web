import { useReducer } from 'react';

import type { ActivityComponentType } from '@stackflow/react';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import { Loading } from 'entities/app-loaders';
import { useLostFoundFilterStore } from 'pages/lost-found/lib/useLostFoundFilterStore';
import { Layout } from 'widgets';
import { ArticleListErrorFallback } from 'widgets/articles/ui/ArticleListErrorFallback';
import { renderLeftLogo, renderRight } from 'widgets/layout-header';
import { ComposeLayout } from 'widgets/layout/ui/ComposeLayout';

import * as styles from './Page.css';

import { LostFoundArticleList } from '../_common/LostFoundArticleList/LostFoundArticleList';
import { LostFoundFilters } from '../_common/LostFoundFilters/LostFoundFilters';

interface LostFoundProps {
  keyword?: string;
}
// eslint-disable-next-line react/prop-types
const LostFound: ActivityComponentType<LostFoundProps> = ({ params }) => {
  const [isScale, toggleScale] = useReducer(scale => !scale, false);
  // eslint-disable-next-line react/prop-types
  const keyword = params?.keyword || '';

  const { filterProps, boundaryKeys } = useLostFoundFilterStore(keyword);

  if (!filterProps.loaded) {
    return <Loading opacity={0.1} />;
  }

  return (
    <ComposeLayout data-vaul-drawer-wrapper="true">
      <LostFoundFilters isScale={isScale} filterProps={filterProps} handleScale={toggleScale} />
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
