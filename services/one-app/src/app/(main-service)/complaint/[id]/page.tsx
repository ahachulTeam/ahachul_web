import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

import { complaintQueryKeys } from '@ahhachul/domain';
import { createDetailMetadata } from '@ahhachul/seo';

import BreadcrumbNav from '@/app/_components/BreadcrumbNav';
import { SEO_KEYWORDS, SEO_PAGE_COPY, SITE_URL, SUBWAY_LINES, withBrandTitle } from '@/constant';
import { getLocaleMessages, localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getLocalizedMetadataOptions } from '@/seo/metadata';
import { extractTextFromLexical } from '@/util';

import ComplaintDetail from './_components/ComplaintDetail';
import { getComplaintDetailPostServer } from './_lib/getDetailPostServer';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const locale = await getServerLocale();
  const post = await getComplaintDetailPostServer({ queryKey: complaintQueryKeys.detail(id) });

  const subwayLineId = post.result.subwayLineId;
  const extractTitle = extractTextFromLexical(post.result.content, post.result.complaintType).slice(
    0,
    28,
  );
  const lineName = SUBWAY_LINES.find(subway => subway.id === +subwayLineId)?.name;
  const lineLabel = subwayLineId && +subwayLineId !== 0 ? (lineName ?? '해당 노선') : '전체 노선';
  const issueTitle = extractTitle || post.result.complaintType;
  const title = withBrandTitle(`${issueTitle} - ${lineLabel} 민원 사례`);

  let image = 'https://static.dev.ahhachul.com/banners/complaint/main.png';
  if (subwayLineId && +subwayLineId !== 0) {
    image = `https://static.dev.ahhachul.com/banners/complaint/subway-line-${subwayLineId}.png`;
  }
  if (post.result.images.length > 0 && post.result.images.at(0).imageUrl) {
    image = post.result.images.at(0).imageUrl;
  }

  const description = extractTextFromLexical(
    post.result.content,
    SEO_PAGE_COPY.complaint.description,
  );

  return createDetailMetadata({
    title,
    description,
    imageUrl: image,
    siteUrl: SITE_URL,
    keywords: [...SEO_KEYWORDS, post.result.complaintType, '지하철 민원 사례'],
    category: 'complaint',
    ...getLocalizedMetadataOptions(`/complaint/${id}`, locale),
  }) as Metadata;
}

type Props = {
  params: Promise<{
    id: number;
  }>;
};

export default async function ComplaintDetailPage(props: Props) {
  const { id } = await props.params;
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: complaintQueryKeys.detail(id),
    queryFn: getComplaintDetailPostServer,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="flex min-h-screen flex-col text-black bg-white mb-[210px]">
      <HydrationBoundary state={dehydratedState}>
        <BreadcrumbNav
          items={[
            { name: messages.nav.home, href: localizePathname('/', locale) },
            { name: messages.nav.complaint, href: localizePathname('/complaint', locale) },
            { name: `#${id}`, href: localizePathname(`/complaint/${id}`, locale) },
          ]}
        />
        <ComplaintDetail id={id} />
      </HydrationBoundary>
    </main>
  );
}
