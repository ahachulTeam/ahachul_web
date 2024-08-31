import React from 'react';
import { AxiosResponse } from 'axios';

import type { CommunityDetail } from 'pages/communicate/model';
import { useGetCommunityDetail } from 'pages/communicate/api/get-detail';
import type { WithArticleId } from 'features/articles';
import { BaseArticleTemplate } from 'features/articles/ui/BaseArticleTemplate';
import type { IResponse } from 'entities/with-server';
import { BaseErrorBoundary } from 'entities/app-errors/ui/ErrorBoundary';

import ArticleCommentList from '../ArticleCommentList/ArticleCommentList';

interface CommunityArticleDetailProps extends WithArticleId {
  initialData?: AxiosResponse<IResponse<CommunityDetail>>;
}

export const CommunityArticleDetail = ({
  articleId,
  initialData,
}: CommunityArticleDetailProps) => {
  const {
    data: {
      data: { result },
    },
  } = useGetCommunityDetail({ articleId }, initialData);

  return (
    <BaseErrorBoundary>
      <BaseArticleTemplate article={result} />
      <BaseErrorBoundary>
        <ArticleCommentList articleId={articleId} />
      </BaseErrorBoundary>
    </BaseErrorBoundary>
  );
};
