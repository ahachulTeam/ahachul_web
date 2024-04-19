import { Layout } from '@/src/components/layout';
import { Suspense } from 'react';
import { useParams } from 'next/navigation';

import { ErrorComponent, SharedComponent, UiComponent } from '@/src/components';
import { GetServerSideProps } from 'next';
import { PATH } from '@/src/data';
import { QueryClient } from '@/src/queries/query';
import { getQueryKeys } from '@/src/queries/query-key';
import { COMPLAINTS_DETAIL_KEY } from '@/src/queries/complaints/keys';
import { getComplaintDetail } from '@/src/api/complaints';

export default function ComplaintDetail() {
  const params = useParams();

  return (
    <Layout headerType="back" title="" nav={false}>
      <ErrorComponent.QueryErrorBoundary>
        <Suspense fallback={<UiComponent.Loading opacity={1} />}>
          <SharedComponent.ComplaintDetailMain postId={params?.articleId as string} />
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
        destination: PATH.complaints,
        permanent: true,
      },
    };
  }

  try {
    const queryClient = new QueryClient();

    await queryClient.fetchQuery({
      queryKey: getQueryKeys(COMPLAINTS_DETAIL_KEY).detail(articleId),
      queryFn: () => getComplaintDetail(articleId),
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
