import axios from 'axios';

import { API_PATHS } from '@ahhachul/http';
import { sleep } from '@ahhachul/utils';

import axiosInstance from '@/apis/fetcher';
import {
  ITrain,
  StationTimeWeekType,
  SubwayLineServerModel,
  UpDownType,
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

interface APITrainInfoV2Response {
  generatedAt: string;
  dataSource: 'API' | 'STALE_CACHE';
  isStale: boolean;
  lastExternalRecptnAt: string;
  freshnessSec: number;
  confidenceLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  trainRealTimes: ITrain[];
}

interface APIStationTimeSummaryParams extends WithSubwayLineId, WithSubwayStationId {
  stationTimeWeekType: StationTimeWeekType;
}

export interface APIStationTimeSummaryV2Response {
  stationTimeWeekType: StationTimeWeekType;
  summaries: {
    upDownType: UpDownType;
    firstDepartureTime: string | null;
    lastDepartureTime: string | null;
    firstDestinationStationName: string | null;
    lastDestinationStationName: string | null;
  }[];
}

export const fetchSubwayLines = async () =>
  await axiosInstance.get<ApiResponse<SubwayLineServerModel>>(API_PATHS.subway.lines);

export const prefetchSubwayLines = async () =>
  await axios.get<ApiResponse<SubwayLineServerModel>>(
    `${BASE_URL.SERVER}${API_PREFIX}${API_PATHS.subway.lines}`,
  );

export const fetchTrainInfo = async (params: APITrainInfoParams) => {
  await sleep(400);
  return axiosInstance.get<ApiResponse<APITrainInfoResponse>>(API_PATHS.subway.trainRealTimes, {
    params,
  });
};

export const fetchTrainInfoV2 = async (params: APITrainInfoParams) => {
  return axiosInstance.get<ApiResponse<APITrainInfoV2Response>>(API_PATHS.subway.trainRealTimesV2, {
    params,
  });
};

export const fetchStationTimeSummaryV2 = async (params: APIStationTimeSummaryParams) => {
  return axiosInstance.get<ApiResponse<APIStationTimeSummaryV2Response>>(
    API_PATHS.subway.stationTimeSummaryV2,
    {
      params,
    },
  );
};
