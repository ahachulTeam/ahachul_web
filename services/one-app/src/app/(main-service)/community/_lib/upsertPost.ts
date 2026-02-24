import { API_PATHS } from '@ahhachul/http';
import { createJsonBlob } from '@ahhachul/utils';

import { fetchClient } from '@/lib/fetch-client';
import type { ApiResponse, WithPostId } from '@/types';
import type { CommunityType } from '@/types/community';

type CommunityUpsertPayload = {
  title: string;
  content: string;
  categoryType: CommunityType;
  subwayLineId: number;
  stationId?: number;
};

function createCommunityMultipartBody(payload: CommunityUpsertPayload): FormData {
  const formData = new FormData();
  formData.append('content', createJsonBlob(payload));
  return formData;
}

export function createCommunityPost(
  payload: CommunityUpsertPayload,
): Promise<ApiResponse<WithPostId>> {
  return fetchClient<ApiResponse<WithPostId>>(API_PATHS.community.list, {
    method: 'POST',
    body: createCommunityMultipartBody(payload),
  });
}

export function editCommunityPost(
  id: number,
  payload: CommunityUpsertPayload,
): Promise<ApiResponse<WithPostId>> {
  return fetchClient<ApiResponse<WithPostId>>(API_PATHS.community.detail(id), {
    method: 'POST',
    body: createCommunityMultipartBody(payload),
  });
}
