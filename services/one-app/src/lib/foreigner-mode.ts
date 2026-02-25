import { API_PATHS } from '@ahhachul/http';

import type {
  ApiResponse,
  CreateForeignerStationSocialMeetupPayload,
  CreateForeignerStationSocialMeetupResult,
  ForeignerStationSocialHotspots,
  ForeignerStationSocialOverview,
  ForeignerCommunityPostTranslation,
  ForeignerLocale,
  ForeignerStationGuide,
  JoinForeignerStationSocialMeetupPayload,
  JoinForeignerStationSocialMeetupResult,
  OpenForeignerStationSocialMatchPayload,
  OpenForeignerStationSocialMatchResult,
  ReviewForeignerStationSocialParticipantPayload,
  ReviewForeignerStationSocialParticipantResult,
} from '@/types';

import { fetchClient } from './fetch-client';

type FetchForeignerStationGuideParams = {
  stationId: number;
  subwayLineId: number;
  locale?: ForeignerLocale;
};

export async function fetchForeignerStationGuideV2(
  params: FetchForeignerStationGuideParams,
): Promise<ForeignerStationGuide> {
  const response = await fetchClient<ApiResponse<ForeignerStationGuide>>(
    API_PATHS.foreigner.stationGuideV2,
    {
      params: {
        stationId: params.stationId,
        subwayLineId: params.subwayLineId,
        ...(params.locale ? { locale: params.locale } : {}),
      },
    },
  );

  return response.result;
}

export async function fetchForeignerCommunityPostTranslationV2(
  postId: number,
  targetLocale?: ForeignerLocale,
): Promise<ForeignerCommunityPostTranslation> {
  const response = await fetchClient<ApiResponse<ForeignerCommunityPostTranslation>>(
    API_PATHS.foreigner.communityPostTranslationV2(postId),
    {
      params: {
        ...(targetLocale ? { targetLocale } : {}),
      },
    },
  );

  return response.result;
}

type FetchForeignerStationSocialOverviewParams = {
  stationId: number;
  subwayLineId?: number;
  locale?: ForeignerLocale;
  sameNationalityOnly?: boolean;
  nationalityCode?: string;
  limit?: number;
};

export async function fetchForeignerStationSocialHotspotsV2(
  locale?: ForeignerLocale,
): Promise<ForeignerStationSocialHotspots> {
  const response = await fetchClient<ApiResponse<ForeignerStationSocialHotspots>>(
    API_PATHS.foreigner.stationSocialHotspotsV2,
    {
      params: {
        ...(locale ? { locale } : {}),
      },
    },
  );

  return response.result;
}

export async function fetchForeignerStationSocialOverviewV2(
  params: FetchForeignerStationSocialOverviewParams,
): Promise<ForeignerStationSocialOverview> {
  const response = await fetchClient<ApiResponse<ForeignerStationSocialOverview>>(
    API_PATHS.foreigner.stationSocialOverviewV2,
    {
      params: {
        stationId: params.stationId,
        ...(params.subwayLineId ? { subwayLineId: params.subwayLineId } : {}),
        ...(params.locale ? { locale: params.locale } : {}),
        ...(params.sameNationalityOnly ? { sameNationalityOnly: true } : {}),
        ...(params.nationalityCode ? { nationalityCode: params.nationalityCode } : {}),
        ...(params.limit ? { limit: params.limit } : {}),
      },
    },
  );

  return response.result;
}

export async function createForeignerStationSocialMeetupV2(
  payload: CreateForeignerStationSocialMeetupPayload,
): Promise<CreateForeignerStationSocialMeetupResult> {
  const response = await fetchClient<ApiResponse<CreateForeignerStationSocialMeetupResult>>(
    API_PATHS.foreigner.stationSocialMeetupsV2,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );

  return response.result;
}

export async function joinForeignerStationSocialMeetupV2(
  meetupId: number,
  payload: JoinForeignerStationSocialMeetupPayload,
): Promise<JoinForeignerStationSocialMeetupResult> {
  const response = await fetchClient<ApiResponse<JoinForeignerStationSocialMeetupResult>>(
    API_PATHS.foreigner.stationSocialMeetupJoinV2(meetupId),
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );

  return response.result;
}

export async function reviewForeignerStationSocialParticipantV2(
  meetupId: number,
  participantId: number,
  payload: ReviewForeignerStationSocialParticipantPayload,
): Promise<ReviewForeignerStationSocialParticipantResult> {
  const response = await fetchClient<ApiResponse<ReviewForeignerStationSocialParticipantResult>>(
    API_PATHS.foreigner.stationSocialMeetupParticipantV2(meetupId, participantId),
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
  );

  return response.result;
}

export async function openForeignerStationSocialMatchV2(
  meetupId: number,
  payload: OpenForeignerStationSocialMatchPayload,
): Promise<OpenForeignerStationSocialMatchResult> {
  const response = await fetchClient<ApiResponse<OpenForeignerStationSocialMatchResult>>(
    API_PATHS.foreigner.stationSocialMeetupMatchV2(meetupId),
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );

  return response.result;
}
