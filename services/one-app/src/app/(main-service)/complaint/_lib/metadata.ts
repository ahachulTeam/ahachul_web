import type { Metadata } from 'next';

import { createListMetadata } from '@ahhachul/seo';

import { SITE_URL } from '@/constant';
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
    baseTitle: '지하철 민원 접수 / 1등 지하철 민원 & 분실물 & 커뮤니티 정보 앱 - 아하철',
    baseDescription:
      '지하철 이용 중 불편사항을 쉽고 빠르게 신고하세요. 시설물 고장, 불편사항, 개선 요청 등 다양한 민원을 실시간으로 접수하고 처리 현황을 확인할 수 있습니다. 더 나은 지하철 환경을 만드는 첫걸음, 아하철 민원 서비스입니다.',
    subwayLineId,
    imageBasePath: 'https://static.dev.ahhachul.com/banners/complaint',
    siteUrl: SITE_URL,
    pathname: '/complaint',
  }) as Metadata;
}

// TODO: remove after all call sites migrate to `generateComplaintMetadata`.
export const generateComplaintyMetadata = generateComplaintMetadata;
