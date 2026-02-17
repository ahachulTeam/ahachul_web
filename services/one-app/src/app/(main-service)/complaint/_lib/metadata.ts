import type { Metadata } from 'next';

import { createListMetadata } from '@ahhachul/seo';

import { SEO_KEYWORDS, SEO_PAGE_COPY, SITE_URL, withBrandTitle } from '@/constant';
import { CommunityType } from '@/types/community';

export async function generateComplaintMetadata(
  searchParams: Promise<{
    q?: string;
    subwayLineId?: string;
    category?: CommunityType;
  }>,
): Promise<Metadata> {
  const { subwayLineId } = await searchParams;
  return createListMetadata({
    baseTitle: withBrandTitle(SEO_PAGE_COPY.complaint.title),
    baseDescription: SEO_PAGE_COPY.complaint.description,
    subwayLineId,
    imageBasePath: 'https://static.dev.ahhachul.com/banners/complaint',
    siteUrl: SITE_URL,
    pathname: '/complaint',
    keywords: [...SEO_KEYWORDS, '지하철 민원', '지하철 불편 신고'],
    category: 'complaint',
  }) as Metadata;
}

// TODO: remove after all call sites migrate to `generateComplaintMetadata`.
export const generateComplaintyMetadata = generateComplaintMetadata;
