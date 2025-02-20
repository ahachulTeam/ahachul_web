import type { Metadata } from 'next';

import { SUBWAY_LINES } from '@/constant';
import { LostFoundType } from '@/types';

export async function generateLostFoundMetadata(
  searchParams: Promise<{
    q?: string;
    subwayLineId?: string;
    category?: LostFoundType;
  }>,
): Promise<Metadata> {
  const { subwayLineId } = await searchParams;

  const baseTitle = '지하철 분실물 & 유실물 / 1등 지하철 민원 & 분실물 & 커뮤니티 정보 앱 - 아하철';

  const baseDescription =
    '지하철에서 잃어버린 물건을 쉽고 빠르게 찾아보세요. 분실물 정보를 실시간으로 확인하고 지하철 노선별 유실물 센터 정보를 제공합니다. 소중한 물건을 찾는 가장 빠른 방법, 아하철과 함께하세요.';

  const title =
    subwayLineId && +subwayLineId !== 0
      ? `${SUBWAY_LINES.find(subway => subway.id === +subwayLineId)?.name} ${baseTitle}`
      : baseTitle;

  const description =
    subwayLineId && +subwayLineId !== 0
      ? `${SUBWAY_LINES.find(subway => subway.id === +subwayLineId)?.name} ${baseDescription}`
      : baseDescription;

  const image =
    subwayLineId && +subwayLineId !== 0
      ? `https://static.dev.ahhachul.com/banners/lost-found/subway-line-${subwayLineId}.png`
      : 'https://static.dev.ahhachul.com/banners/lost-found/main.png';

  return {
    title,
    description,
    applicationName: '아하철 | AhHachul',
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 800,
          height: 400,
        },
      ],
    },
  };
}
