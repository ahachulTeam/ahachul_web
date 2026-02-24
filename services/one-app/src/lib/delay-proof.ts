import { API_PATHS } from '@ahhachul/http';

import { API_ORIGIN_URL } from '@/constants';
import type {
  DelayProofCreateRequest,
  DelayProofCreateResponse,
  DelayProofGetResponse,
} from '@/types';

import { fetchClient } from './fetch-client';

const DELAY_PROOFS_V2_ENDPOINT = `${API_ORIGIN_URL}${API_PATHS.subway.delayProofsV2}`;

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
