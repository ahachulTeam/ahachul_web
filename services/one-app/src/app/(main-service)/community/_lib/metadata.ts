import type { Metadata } from 'next';

import { createListMetadata } from '@ahhachul/seo';

import { SEO_KEYWORDS, SEO_PAGE_COPY, SITE_URL, withBrandTitle } from '@/constants';
import { localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getLocalizedMetadataOptions } from '@/seo/metadata';
import { CommunityType } from '@/types/community';

export async function generateCommunityMetadata(
  searchParams: Promise<{
    q?: string;
    subwayLineId?: string;
    category?: CommunityType;
  }>,
): Promise<Metadata> {
  const { subwayLineId } = await searchParams;
  const locale = await getServerLocale();

  return createListMetadata({
    baseTitle: withBrandTitle(SEO_PAGE_COPY.community.title),
    baseDescription: SEO_PAGE_COPY.community.description,
    subwayLineId,
    imageBasePath: 'https://static.dev.ahhachul.com/banners/community',
    siteUrl: SITE_URL,
    rssPath: localizePathname('/community/rss.xml', locale),
    keywords: [...SEO_KEYWORDS, '지하철 커뮤니티', '지하철 정보 공유'],
    category: 'community',
    ...getLocalizedMetadataOptions('/community', locale),
  }) as Metadata;
}
