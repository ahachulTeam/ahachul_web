import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

import { SUBWAY_LINES } from '@/constant';
import { extractTextFromLexical } from '@/util';

import CommunityPostDetail from './_components/CommunityDetail';
import { getCommunityDetailPostServer } from './_lib/getDetailPostServer';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getCommunityDetailPostServer({ queryKey: ['community-post', id] });

  const subwayLineId = post.result.subwayLineId;

  const baseTitle = `${
    post.result.title.length > 16 ? post.result.title.slice(0, 16) + '...' : post.result.title
  } / 지하철 커뮤니티 / 아하철`;

  const title =
    subwayLineId && +subwayLineId !== 0
      ? `${SUBWAY_LINES.find(subway => subway.id === +subwayLineId)?.name} ${baseTitle}`
      : baseTitle;

  const baseDescription =
    '지하철 이용객들과 실시간으로 소통하세요. 지하철 관련 정보, 꿀팁, 일상 이야기부터 지하철 운행 상황까지 다양한 이야기를 나눌 수 있는 공간입니다. 함께 만들어가는 지하철 커뮤니티, 아하철에서 시작하세요.';

  const image =
    subwayLineId && +subwayLineId !== 0
      ? `https://static.dev.ahhachul.com/banners/community/subway-line-${subwayLineId}.png`
      : 'https://static.dev.ahhachul.com/banners/community/main.png';

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
