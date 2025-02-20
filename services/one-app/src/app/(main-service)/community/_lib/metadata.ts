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

  const baseTitle = '지하철 커뮤니티 / 1등 지하철 민원 & 분실물 & 커뮤니티 정보 앱 - 아하철';

  const baseDescription =
    '지하철 이용객들과 실시간으로 소통하세요. 지하철 관련 정보, 꿀팁, 일상 이야기부터 지하철 운행 상황까지 다양한 이야기를 나눌 수 있는 공간입니다. 함께 만들어가는 지하철 커뮤니티, 아하철에서 시작하세요.';

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
      ? `https://static.dev.ahhachul.com/banners/community/subway-line-${subwayLineId}.png`
      : 'https://static.dev.ahhachul.com/banners/community/main.png';

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
