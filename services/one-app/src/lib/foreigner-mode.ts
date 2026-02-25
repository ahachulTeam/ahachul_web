import { API_PATHS } from '@ahhachul/http';

import type {
  ApiResponse,
  ForeignerCommunityPostTranslation,
  ForeignerLocale,
  ForeignerStationGuide,
} from '@/types';

import { fetchClient } from './fetch-client';

type FetchForeignerStationGuideParams = {
  stationId: number;
  subwayLineId: number;
  locale?: ForeignerLocale;
};

export async function fetchForeignerStationGuideV2(
  params: FetchForeignerStationGuideParams,
): Promise<ForeignerStationGuide> {
  const response = await fetchClient<ApiResponse<ForeignerStationGuide>>(
    API_PATHS.foreigner.stationGuideV2,
    {
      params: {
        stationId: params.stationId,
        subwayLineId: params.subwayLineId,
        ...(params.locale ? { locale: params.locale } : {}),
      },
    },
  );

  return response.result;
}

export async function fetchForeignerCommunityPostTranslationV2(
  postId: number,
  targetLocale?: ForeignerLocale,
): Promise<ForeignerCommunityPostTranslation> {
  const response = await fetchClient<ApiResponse<ForeignerCommunityPostTranslation>>(
    API_PATHS.foreigner.communityPostTranslationV2(postId),
    {
      params: {
        ...(targetLocale ? { targetLocale } : {}),
      },
    },
  );

  return response.result;
}
