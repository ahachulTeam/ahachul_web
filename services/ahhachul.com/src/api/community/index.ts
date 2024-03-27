import queryString from 'query-string';

import { base } from 'api';
import {
  IResponse,
  type ICommunityParams as GetCommunityListRequestParams,
  type ICommunityList as GetCommunityListResponse,
} from 'types';
import { API_BASE_URL } from 'data/api';

export const getCommunityListURL = `${API_BASE_URL}/community-posts`;

/**  분실물, 유실물 리스트 조회 */
export const getCommunityList = async (params: GetCommunityListRequestParams) => {
  const queryParams = queryString.stringify(params);

  const url = `${getCommunityListURL}?${queryParams}`;

  return await base.get<IResponse<GetCommunityListResponse>>(url);
};
