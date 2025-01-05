import React, { useRef, useCallback, Suspense } from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import type { WithArticleId } from 'features/articles';
import { ArticleDetailErrorFallback } from 'features/articles/ui/ArticleDetailErrorFallback';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import { Loading } from 'entities/app-loaders/ui/Loading';
import LostFoundCommentTextField from '../_common/LostFoundCommentTextField';
import { renderRightEllipsis } from 'widgets/layout-header';

const LostFoundArticleDetail = React.lazy(
  () => import('../_common/LostFoundArticleDetail/LostFoundArticleDetail'),
);

const LostFoundDetail: ActivityComponentType<WithArticleId> = ({
  params: { articleId },
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const handleHitBottom = useCallback(() => {
    bottomRef.current.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  }, []);

  return (
    <Layout
      appBar={{ renderRight: () => renderRightEllipsis?.({ articleId }) }}
    >
      <QueryErrorBoundary errorFallback={ArticleDetailErrorFallback}>
        <Suspense fallback={<Loading opacity={1} />}>
          <LostFoundArticleDetail articleId={articleId} />
        </Suspense>
      </QueryErrorBoundary>

      <LostFoundCommentTextField
        articleId={articleId}
        handleHitBottom={handleHitBottom}
      />
      <div ref={bottomRef} css={{ height: '1px' }} />
    </Layout>
  );
};

export default LostFoundDetail;
