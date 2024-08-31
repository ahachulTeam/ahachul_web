import React from 'react';
import { AxiosResponse } from 'axios';
import { QueryClient } from '@tanstack/react-query';
import type { ActivityComponentType } from '@stackflow/react';
import { useActivityPreloadRef } from '@stackflow/plugin-preload';

import type { CommunityDetail as CommunityArticleDetail } from 'pages/communicate/model';
import { communityDetailQuery } from 'pages/communicate/api/get-detail';
import type { WithArticleId } from 'features/articles';
import type { IResponse } from 'entities/with-server';
import { BaseErrorBoundary } from 'entities/app-errors/ui/ErrorBoundary';
import { Layout } from 'widgets';

import CommunityDetailWrapper from '../_common/CommunityArticleDetail/CommunityDetailWrapper';

export const loader =
  (queryClient: QueryClient) =>
  async ({ activityParams }: { activityParams: Partial<WithArticleId> }) => {
    try {
      const query = communityDetailQuery(activityParams as WithArticleId);

      return (queryClient.getQueryData(query.queryKey) ??
        (await queryClient.fetchQuery(query))) as AxiosResponse<
        IResponse<CommunityArticleDetail>
      >;
    } catch (error) {
      return null;
    }
  };

const CommunityDetail: ActivityComponentType<WithArticleId> = ({
  params: { articleId },
}) => {
  const preloadRef = useActivityPreloadRef() as Promise<
    AxiosResponse<IResponse<CommunityArticleDetail>>
  > | null;

  return (
    <Layout>
      <BaseErrorBoundary>
        <CommunityDetailWrapper articleId={articleId} preloadRef={preloadRef} />
      </BaseErrorBoundary>
    </Layout>
  );
};

export default CommunityDetail;
