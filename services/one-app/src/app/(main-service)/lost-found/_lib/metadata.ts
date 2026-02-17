import type { Metadata } from 'next';

import { createListMetadata } from '@ahhachul/seo';

import { SEO_KEYWORDS, SEO_PAGE_COPY, SITE_URL, withBrandTitle } from '@/constant';
import { localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getLocalizedMetadataOptions } from '@/seo/metadata';
import { LostFoundType } from '@/types';

export async function generateLostFoundMetadata(
  searchParams: Promise<{
    q?: string;
    subwayLineId?: string;
    category?: LostFoundType;
  }>,
): Promise<Metadata> {
  const { subwayLineId } = await searchParams;
  const locale = await getServerLocale();

  return createListMetadata({
    baseTitle: withBrandTitle(SEO_PAGE_COPY.lostFound.title),
    baseDescription: SEO_PAGE_COPY.lostFound.description,
    subwayLineId,
    imageBasePath: 'https://static.dev.ahhachul.com/banners/lost-found',
    siteUrl: SITE_URL,
    rssPath: localizePathname('/lost-found/rss.xml', locale),
    keywords: [...SEO_KEYWORDS, '지하철 분실물', '지하철 유실물', '지하철 물건 찾기'],
    category: 'lost-found',
    ...getLocalizedMetadataOptions('/lost-found', locale),
  }) as Metadata;
}
