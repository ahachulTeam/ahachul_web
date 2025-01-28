import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

import CommunityPostDetail from './_components/CommunityDetail';
import { getCommunityDetailPostServer } from './_lib/getDetailPostServer';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getCommunityDetailPostServer({ queryKey: ['community-post', id] });

  return {
    title: `지하철 커뮤니티 아하철 / ${post.result.title}`,
    description: post.result.content,
  };
}

type Props = {
  params: Promise<{
    id: number;
  }>;
};

export default async function CommunityDetailPage(props: Props) {
  const { id } = await props.params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['community-post', id],
    queryFn: getCommunityDetailPostServer,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="flex min-h-screen flex-col text-black bg-white mb-[210px]">
      <HydrationBoundary state={dehydratedState}>
        <CommunityPostDetail id={id} />
      </HydrationBoundary>
    </main>
  );
}
