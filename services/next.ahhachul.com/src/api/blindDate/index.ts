import { base } from '..';
import { IResponse, type ICommunityList as GetCommunityListResponse } from '@/src/types';
import { API_BASE_URL } from '@/src/data/api';

export const getBlindDateURL = `${API_BASE_URL}/blindDate`;

/**  커뮤니티 포스트 리스트 조회 */
export const getBlindList = async () => {
  const url = `${getBlindDateURL}`;

  return await base.get<IResponse<GetCommunityListResponse>>(url);
};
