import { API_PATHS } from '@ahhachul/http';

import { API_ORIGIN_URL } from '@/constants';
import type {
  DelayCenterOverviewQuery,
  DelayCenterOverviewResponse,
  DelayProofCreateRequest,
  DelayProofCreateResponse,
  DelayProofGetResponse,
  ObjectQueryParams,
} from '@/types';

import { fetchClient } from './fetch-client';

const DELAY_PROOFS_V2_ENDPOINT = `${API_ORIGIN_URL}${API_PATHS.subway.delayProofsV2}`;
const DELAY_CENTER_OVERVIEW_V2_ENDPOINT = `${API_ORIGIN_URL}${API_PATHS.subway.delayCenterOverviewV2}`;

export async function createDelayProofV2(payload: DelayProofCreateRequest) {
  return fetchClient<DelayProofCreateResponse>(DELAY_PROOFS_V2_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getDelayProofV2(proofId: string) {
  return fetchClient<DelayProofGetResponse>(
    `${API_ORIGIN_URL}${API_PATHS.subway.delayProofV2(proofId)}`,
  );
}

export async function getDelayCenterOverviewV2(params: DelayCenterOverviewQuery) {
  const queryParams: ObjectQueryParams = {
    stationId: params.stationId,
    subwayLineId: params.subwayLineId,
    ...(params.upDownType ? { upDownType: params.upDownType } : {}),
    ...(typeof params.windowMinutes === 'number' ? { windowMinutes: params.windowMinutes } : {}),
    ...(typeof params.incidentLimit === 'number' ? { incidentLimit: params.incidentLimit } : {}),
    ...(typeof params.signalLimit === 'number' ? { signalLimit: params.signalLimit } : {}),
  };

  return fetchClient<DelayCenterOverviewResponse>(DELAY_CENTER_OVERVIEW_V2_ENDPOINT, {
    params: queryParams,
  });
}
