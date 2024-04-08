import queryString from 'query-string';

import { base } from '..';
import { API_BASE_URL } from '@/src/data/api';
import { IResponse } from '@/src/types';
import { IComplaintForm } from '@/src/types/complaints';
import type {
  IComplaintDetail as GetComplaintDetailResponse,
  IComplaintList as GetComplaintListResponse,
  IComplaintParams as GetComplaintListParams,
} from '@/src/types';

export const getComplaintURL = `${API_BASE_URL}/complaints`;
export const getComplaintsPostURL = `${API_BASE_URL}/complaints/messages`;

/**  커뮤니티 포스트 리스트 조회 */
export const getComplaintList = async (params: GetComplaintListParams) => {
  const queryParams = queryString.stringify(params);

  const url = `${getComplaintURL}?${queryParams}`;

  return await base.get<IResponse<GetComplaintListResponse>>(url);
};

/** 민원 상세 조회 */
export const getComplaintDetail = async (postId: string) => {
  const url = `${getComplaintURL}/${postId}`;

  return await base.get<IResponse<GetComplaintDetailResponse>>(url);
};

/** 민원 생성  */
export const post = async (body: IComplaintForm) => {
  return await base.post<IResponse<null>>(getComplaintsPostURL, body);
};
