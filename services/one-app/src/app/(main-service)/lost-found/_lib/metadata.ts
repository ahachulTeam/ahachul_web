import type { Metadata } from 'next';

import { createListMetadata } from '@ahhachul/seo';

import { SEO_KEYWORDS, SEO_PAGE_COPY, SITE_URL, withBrandTitle } from '@/constant';
import { LostFoundType } from '@/types';

export async function generateLostFoundMetadata(
  searchParams: Promise<{
    q?: string;
    subwayLineId?: string;
    category?: LostFoundType;
  }>,
): Promise<Metadata> {
  const { subwayLineId } = await searchParams;
  return createListMetadata({
    baseTitle: withBrandTitle(SEO_PAGE_COPY.lostFound.title),
    baseDescription: SEO_PAGE_COPY.lostFound.description,
    subwayLineId,
    imageBasePath: 'https://static.dev.ahhachul.com/banners/lost-found',
    siteUrl: SITE_URL,
    pathname: '/lost-found',
    rssPath: '/lost-found/rss.xml',
    keywords: [...SEO_KEYWORDS, '지하철 분실물', '지하철 유실물', '지하철 물건 찾기'],
    category: 'lost-found',
  }) as Metadata;
}
