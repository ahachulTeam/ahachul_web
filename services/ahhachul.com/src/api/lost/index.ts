import queryString from 'query-string';

import { base } from 'api';
import { IResponse, type ILostParams as GetLostListRequestParams, type ILostList as GetLostListResponse } from 'types';
import { API_BASE_URL } from 'data/api';

export const getLostListURL = `${API_BASE_URL}/lost-posts`;

/**  분실물, 유실물 리스트 조회 */
export const getLostList = async (params: GetLostListRequestParams) => {
  const queryParams = queryString.stringify(params);

  const url = `${getLostListURL}?${queryParams}`;

  return await base.get<IResponse<GetLostListResponse>>(url);
};
