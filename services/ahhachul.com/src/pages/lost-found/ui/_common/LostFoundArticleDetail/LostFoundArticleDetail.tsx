import React, { Suspense } from 'react';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import type { WithArticleId } from 'features/articles';
import { ArticleDetailErrorFallback } from 'features/articles/ui/ArticleDetailErrorFallback';
import { useGetLostFoundDetail } from 'pages/lost-found/api/get-detail';
import { BaseArticleTemplate } from 'features/articles/ui/BaseArticleTemplate';
import { ArticleCommentList } from '../ArticleCommentList/ArticleCommentList';

const LostFoundArticleDetail = ({ articleId }: WithArticleId) => {
  const { data } = useGetLostFoundDetail({ articleId });

  return (
    <>
      <BaseArticleTemplate article={data} />
      <QueryErrorBoundary errorFallback={ArticleDetailErrorFallback}>
        <Suspense fallback={<></>}>
          <ArticleCommentList articleId={articleId} />
        </Suspense>
      </QueryErrorBoundary>
    </>
  );
};

export default LostFoundArticleDetail;
