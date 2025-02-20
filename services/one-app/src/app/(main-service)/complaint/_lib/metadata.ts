import type { Metadata } from 'next';

import { SUBWAY_LINES } from '@/constant';
import { CommunityType } from '@/types/community';

export async function generateComplaintyMetadata(
  searchParams: Promise<{
    q?: string;
    subwayLineId?: string;
    category?: CommunityType;
  }>,
): Promise<Metadata> {
  const { subwayLineId } = await searchParams;

  const baseTitle = '지하철 민원 접수 / 1등 지하철 민원 & 분실물 & 커뮤니티 정보 앱 - 아하철';

  const baseDescription =
    '지하철 이용 중 불편사항을 쉽고 빠르게 신고하세요. 시설물 고장, 불편사항, 개선 요청 등 다양한 민원을 실시간으로 접수하고 처리 현황을 확인할 수 있습니다. 더 나은 지하철 환경을 만드는 첫걸음, 아하철 민원 서비스입니다.';

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
      ? `https://static.dev.ahhachul.com/banners/complaint/subway-line-${subwayLineId}.png`
      : 'https://static.dev.ahhachul.com/banners/complaint/main.png';

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
