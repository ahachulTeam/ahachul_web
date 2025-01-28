import type { Metadata } from 'next';

import { SUBWAY_LINES } from '@/constant';
import { CommunityType } from '@/types/community';

export async function generateCommunityMetadata(
  searchParams: Promise<{
    q?: string;
    subwayLineId?: string;
    category?: CommunityType;
  }>,
): Promise<Metadata> {
  const { subwayLineId } = await searchParams;

  const baseTitle = '커뮤니티 지하철 / 1등 지하철 민원 & 유실물 & 커뮤니티 정보 앱';

  const title =
    subwayLineId && +subwayLineId !== 0
      ? `${SUBWAY_LINES.find(subway => subway.id === +subwayLineId)?.name} ${baseTitle}`
      : baseTitle;

  return {
    title,
    description: '지하철에 당신의 따뜻한 이야기를 채워나가요',
    applicationName: '아하철 | AhHachul',
  };
}
