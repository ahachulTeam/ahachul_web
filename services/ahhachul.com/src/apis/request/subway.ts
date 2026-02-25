import axios from 'axios';

import { API_PATHS } from '@ahhachul/http';
import { sleep } from '@ahhachul/utils';

import axiosInstance from '@/apis/fetcher';
import {
  CurrentTrainArrivalType,
  LastTrainRiskLevel,
  NearbyPlaceConfidenceLevel,
  QuickExitConfidenceLevel,
  RouteSearchStrategy,
  ITrain,
  StationTimeWeekType,
  StationTimesFullResponse,
  SubwayRouteSearchResponse,
  StationWeatherBriefResponse,
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

interface APIQuickExitsV2Params extends WithSubwayLineId, WithSubwayStationId {
  upDownType: UpDownType;
}

export interface APIQuickExitsV2Response {
  stationId: number;
  subwayLineId: number;
  upDownType: UpDownType;
  recommendations: {
    carNo: string;
    exitNo: string;
    directionHint: string;
    walkingBenefitMinutes: number;
    confidenceLevel: QuickExitConfidenceLevel;
  }[];
}

interface APINearbyPlacesV2Params extends WithSubwayLineId, WithSubwayStationId {
  exitNo?: string;
  limit?: number;
}

interface APISubwayRouteSearchV2Params {
  sourceStationId: number;
  destinationStationId: number;
  strategy: RouteSearchStrategy;
  alternatives?: number;
}

interface APIStationTimesFullV2Params extends WithSubwayLineId, WithSubwayStationId {}

interface APIStationWeatherBriefV2Params extends WithSubwayStationId {}

export interface APINearbyPlacesV2Response {
  stationId: number;
  subwayLineId: number;
  exitNo?: string | null;
  places: {
    name: string;
    category: string;
    walkingMinutes: number;
    openNow: boolean;
    supportsEnglishMenu: boolean;
    confidenceLevel: NearbyPlaceConfidenceLevel;
  }[];
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

export const fetchQuickExitsV2 = async (params: APIQuickExitsV2Params) => {
  return axiosInstance.get<ApiResponse<APIQuickExitsV2Response>>(
    API_PATHS.subway.stationQuickExitsV2,
    {
      params,
    },
  );
};

export const fetchNearbyPlacesV2 = async (params: APINearbyPlacesV2Params) => {
  return axiosInstance.get<ApiResponse<APINearbyPlacesV2Response>>(
    API_PATHS.subway.stationNearbyPlacesV2,
    {
      params,
    },
  );
};

export const fetchStationWeatherBriefV2 = async (params: APIStationWeatherBriefV2Params) => {
  return axiosInstance.get<ApiResponse<StationWeatherBriefResponse>>(
    API_PATHS.subway.stationWeatherBriefV2,
    {
      params,
    },
  );
};

export const fetchSubwayRouteSearchV2 = async (params: APISubwayRouteSearchV2Params) => {
  return axiosInstance.get<ApiResponse<SubwayRouteSearchResponse>>(API_PATHS.subway.routeSearchV2, {
    params,
  });
};

export const fetchStationTimesFullV2 = async (params: APIStationTimesFullV2Params) => {
  return axiosInstance.get<ApiResponse<StationTimesFullResponse>>(
    API_PATHS.subway.stationTimesFullV2,
    {
      params,
    },
  );
};
