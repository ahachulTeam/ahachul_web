import { beforeEach, describe, expect, it, vi } from 'vitest';

import { API_PATHS } from '@ahhachul/http';

import axiosInstance from '@/apis/fetcher';

import {
  createForeignerStationSocialMeetupV2,
  fetchForeignerStationSocialHotspotsV2,
  fetchForeignerStationSocialOverviewV2,
  joinForeignerStationSocialMeetupV2,
  openForeignerStationSocialMatchV2,
  reviewForeignerStationSocialParticipantV2,
} from './subway';

vi.mock('@/apis/fetcher', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

describe('foreigner station social v2 request', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('핫스팟 조회를 v2 foreigner hotspot 경로로 요청한다', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { result: {} } } as never);

    await fetchForeignerStationSocialHotspotsV2('en');

    expect(axiosInstance.get).toHaveBeenCalledWith(API_PATHS.foreigner.stationSocialHotspotsV2, {
      params: {
        locale: 'en',
      },
    });
  });

  it('상세 조회를 v2 foreigner overview 경로로 요청한다', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { result: {} } } as never);

    const params = {
      stationId: 201,
      subwayLineId: 2,
      locale: 'en' as const,
      sameNationalityOnly: true,
      nationalityCode: 'CN',
      limit: 30,
    };

    await fetchForeignerStationSocialOverviewV2(params);

    expect(axiosInstance.get).toHaveBeenCalledWith(API_PATHS.foreigner.stationSocialOverviewV2, {
      params,
    });
  });

  it('모임 생성을 v2 foreigner meetups 경로로 POST 한다', async () => {
    vi.mocked(axiosInstance.post).mockResolvedValue({ data: { result: {} } } as never);

    const payload = {
      stationId: 201,
      subwayLineId: 2,
      title: '명동 올리브영 쇼핑 메이트',
      description: '20:00에 만나서 같이 둘러봐요.',
      meetupAt: '2026-02-25T20:00:00',
      maxParticipants: 12,
      nationalityCode: 'CN',
      sameNationalityOnly: false,
    };

    await createForeignerStationSocialMeetupV2(payload);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      API_PATHS.foreigner.stationSocialMeetupsV2,
      payload,
    );
  });

  it('모임 참여 요청을 join 경로로 POST 한다', async () => {
    vi.mocked(axiosInstance.post).mockResolvedValue({ data: { result: {} } } as never);

    const meetupId = 77;
    const payload = {
      introductionMessage: '같이 명동 구경하고 싶어요.',
      nationalityCode: 'JP',
    };

    await joinForeignerStationSocialMeetupV2(meetupId, payload);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      API_PATHS.foreigner.stationSocialMeetupJoinV2(meetupId),
      payload,
    );
  });

  it('참여자 승인/거절 요청을 participant 경로로 PATCH 한다', async () => {
    vi.mocked(axiosInstance.patch).mockResolvedValue({ data: { result: {} } } as never);

    const meetupId = 77;
    const participantId = 12;
    const payload = {
      approve: true,
    };

    await reviewForeignerStationSocialParticipantV2(meetupId, participantId, payload);

    expect(axiosInstance.patch).toHaveBeenCalledWith(
      API_PATHS.foreigner.stationSocialMeetupParticipantV2(meetupId, participantId),
      payload,
    );
  });

  it('매칭 오픈 요청을 match 경로로 POST 한다', async () => {
    vi.mocked(axiosInstance.post).mockResolvedValue({ data: { result: {} } } as never);

    const meetupId = 77;
    const payload = {
      targetMemberId: 145,
    };

    await openForeignerStationSocialMatchV2(meetupId, payload);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      API_PATHS.foreigner.stationSocialMeetupMatchV2(meetupId),
      payload,
    );
  });
});
