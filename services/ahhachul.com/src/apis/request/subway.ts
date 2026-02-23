import axios from 'axios';

import { API_PATHS } from '@ahhachul/http';
import { sleep } from '@ahhachul/utils';

import axiosInstance from '@/apis/fetcher';
import {
  CurrentTrainArrivalType,
  LastTrainRiskLevel,
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

interface APITrainInfoV2Train {
  trainNo: string;
  upDownType: UpDownType;
  arrivalCode: string;
  etaSec: number;
  etaMinDisplay: number;
  destinationStationDirection: string;
  nextStationDirection: string;
}

interface APITrainInfoV2Response {
  generatedAt: string;
  dataSource: 'API' | 'STALE_CACHE';
  isStale: boolean;
  lastExternalRecptnAt: string;
  freshnessSec: number;
  confidenceLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  trainRealTimes: APITrainInfoV2Train[];
}

export interface APITrainInfoNormalizedResponse extends APITrainInfoResponse {
  generatedAt?: string;
  dataSource?: 'API' | 'STALE_CACHE';
  isStale?: boolean;
  lastExternalRecptnAt?: string;
  freshnessSec?: number;
  confidenceLevel?: 'HIGH' | 'MEDIUM' | 'LOW';
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

interface APILastTrainRiskV2Params extends WithSubwayLineId, WithSubwayStationId {
  upDownType: UpDownType;
  stationTimeWeekType: StationTimeWeekType;
  walkingMinutes: number;
}

export interface APILastTrainRiskV2Response {
  stationTimeWeekType: StationTimeWeekType;
  upDownType: UpDownType;
  walkingMinutes: number;
  nowAt: string;
  lastDepartureTime: string | null;
  minutesToLastTrain: number;
  isLastTrainRisk: boolean;
  riskLevel: LastTrainRiskLevel;
  message: string;
}

const isCurrentTrainArrivalType = (value: string): value is CurrentTrainArrivalType => {
  return Object.values(CurrentTrainArrivalType).includes(value as CurrentTrainArrivalType);
};

const toSafeTrainNumber = (trainNo: string): number => {
  const parsed = Number(trainNo);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const normalizeTrainInfoV2Response = (
  response: APITrainInfoV2Response,
): APITrainInfoNormalizedResponse => {
  return {
    generatedAt: response.generatedAt,
    dataSource: response.dataSource,
    isStale: response.isStale,
    lastExternalRecptnAt: response.lastExternalRecptnAt,
    freshnessSec: response.freshnessSec,
    confidenceLevel: response.confidenceLevel,
    trainRealTimes: response.trainRealTimes.map(train => ({
      trainNum: toSafeTrainNumber(train.trainNo),
      upDownType: train.upDownType,
      nextStationDirection: train.nextStationDirection,
      destinationStationDirection: train.destinationStationDirection,
      currentArrivalTime: train.etaMinDisplay,
      currentTrainArrivalCode: isCurrentTrainArrivalType(train.arrivalCode)
        ? train.arrivalCode
        : CurrentTrainArrivalType.RUNNING,
    })),
  };
};

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

export const fetchLastTrainRiskV2 = async (params: APILastTrainRiskV2Params) => {
  return axiosInstance.get<ApiResponse<APILastTrainRiskV2Response>>(
    API_PATHS.subway.stationLastTrainRiskV2,
    {
      params,
    },
  );
};
