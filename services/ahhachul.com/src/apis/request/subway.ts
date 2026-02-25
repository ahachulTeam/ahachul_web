import axios from 'axios';

import { API_PATHS } from '@ahhachul/http';
import { sleep } from '@ahhachul/utils';

import axiosInstance from '@/apis/fetcher';
import {
  CurrentTrainArrivalType,
  DelayCenterOverviewPayload,
  DelayCenterOverviewQuery,
  DelayProofCreateRequest,
  DelayProofPayload,
  LastTrainRiskLevel,
  NearbyPlaceConfidenceLevel,
  QuickExitConfidenceLevel,
  RouteSearchStrategy,
  RouteWalkingPreference,
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
  walkingPreference?: RouteWalkingPreference;
  stationTimeWeekType?: StationTimeWeekType;
}

interface APIStationTimesFullV2Params extends WithSubwayLineId, WithSubwayStationId {}

interface APIStationWeatherBriefV2Params extends WithSubwayStationId {}

export type ForeignerLocale = 'ko' | 'en' | 'th' | 'cn';

interface APIForeignerStationGuideParams extends WithSubwayLineId, WithSubwayStationId {
  locale?: ForeignerLocale;
}

export interface APIForeignerStationGuideResponse {
  generatedAt: string;
  station: {
    stationId: number;
    subwayLineId: number;
    nameKo: string;
    nameLocalized: string;
    romanizedName: string;
    pronunciation: string;
    subwayLineNameKo: string;
    subwayLineNameLocalized: string;
    locale: ForeignerLocale;
  };
  templates: {
    complaintTitleTemplate: string;
    complaintBodyTemplate: string;
    lostTitleTemplate: string;
    lostBodyTemplate: string;
  };
  cultureGuide: {
    lastTrainTip: string;
    transferEtiquetteTip: string;
    safetyTip: string;
    emergencyPhrase: string;
  };
  supportedLocales: ForeignerLocale[];
}

interface APIForeignerStationSocialOverviewParams {
  stationId: number;
  subwayLineId?: number;
  locale?: ForeignerLocale;
  sameNationalityOnly?: boolean;
  nationalityCode?: string;
  limit?: number;
}

export interface APIForeignerStationSocialHotspotsResponse {
  generatedAt: string;
  locale: ForeignerLocale;
  hotspots: Array<{
    stationId: number;
    subwayLineId: number;
    stationNameKo: string;
    stationNameLocalized: string;
    lineNameLocalized: string;
    romanizedName: string;
    districtLabel: string;
    summary: string;
    contentTags: string[];
    upcomingMeetupCount: number;
    reviewCount: number;
  }>;
}

export interface APIForeignerStationSocialOverviewResponse {
  generatedAt: string;
  locale: ForeignerLocale;
  station: {
    stationId: number;
    subwayLineId: number;
    stationNameKo: string;
    stationNameLocalized: string;
    lineNameKo: string;
    lineNameLocalized: string;
    romanizedName: string;
    pronunciation: string;
    cultureTips: string[];
  };
  sameNationalityOnly: boolean;
  nationalityCode: string | null;
  calendar: Array<{
    date: string;
    meetupCount: number;
  }>;
  meetups: Array<{
    meetupId: number;
    title: string;
    description: string;
    meetupAt: string;
    maxParticipants: number;
    acceptedCount: number;
    hostMemberId: number;
    hostNickname: string;
    nationalityCode: string | null;
    sameNationalityOnly: boolean;
    status: string;
    mine: boolean;
    participants: Array<{
      participantId: number;
      memberId: number;
      nickname: string;
      nationalityCode: string | null;
      status: string;
      mine: boolean;
    }>;
  }>;
  reviewPosts: Array<{
    postId: number;
    title: string;
    preview: string;
    writer: string;
    createdAt: string;
  }>;
}

export interface APICreateForeignerStationSocialMeetupPayload {
  stationId: number;
  subwayLineId: number;
  title: string;
  description: string;
  meetupAt: string;
  maxParticipants: number;
  nationalityCode?: string;
  sameNationalityOnly: boolean;
}

export interface APICreateForeignerStationSocialMeetupResponse {
  meetupId: number;
  createdAt: string;
}

export interface APIJoinForeignerStationSocialMeetupPayload {
  introductionMessage?: string;
  nationalityCode?: string;
}

export interface APIJoinForeignerStationSocialMeetupResponse {
  meetupId: number;
  participantId: number;
  status: string;
}

export interface APIReviewForeignerStationSocialParticipantPayload {
  approve: boolean;
}

export interface APIReviewForeignerStationSocialParticipantResponse {
  meetupId: number;
  participantId: number;
  status: string;
}

export interface APIOpenForeignerStationSocialMatchPayload {
  targetMemberId: number;
  openingMessage?: string;
}

export interface APIOpenForeignerStationSocialMatchResponse {
  meetupId: number;
  targetMemberId: number;
  roomId: number;
  messageId: number;
}

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

export const fetchSubwayRouteSearchV3 = async (params: APISubwayRouteSearchV2Params) => {
  return axiosInstance.get<ApiResponse<SubwayRouteSearchResponse>>(API_PATHS.subway.routeSearchV3, {
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

export const fetchDelayCenterOverviewV2 = async (params: DelayCenterOverviewQuery) => {
  return axiosInstance.get<ApiResponse<DelayCenterOverviewPayload>>(
    API_PATHS.subway.delayCenterOverviewV2,
    {
      params,
    },
  );
};

export const createDelayProofV2 = async (payload: DelayProofCreateRequest) => {
  return axiosInstance.post<ApiResponse<DelayProofPayload>>(
    API_PATHS.subway.delayProofsV2,
    payload,
  );
};

export const fetchDelayProofV2 = async (proofId: string) => {
  return axiosInstance.get<ApiResponse<DelayProofPayload>>(API_PATHS.subway.delayProofV2(proofId));
};

export const fetchForeignerStationGuideV2 = async (params: APIForeignerStationGuideParams) => {
  return axiosInstance.get<ApiResponse<APIForeignerStationGuideResponse>>(
    API_PATHS.foreigner.stationGuideV2,
    {
      params,
    },
  );
};

export const fetchForeignerStationSocialHotspotsV2 = async (locale?: ForeignerLocale) => {
  return axiosInstance.get<ApiResponse<APIForeignerStationSocialHotspotsResponse>>(
    API_PATHS.foreigner.stationSocialHotspotsV2,
    {
      params: {
        ...(locale ? { locale } : {}),
      },
    },
  );
};

export const fetchForeignerStationSocialOverviewV2 = async (
  params: APIForeignerStationSocialOverviewParams,
) => {
  return axiosInstance.get<ApiResponse<APIForeignerStationSocialOverviewResponse>>(
    API_PATHS.foreigner.stationSocialOverviewV2,
    {
      params,
    },
  );
};

export const createForeignerStationSocialMeetupV2 = async (
  payload: APICreateForeignerStationSocialMeetupPayload,
) => {
  return axiosInstance.post<ApiResponse<APICreateForeignerStationSocialMeetupResponse>>(
    API_PATHS.foreigner.stationSocialMeetupsV2,
    payload,
  );
};

export const joinForeignerStationSocialMeetupV2 = async (
  meetupId: number,
  payload: APIJoinForeignerStationSocialMeetupPayload,
) => {
  return axiosInstance.post<ApiResponse<APIJoinForeignerStationSocialMeetupResponse>>(
    API_PATHS.foreigner.stationSocialMeetupJoinV2(meetupId),
    payload,
  );
};

export const reviewForeignerStationSocialParticipantV2 = async (
  meetupId: number,
  participantId: number,
  payload: APIReviewForeignerStationSocialParticipantPayload,
) => {
  return axiosInstance.patch<ApiResponse<APIReviewForeignerStationSocialParticipantResponse>>(
    API_PATHS.foreigner.stationSocialMeetupParticipantV2(meetupId, participantId),
    payload,
  );
};

export const openForeignerStationSocialMatchV2 = async (
  meetupId: number,
  payload: APIOpenForeignerStationSocialMatchPayload,
) => {
  return axiosInstance.post<ApiResponse<APIOpenForeignerStationSocialMatchResponse>>(
    API_PATHS.foreigner.stationSocialMeetupMatchV2(meetupId),
    payload,
  );
};
