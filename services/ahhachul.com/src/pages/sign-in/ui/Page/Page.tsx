import { Suspense } from 'react';
import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';
import { SocialLogin } from 'entities/app-authentications/ui/SocialLogin';
import { QueryErrorBoundary } from 'entities/app-errors/ui/QueryErrorBoundary';
import { ArticleListErrorFallback } from 'widgets/articles/ui/ArticleListErrorFallback';
import { Layout } from 'widgets';

const PageFallback = styled.section`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.background[50]};
`;

export const SignIn: ActivityComponentType = () => {
  return (
    <Layout>
      <QueryErrorBoundary errorFallback={ArticleListErrorFallback}>
        <Suspense fallback={<PageFallback />}>
          <SocialLogin />
        </Suspense>
      </QueryErrorBoundary>
    </Layout>
  );
};
