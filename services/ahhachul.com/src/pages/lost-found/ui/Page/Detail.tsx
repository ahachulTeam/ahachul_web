import React, { Suspense } from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import type { WithArticleId } from 'features/articles';
import { ArticleDetailErrorFallback } from 'features/articles/ui/ArticleDetailErrorFallback';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import { Loading } from 'entities/app-loaders/ui/Loading';
import LostFoundCommentTextField from '../_common/LostFoundCommentTextField';

const LostFoundArticleDetail = React.lazy(
  () => import('../_common/LostFoundArticleDetail/LostFoundArticleDetail'),
);

const LostFoundDetail: ActivityComponentType<WithArticleId> = ({
  params: { articleId },
}) => {
  return (
    <Layout>
      <QueryErrorBoundary errorFallback={ArticleDetailErrorFallback}>
        <Suspense fallback={<Loading opacity={1} />}>
          <LostFoundArticleDetail articleId={articleId} />
        </Suspense>
      </QueryErrorBoundary>
      <LostFoundCommentTextField />
    </Layout>
  );
};

export default LostFoundDetail;
