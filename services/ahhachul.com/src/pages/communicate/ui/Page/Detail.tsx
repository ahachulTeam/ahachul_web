import React, { Suspense } from 'react';
import { AxiosResponse } from 'axios';
import { QueryClient } from '@tanstack/react-query';
import type { ActivityComponentType } from '@stackflow/react';
import { useActivityPreloadRef } from '@stackflow/plugin-preload';

import type { CommunityDetail as CommunityArticleType } from 'pages/communicate/model';
import { communityDetailQuery } from 'pages/communicate/api/get-detail';
import type { WithArticleId } from 'features/articles';
import type { IResponse } from 'entities/with-server';
import { Loading } from 'entities/app-loaders/ui/Loading';
import { BaseErrorBoundary } from 'entities/app-errors/ui/ErrorBoundary';
import { Layout } from 'widgets';

import { CommunityArticleDetail } from '../_common/CommunityArticleDetail/CommunityArticleDetail';

export const loader =
  (queryClient: QueryClient) =>
  async ({ activityParams }: { activityParams: Partial<WithArticleId> }) => {
    try {
      const query = communityDetailQuery(activityParams as WithArticleId);

      return (queryClient.getQueryData(query.queryKey) ??
        (await queryClient.fetchQuery(query))) as AxiosResponse<
        IResponse<CommunityArticleType>
      >;
    } catch (error) {
      return null;
    }
  };

const CommunityDetail: ActivityComponentType<WithArticleId> = ({
  params: { articleId },
}) => {
  const preloadRef = useActivityPreloadRef<Promise<
    AxiosResponse<IResponse<CommunityArticleType>>
  > | null>();

  return (
    <Layout>
      <BaseErrorBoundary>
        <Suspense fallback={<Loading />}>
          <CommunityArticleDetail
            articleId={articleId}
            preloadRef={preloadRef}
          />
        </Suspense>
      </BaseErrorBoundary>
    </Layout>
  );
};

export default CommunityDetail;
