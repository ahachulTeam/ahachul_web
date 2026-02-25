import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

import { lostFoundQueryKeys } from '@ahhachul/domain';
import { createDetailMetadata } from '@ahhachul/seo';

import BreadcrumbNav from '@/app/_components/BreadcrumbNav';
import { SEO_KEYWORDS, SEO_PAGE_COPY, SITE_URL, SUBWAY_LINES, withBrandTitle } from '@/constants';
import { getLocaleMessages, localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getLocalizedMetadataOptions } from '@/seo/metadata';
import { extractTextFromLexical } from '@/utils';

import LostFoundPostDetail from './_components/LostFoundDetail';
import { getLostFoundComments } from './_lib/getComments';
import { getLostFoundDetailPostServer } from './_lib/getDetailPostServer';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const locale = await getServerLocale();
  const post = await getLostFoundDetailPostServer({ queryKey: lostFoundQueryKeys.detail(id) });

  const subwayLineId = post.result.subwayLineId;
  const lineName = SUBWAY_LINES.find(subway => subway.id === +subwayLineId)?.name;
  const lineLabel = subwayLineId && +subwayLineId !== 0 ? (lineName ?? '해당 노선') : '전체 노선';
  const headline =
    post.result.title.length > 28 ? `${post.result.title.slice(0, 28)}...` : post.result.title;
  const title = withBrandTitle(`${headline} - ${lineLabel} 분실물 글`);

  const image =
    subwayLineId && +subwayLineId !== 0
      ? `https://static.dev.ahhachul.com/banners/lost-found/subway-line-${subwayLineId}.png`
      : 'https://static.dev.ahhachul.com/banners/lost-found/main.png';

  const description = extractTextFromLexical(
    post.result.content,
    SEO_PAGE_COPY.lostFound.description,
  );

  return createDetailMetadata({
    title,
    description,
    imageUrl: image,
    siteUrl: SITE_URL,
    keywords: [...SEO_KEYWORDS, post.result.title, '지하철 분실물 글'],
    category: 'lost-found',
    ...getLocalizedMetadataOptions(`/lost-found/${id}`, locale),
  }) as Metadata;
}

type Props = {
  params: Promise<{
    id: number;
  }>;
};

export default async function LostFoundDetailPage(props: Props) {
  const { id } = await props.params;
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: lostFoundQueryKeys.detail(id),
    queryFn: getLostFoundDetailPostServer,
  });
  await queryClient.prefetchQuery({
    queryKey: [...lostFoundQueryKeys.comments(id), 'latest'] as const,
    queryFn: getLostFoundComments,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="flex min-h-screen flex-col text-black bg-white mb-[210px]">
      <HydrationBoundary state={dehydratedState}>
        <BreadcrumbNav
          items={[
            { name: messages.nav.home, href: localizePathname('/', locale) },
            { name: messages.nav.lostFound, href: localizePathname('/lost-found', locale) },
            { name: `#${id}`, href: localizePathname(`/lost-found/${id}`, locale) },
          ]}
        />
        <LostFoundPostDetail id={id} />
      </HydrationBoundary>
    </main>
  );
}
