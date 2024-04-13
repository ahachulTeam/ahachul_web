import queryString from 'query-string';

import { base } from '..';
import {
  IResponse,
  type ICommunityParams as GetCommunityListRequestParams,
  type ICommunityList as GetCommunityListResponse,
  type ICommunityDetail as GetCommunityDetailResponse,
  ICommunityArticleForm,
} from '@/src/types';
import { API_BASE_URL } from '@/src/data/api';

export const getCommunityURL = `${API_BASE_URL}/community-posts`;

/**  커뮤니티 포스트 리스트 조회 */
export const getCommunityList = async (params: GetCommunityListRequestParams) => {
  const queryParams = queryString.stringify(params);

  const url = `${getCommunityURL}?${queryParams}`;

  return await base.get<IResponse<GetCommunityListResponse>>(url);
};

/**  커뮤니티 포스트 상세 조회 */
export const getCommunityDetail = async (postId: string) => {
  const url = `${getCommunityURL}/${postId}`;

  return await base.get<IResponse<GetCommunityDetailResponse>>(url);
};

/**  커뮤니티 포스트 생성  */
export const post = async (body: ICommunityArticleForm) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(body)) {
    if (key !== 'imageFiles') {
      formData.append(key, value);
    }
  }
  if (body?.imageFiles) {
    formData.append('imageFiles', body.imageFiles);
  }

  return await base.post<IResponse<Partial<GetCommunityDetailResponse>>>(getCommunityURL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
