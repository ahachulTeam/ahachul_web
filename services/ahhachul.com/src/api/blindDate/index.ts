import { base } from 'api';
import { IResponse, type ICommunityList as GetCommunityListResponse } from 'types';
import { API_BASE_URL } from 'data/api';

export const getBlindDateURL = `${API_BASE_URL}/blindDate`;

/**  커뮤니티 포스트 리스트 조회 */
export const getBlindList = async () => {
  const url = `${getBlindDateURL}`;

  return await base.get<IResponse<GetCommunityListResponse>>(url);
};
