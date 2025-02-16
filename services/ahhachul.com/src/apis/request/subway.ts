import axiosInstance from '@/apis/fetcher';
import { ITrain, WithSubwayLineId, WithSubwayStationId, type ApiResponse } from '@/types';

interface APITrainInfoParams extends WithSubwayLineId, WithSubwayStationId {}
interface APITrainInfoResponse {
  trainRealTimes: ITrain[];
}

export const fetchTrainInfo = (params: APITrainInfoParams) =>
  axiosInstance.get<ApiResponse<APITrainInfoResponse>>('/trains/real-times', { params });
