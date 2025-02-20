import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

import { SUBWAY_LINES } from '@/constant';
import { extractTextFromLexical } from '@/util';

import LostFoundPostDetail from './_components/LostFoundDetail';
import { getLostFoundComments } from './_lib/getComments';
import { getLostFoundDetailPostServer } from './_lib/getDetailPostServer';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getLostFoundDetailPostServer({ queryKey: ['lost-found-post', id] });

  const subwayLineId = post.result.subwayLineId;

  const baseTitle = (subwayLineId?: string) =>
    `${
      post.result.title.length > 16 ? post.result.title.slice(0, 16) + '...' : post.result.title
    } / ${subwayLineId} 분실물 & 유실물 - 아하철`;

  const title =
    subwayLineId && +subwayLineId !== 0
      ? baseTitle(SUBWAY_LINES.find(subway => subway.id === +subwayLineId)?.name)
      : baseTitle('지하철');

  const baseDescription =
    '지하철에서 잃어버린 물건을 쉽고 빠르게 찾아보세요. 분실물 정보를 실시간으로 확인하고 지하철 노선별 유실물 센터 정보를 제공합니다. 소중한 물건을 찾는 가장 빠른 방법, 아하철과 함께하세요.';

  const image =
    subwayLineId && +subwayLineId !== 0
      ? `https://static.dev.ahhachul.com/banners/lost-found/subway-line-${subwayLineId}.png`
      : 'https://static.dev.ahhachul.com/banners/lost-found/main.png';

  return {
    title,
    description: extractTextFromLexical(post.result.content, baseDescription),
    openGraph: {
      title,
      description: extractTextFromLexical(post.result.content, baseDescription),
      images: [
        {
          url: image,
          width: 800,
          height: 400,
        },
      ],
    },
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
