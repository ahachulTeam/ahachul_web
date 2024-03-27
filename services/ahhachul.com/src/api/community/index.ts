import queryString from 'query-string';

import { base } from 'api';
import {
  IResponse,
  type ICommunityParams as GetCommunityListRequestParams,
  type ICommunityList as GetCommunityListResponse,
  type ICommunityDetail as GetCommunityDetailResponse,
} from 'types';
import { API_BASE_URL } from 'data/api';

export const getCommunityListURL = `${API_BASE_URL}/community-posts`;

/**  커뮤니티 포스트 리스트 조회 */
export const getCommunityList = async (params: GetCommunityListRequestParams) => {
  const queryParams = queryString.stringify(params);

  const url = `${getCommunityListURL}?${queryParams}`;

  return await base.get<IResponse<GetCommunityListResponse>>(url);
};

/**  커뮤니티 포스트 상세 조회 */
export const getCommunityDetail = async (postId: string) => {
  const url = `${getCommunityListURL}/${postId}`;

  return await base.get<IResponse<GetCommunityDetailResponse>>(url);
};
