import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

import { communityQueryKeys } from '@ahhachul/domain';
import { createDetailMetadata } from '@ahhachul/seo';

import { SEO_KEYWORDS, SEO_PAGE_COPY, SITE_URL, SUBWAY_LINES, withBrandTitle } from '@/constant';
import { extractTextFromLexical } from '@/util';

import CommunityPostDetail from './_components/CommunityDetail';
import { getCommunityDetailPostServer } from './_lib/getDetailPostServer';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getCommunityDetailPostServer({ queryKey: communityQueryKeys.detail(id) });

  const subwayLineId = post.result.subwayLineId;
  const lineName = SUBWAY_LINES.find(subway => subway.id === +subwayLineId)?.name;
  const lineLabel = subwayLineId && +subwayLineId !== 0 ? (lineName ?? '해당 노선') : '전체 노선';
  const headline =
    post.result.title.length > 28 ? `${post.result.title.slice(0, 28)}...` : post.result.title;
  const title = withBrandTitle(`${headline} - ${lineLabel} 커뮤니티 글`);

  const image =
    subwayLineId && +subwayLineId !== 0
      ? `https://static.dev.ahhachul.com/banners/community/subway-line-${subwayLineId}.png`
      : 'https://static.dev.ahhachul.com/banners/community/main.png';

  const description = extractTextFromLexical(
    post.result.content,
    SEO_PAGE_COPY.community.description,
  );

  return createDetailMetadata({
    title,
    description,
    imageUrl: image,
    siteUrl: SITE_URL,
    pathname: `/community/${id}`,
    keywords: [...SEO_KEYWORDS, post.result.title, '지하철 커뮤니티 글'],
    category: 'community',
  }) as Metadata;
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
    queryKey: communityQueryKeys.detail(id),
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
