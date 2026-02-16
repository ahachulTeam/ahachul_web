import type { Metadata } from 'next';
import { createListMetadata } from '@ahhachul/seo';

import { SITE_URL } from '@/constant';
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
    baseTitle: '지하철 커뮤니티 / 1등 지하철 민원 & 분실물 & 커뮤니티 정보 앱 - 아하철',
    baseDescription:
      '지하철 이용객들과 실시간으로 소통하세요. 지하철 관련 정보, 꿀팁, 일상 이야기부터 지하철 운행 상황까지 다양한 이야기를 나눌 수 있는 공간입니다. 함께 만들어가는 지하철 커뮤니티, 아하철에서 시작하세요.',
    subwayLineId,
    imageBasePath: 'https://static.dev.ahhachul.com/banners/community',
    siteUrl: SITE_URL,
    pathname: '/community',
  }) as Metadata;
}
