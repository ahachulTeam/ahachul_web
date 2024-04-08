import queryString from 'query-string';

import { base } from 'api';
import {
  IResponse,
  type ILostParams as GetLostListRequestParams,
  type ILostList as GetLostListResponse,
  type ILostDetail as GetLostDetailResponse,
  ILostArticleForm,
} from 'types';
import { API_BASE_URL } from 'data/api';

export const getLostURL = `${API_BASE_URL}/lost-posts`;

/**  분실물, 유실물 리스트 조회  => !!실제 백엔드 연동 중!! */
export const getLostList = async (params: GetLostListRequestParams) => {
  const queryParams = queryString.stringify(params);

  const url = `${process.env.REACT_APP_BASE_URL}/lost-posts?${queryParams}`;

  return await base.get<IResponse<GetLostListResponse>>(url);
};

/**  커뮤니티 포스트 상세 조회 */
export const getLostDetail = async (postId: string) => {
  const url = `${getLostURL}/${postId}`;

  return await base.get<IResponse<GetLostDetailResponse>>(url);
};

/**  유실물 포스트 생성  */
export const post = async (body: ILostArticleForm) => {
  return await base.post<IResponse<Partial<GetLostDetailResponse>>>(getLostURL, body);
};
