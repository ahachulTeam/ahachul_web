import axios from 'axios';

import axiosInstance from '@/apis/fetcher';
import {
  ITrain,
  SubwayLineServerModel,
  WithSubwayLineId,
  WithSubwayStationId,
  type ApiResponse,
} from '@/types';

import { BASE_URL } from '../baseUrl';
import { API_PREFIX } from '../endpointPrefix';

interface APITrainInfoParams extends WithSubwayLineId, WithSubwayStationId {}
interface APITrainInfoResponse {
  trainRealTimes: ITrain[];
}

export const fetchSubwayLines = async () =>
  await axiosInstance.get<ApiResponse<SubwayLineServerModel>>('/subway-lines');

export const prefetchSubwayLines = async () =>
  await axios.get<ApiResponse<SubwayLineServerModel>>(
    `${BASE_URL.SERVER}${API_PREFIX}/subway-lines`,
  );

export const fetchTrainInfo = (params: APITrainInfoParams) =>
  axiosInstance.get<ApiResponse<APITrainInfoResponse>>('/trains/real-times', { params });
