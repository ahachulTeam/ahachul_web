import { API_PATHS } from '@ahhachul/http';

import { API_ORIGIN_URL } from '@/constants';
import type {
  CommunityDelaySignalsQuery,
  CommunityDelaySignalsResponse,
  ObjectQueryParams,
} from '@/types';

import { fetchClient } from './fetch-client';

const COMMUNITY_DELAY_SIGNALS_V2_ENDPOINT = `${API_ORIGIN_URL}${API_PATHS.subway.communityDelaySignalsV2}`;

export async function getCommunityDelaySignalsV2(params: CommunityDelaySignalsQuery) {
  const queryParams: ObjectQueryParams = {
    subwayLineId: params.subwayLineId,
    ...(typeof params.stationId === 'number' && params.stationId > 0
      ? { stationId: params.stationId }
      : {}),
    ...(typeof params.windowMinutes === 'number' ? { windowMinutes: params.windowMinutes } : {}),
    ...(typeof params.limit === 'number' ? { limit: params.limit } : {}),
  };

  return fetchClient<CommunityDelaySignalsResponse>(COMMUNITY_DELAY_SIGNALS_V2_ENDPOINT, {
    params: queryParams,
  });
}
