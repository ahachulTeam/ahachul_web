import React, { Suspense } from 'react';
import { QueryClient } from '@tanstack/react-query';
import type { ActivityComponentType } from '@stackflow/react';
import { useActivityPreloadRef } from '@stackflow/plugin-preload';

import { communityDetailQuery } from 'pages/communicate/api/get-detail';
import type { WithArticleId } from 'features/articles';
import { ArticleDetailErrorFallback } from 'features/articles/ui/ArticleDetailErrorFallback';
import { Loading } from 'entities/app-loaders/ui/Loading';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import { Layout } from 'widgets';

import * as styles from './Page.css';

const CommunityArticleDetail = React.lazy(() =>
  import('../_common/CommunityArticleDetail/CommunityArticleDetail').then(
    (module) => ({ default: module.CommunityArticleDetail }),
  ),
);

export const loader =
  (queryClient: QueryClient) =>
  async ({ activityParams }: { activityParams: Partial<WithArticleId> }) => {
    try {
      const query = communityDetailQuery(activityParams as WithArticleId);

      return await queryClient.ensureQueryData(query);
    } catch (error) {
      return null;
    }
  };

const CommunityDetail: ActivityComponentType<WithArticleId> = ({
  params: { articleId },
}) => {
  const preloadRef =
    useActivityPreloadRef<ReturnType<ReturnType<typeof loader>>>();

  return (
    <Layout>
      <QueryErrorBoundary
        errorFallback={({ error, reset }) =>
          ArticleDetailErrorFallback({
            css: styles.layout,
            error,
            reset,
          })
        }
      >
        <Suspense fallback={<Loading />}>
          <CommunityArticleDetail
            articleId={articleId}
            preloadRef={preloadRef}
          />
        </Suspense>
      </QueryErrorBoundary>
    </Layout>
  );
};

export default CommunityDetail;
