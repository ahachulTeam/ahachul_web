import { Suspense } from 'react';
import { useParams } from 'next/navigation';

import { ErrorComponent, SharedComponent, UiComponent } from '@/src/components';
import { Layout } from '@/src/components/layout';
import { GetServerSideProps } from 'next';
import { PATH } from '@/src/data';
import { getQueryKeys } from '@/src/queries/query-key';
import { LOST_DETAIL_KEY } from '@/src/queries/lost/keys';
import { getLostDetail } from '@/src/api/lost';
import { QueryClient } from '@/src/queries/query';

export default function LostDetail() {
  const params = useParams();

  return (
    <Layout headerType="back" title="" nav={false}>
      <ErrorComponent.QueryErrorBoundary>
        <Suspense fallback={<UiComponent.Loading opacity={1} />}>
          <SharedComponent.LostDetailMain postId={params?.articleId as string} />
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
        destination: PATH.lost,
        permanent: true,
      },
    };
  }

  try {
    const queryClient = new QueryClient();

    await queryClient.fetchQuery({
      queryKey: getQueryKeys(LOST_DETAIL_KEY).detail(articleId),
      queryFn: () => getLostDetail(articleId),
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
