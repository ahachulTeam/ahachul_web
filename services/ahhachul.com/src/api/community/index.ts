import queryString from 'query-string';

import { base } from 'api';
import {
  IResponse,
  type ICommunityParams as GetCommunityListRequestParams,
  type ICommunityList as GetCommunityListResponse,
  type ICommunityDetail as GetCommunityDetailResponse,
  ICommunityArticleForm,
} from 'types';
import { API_BASE_URL } from 'data/api';

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
  return await base.post<IResponse<Partial<GetCommunityDetailResponse>>>(getCommunityURL, body);
};
