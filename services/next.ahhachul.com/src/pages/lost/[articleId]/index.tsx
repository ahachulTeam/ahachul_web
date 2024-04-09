import { Suspense } from 'react';

import { ErrorComponent, SharedComponent, UiComponent } from '@/src/components';
import { Layout } from '@/src/components/layout';
import { useParams } from 'next/navigation';

export default function LostDetail() {
  const params = useParams();

  return (
    <Layout headerType="back">
      <ErrorComponent.QueryErrorBoundary>
        <Suspense fallback={<UiComponent.Loading opacity={1} />}>
          <SharedComponent.LostDetailMain postId={params?.articleId as string} />
        </Suspense>
      </ErrorComponent.QueryErrorBoundary>
    </Layout>
  );
}
