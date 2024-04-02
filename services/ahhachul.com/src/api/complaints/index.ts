import { base } from 'api';
import { API_BASE_URL } from 'data/api';
import { IResponse } from 'types';
import { IComplaintForm } from 'types/complaints';

export const getComplaintsURL = `${API_BASE_URL}/complaints/messages`;

/**  민원 생성  */
export const post = async (body: IComplaintForm) => {
  return await base.post<IResponse<null>>(getComplaintsURL, body);
};
