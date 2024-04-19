import queryString from 'query-string';

import { base } from '..';
import {
  IResponse,
  type ITrainParams as GetTrainsRealTimeInfoRequestParams,
  type ITrainCongestionParams as GetTrainCongestionInfoRequestParams,
  ITrainRealTimeInfo,
  ITrainCongestionInfo,
} from '@/src/types';
import { API_BASE_URL } from '@/src/data/api';

export const getTrainURL = `${API_BASE_URL}/trains/real-times`;

/** 특정 정류장 열차 실시간 데이터 조회 */
export const getTrainsRealTimeInfo = async (params: GetTrainsRealTimeInfoRequestParams) => {
  const queryParams = queryString.stringify(params);

  const url = `${getTrainURL}?${queryParams}`;

  return await base.get<IResponse<ITrainRealTimeInfo>>(url);
};

/** 열차 혼잡도 */
export const getTrainCongestionInfo = async (params: GetTrainCongestionInfoRequestParams) => {
  const queryParams = queryString.stringify(params);

  const url = `${getTrainURL}/congestion?${queryParams}`;

  return await base.get<IResponse<ITrainCongestionInfo>>(url);
};
