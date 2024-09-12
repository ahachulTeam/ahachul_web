import { Suspense } from 'react';
import type { ActivityComponentType } from '@stackflow/react';
import { SocialLogin } from 'entities/app-authentications/ui/SocialLogin';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import { ArticleListErrorFallback } from 'widgets/articles/ui/ArticleListErrorFallback';
import { Layout } from 'widgets';

export const SignIn: ActivityComponentType = () => {
  return (
    <Layout>
      <QueryErrorBoundary errorFallback={ArticleListErrorFallback}>
        <Suspense fallback={null}>
          <SocialLogin />
        </Suspense>
      </QueryErrorBoundary>
    </Layout>
  );
};
