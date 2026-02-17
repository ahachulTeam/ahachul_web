import type { Metadata } from 'next';

import { createListMetadata } from '@ahhachul/seo';

import { SEO_KEYWORDS, SEO_PAGE_COPY, SITE_URL, withBrandTitle } from '@/constant';
import { CommunityType } from '@/types/community';

export async function generateCommunityMetadata(
  searchParams: Promise<{
    q?: string;
    subwayLineId?: string;
    category?: CommunityType;
  }>,
): Promise<Metadata> {
  const { subwayLineId } = await searchParams;
  return createListMetadata({
    baseTitle: withBrandTitle(SEO_PAGE_COPY.community.title),
    baseDescription: SEO_PAGE_COPY.community.description,
    subwayLineId,
    imageBasePath: 'https://static.dev.ahhachul.com/banners/community',
    siteUrl: SITE_URL,
    pathname: '/community',
    rssPath: '/community/rss.xml',
    keywords: [...SEO_KEYWORDS, '지하철 커뮤니티', '지하철 정보 공유'],
    category: 'community',
  }) as Metadata;
}
