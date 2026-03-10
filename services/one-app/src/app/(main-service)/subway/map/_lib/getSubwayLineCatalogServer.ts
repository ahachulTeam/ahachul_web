import { API_PATHS } from '@ahhachul/http';

import { API_BASE_URL } from '@/constants';
import type { ApiResponse } from '@/types';

type SubwayLineCatalogStation = {
  id: number;
  name: string;
};

export type SubwayLineCatalogLine = {
  id: number;
  name: string;
  stations: SubwayLineCatalogStation[];
};

type SubwayLineCatalogResponse = {
  subwayLines: SubwayLineCatalogLine[];
};

export async function getSubwayLineCatalogServer(): Promise<{
  subwayLines: SubwayLineCatalogLine[];
  statusNotice: string | null;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_PATHS.subway.lines}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        subwayLines: [],
        statusNotice:
          '역 검색 카탈로그를 불러오지 못했습니다. 지도 이미지는 계속 확인할 수 있습니다.',
      };
    }

    const data = (await response.json()) as ApiResponse<SubwayLineCatalogResponse>;
    return {
      subwayLines: data.result.subwayLines ?? [],
      statusNotice: null,
    };
  } catch {
    return {
      subwayLines: [],
      statusNotice:
        '역 검색 카탈로그를 불러오지 못했습니다. 지도 이미지는 계속 확인할 수 있습니다.',
    };
  }
}
