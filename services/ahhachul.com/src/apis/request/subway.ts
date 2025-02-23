import axiosInstance from '@/apis/fetcher';
import {
  ITrain,
  SubwayLineServerModel,
  WithSubwayLineId,
  WithSubwayStationId,
  type ApiResponse,
} from '@/types';

interface APITrainInfoParams extends WithSubwayLineId, WithSubwayStationId {}
interface APITrainInfoResponse {
  trainRealTimes: ITrain[];
}

export const fetchSubwayLines = async () =>
  await axiosInstance.get<ApiResponse<SubwayLineServerModel>>('/subway-lines');

export const fetchTrainInfo = (params: APITrainInfoParams) =>
  axiosInstance.get<ApiResponse<APITrainInfoResponse>>('/trains/real-times', { params });
