import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

import LostFoundPostDetail from './_components/LostFoundDetail';
import { getLostFoundComments } from './_lib/getComments';
import { getLostFoundDetailPostServer } from './_lib/getDetailPostServer';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getLostFoundDetailPostServer({ queryKey: ['lost-found-post', id] });

  return {
    title: `지하철 유실물 아하철 / ${post.result.title}`,
    description: post.result.content,
  };
}

type Props = {
  params: Promise<{
    id: number;
  }>;
};

export default async function LostFoundDetailPage(props: Props) {
  const { id } = await props.params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['lost-found-post', id],
    queryFn: getLostFoundDetailPostServer,
  });
  await queryClient.prefetchQuery({
    queryKey: ['lost-found-post', id, 'comments'],
    queryFn: getLostFoundComments,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="flex min-h-screen flex-col text-black bg-white mb-[210px]">
      <HydrationBoundary state={dehydratedState}>
        <LostFoundPostDetail id={id} />
      </HydrationBoundary>
    </main>
  );
}
