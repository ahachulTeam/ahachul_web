import React, { Suspense } from 'react';

import { useActivityPreloadRef } from '@stackflow/plugin-preload';
import type { ActivityComponentType } from '@stackflow/react';
import { QueryClient } from '@tanstack/react-query';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import { Loading } from 'entities/app-loaders/ui/Loading';
import type { WithArticleId } from 'features/articles';
import { ArticleDetailErrorFallback } from 'features/articles/ui/ArticleDetailErrorFallback';
import { communityDetailQuery } from 'pages/communicate/api/get-detail';
import { Layout } from 'widgets';

const CommunityArticleDetail = React.lazy(() =>
  import('../_common/CommunityArticleDetail/CommunityArticleDetail').then(module => ({
    default: module.CommunityArticleDetail,
  })),
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

// eslint-disable-next-line react/prop-types
const CommunityDetailPage: ActivityComponentType<WithArticleId> = ({ params: { articleId } }) => {
  const preloadRef = useActivityPreloadRef<ReturnType<ReturnType<typeof loader>>>();

  return (
    <Layout>
      <QueryErrorBoundary errorFallback={ArticleDetailErrorFallback}>
        <Suspense fallback={<Loading opacity={1} />}>
          <CommunityArticleDetail articleId={articleId} preloadRef={preloadRef} />
        </Suspense>
      </QueryErrorBoundary>
    </Layout>
  );
};

export default CommunityDetailPage;
