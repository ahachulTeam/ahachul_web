import { Layout } from '@/src/components/layout';
import { Suspense } from 'react';
import { useParams } from 'next/navigation';

import { ErrorComponent, SharedComponent, UiComponent } from '@/src/components';
import { GetServerSideProps } from 'next';
import { PATH } from '@/src/data';
import { QueryClient } from '@/src/queries/query';
import { getQueryKeys } from '@/src/queries/query-key';
import { COMMUNITY_DETAIL_KEY } from '@/src/queries/community/keys';
import { getCommunityDetail } from '@/src/api/community';

export default function CommunityDetail() {
  const params = useParams();

  return (
    <Layout headerType="back" title="" nav={false}>
      <ErrorComponent.QueryErrorBoundary>
        <Suspense fallback={<UiComponent.Loading opacity={1} />}>
          <SharedComponent.CommunityDetailMain postId={params?.articleId as string} />
        </Suspense>
      </ErrorComponent.QueryErrorBoundary>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const articleId = params?.articleId as string;

  if (!articleId) {
    return {
      redirect: {
        destination: PATH.community,
        permanent: true,
      },
    };
  }

  try {
    const queryClient = new QueryClient();

    await queryClient.fetchQuery({
      queryKey: getQueryKeys(COMMUNITY_DETAIL_KEY).detail(articleId),
      queryFn: () => getCommunityDetail(articleId),
    });

    return {
      props: {},
    };
  } catch (err) {
    console.error(err);
    return {
      props: {},
    };
  }
};
