import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { createDetailMetadata } from '@ahhachul/seo';

import { SITE_URL, SUBWAY_LINES } from '@/constant';
import { extractTextFromLexical } from '@/util';

import ComplaintDetail from './_components/ComplaintDetail';
import { getComplaintDetailPostServer } from './_lib/getDetailPostServer';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getComplaintDetailPostServer({ queryKey: ['complaint-post', id] });

  const subwayLineId = post.result.subwayLineId;
  const extractTitle = extractTextFromLexical(post.result.content, post.result.complaintType).slice(
    0,
    16,
  );
  const baseTitle = (subwayLineId?: string) =>
    `${extractTitle} / ${subwayLineId} 민원 접수 - 아하철`;

  const title =
    subwayLineId && +subwayLineId !== 0
      ? baseTitle(SUBWAY_LINES.find(subway => subway.id === +subwayLineId)?.name)
      : baseTitle('지하철');

  const baseDescription =
    '지하철 이용 중 불편사항을 쉽고 빠르게 신고하세요. 시설물 고장, 불편사항, 개선 요청 등 다양한 민원을 실시간으로 접수하고 처리 현황을 확인할 수 있습니다. 더 나은 지하철 환경을 만드는 첫걸음, 아하철 민원 서비스입니다.';

  const image =
    post.result.images.length > 0 && post.result.images.at(0).imageUrl
      ? post.result.images.at(0).imageUrl
      : subwayLineId && +subwayLineId !== 0
        ? `https://static.dev.ahhachul.com/banners/complaint/subway-line-${subwayLineId}.png`
        : 'https://static.dev.ahhachul.com/banners/complaint/main.png';

  const description = extractTextFromLexical(post.result.content, baseDescription);

  return createDetailMetadata({
    title,
    description,
    imageUrl: image,
    siteUrl: SITE_URL,
    pathname: `/complaint/${id}`,
  }) as Metadata;
}

type Props = {
  params: Promise<{
    id: number;
  }>;
};

export default async function ComplaintDetailPage(props: Props) {
  const { id } = await props.params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['complaint-post', id],
    queryFn: getComplaintDetailPostServer,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="flex min-h-screen flex-col text-black bg-white mb-[210px]">
      <HydrationBoundary state={dehydratedState}>
        <ComplaintDetail id={id} />
      </HydrationBoundary>
    </main>
  );
}
