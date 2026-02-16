import type { Metadata } from 'next';

import { createListMetadata } from '@ahhachul/seo';

import { SITE_URL } from '@/constant';
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
    baseTitle: '지하철 분실물 & 유실물 / 1등 지하철 민원 & 분실물 & 커뮤니티 정보 앱 - 아하철',
    baseDescription:
      '지하철에서 잃어버린 물건을 쉽고 빠르게 찾아보세요. 분실물 정보를 실시간으로 확인하고 지하철 노선별 유실물 센터 정보를 제공합니다. 소중한 물건을 찾는 가장 빠른 방법, 아하철과 함께하세요.',
    subwayLineId,
    imageBasePath: 'https://static.dev.ahhachul.com/banners/lost-found',
    siteUrl: SITE_URL,
    pathname: '/lost-found',
  }) as Metadata;
}
