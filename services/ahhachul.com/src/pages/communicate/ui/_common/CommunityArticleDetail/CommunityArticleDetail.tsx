import { Suspense } from 'react';

import { AxiosResponse } from 'axios';
import { BaseErrorBoundary } from 'entities/app-errors/ui/ErrorBoundary';
import type { IResponse } from 'entities/with-server';
import type { WithArticleId } from 'features/articles';
import { BaseArticleTemplate } from 'features/articles/ui/BaseArticleTemplate';
import { useGetCommunityDetail } from 'pages/communicate/api/get-detail';
import type { CommunityDetail } from 'pages/communicate/model';
import { suspend as readData } from 'suspend-react';

import { ArticleCommentList } from '../ArticleCommentList/ArticleCommentList';

interface CommunityArticleDetailProps extends WithArticleId {
  preloadRef: Promise<AxiosResponse<IResponse<CommunityDetail>>> | null;
}

export const CommunityArticleDetail = ({ articleId, preloadRef }: CommunityArticleDetailProps) => {
  const initialData = readData(async () => await preloadRef, [preloadRef]);
  const {
    data: {
      data: { result: article },
    },
  } = useGetCommunityDetail({ articleId }, initialData);

  return (
    <>
      <BaseArticleTemplate article={article} />;
      <BaseErrorBoundary>
        <Suspense>
          <ArticleCommentList articleId={articleId} />
        </Suspense>
      </BaseErrorBoundary>
    </>
  );
};
