import { base } from 'api';
import { API_BASE_URL } from 'data/api';
import { IResponse } from 'types';
import { IComplaintForm } from 'types/complaints';
import type { IComplaint as GetComplainDetailResponse } from 'types';

export const getComplaintsURL = `${API_BASE_URL}/complaints/messages`;
export const getComplaintDetailURL = `${API_BASE_URL}/complaints`;

/** 민원 생성  */
export const post = async (body: IComplaintForm) => {
  return await base.post<IResponse<null>>(getComplaintsURL, body);
};

/** 민원 상세 조회 */
export const getComplaintDetail = async (postId: string) => {
  const url = `${getComplaintDetailURL}/${postId}`;

  return await base.get<IResponse<GetComplainDetailResponse>>(url);
};
