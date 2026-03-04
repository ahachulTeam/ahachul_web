import type { HTMLAttributes, SVGProps } from 'react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen, userEvent } from '@/lib/test-utils';
import {
  CurrentTrainArrivalType,
  LastTrainRiskLevel,
  NearbyPlaceConfidenceLevel,
  QuickExitConfidenceLevel,
  StationSummaryAvailabilityStatus,
  StationSummaryDataSource,
  StationWeatherDataSource,
  UpDownType,
  type UserStation,
} from '@/types';

import TrainRealTimes from './TrainRealTimes.component';

const mockUseFlow = vi.fn();
const mockUseUserStationStore = vi.fn();

const mockUseFetchTrainInfo = vi.fn();
const mockUseFetchStationTimesSummary = vi.fn();
const mockUseFetchLastTrainRisk = vi.fn();
const mockUseFetchQuickExits = vi.fn();
const mockUseFetchNearbyPlaces = vi.fn();
const mockUseFetchStationWeatherBrief = vi.fn();

vi.mock('@/stackflow', () => ({
  useFlow: () => mockUseFlow(),
}));

vi.mock('@/stores/subway', () => ({
  useUserStationStore: (selector: (state: { userStations: UserStation[] }) => unknown) =>
    mockUseUserStationStore(selector),
}));

vi.mock('@/services/subway', () => ({
  useFetchTrainInfo: (params: { stationId: number; subwayLineId: string }) =>
    mockUseFetchTrainInfo(params),
  useFetchStationTimesSummary: (params: {
    stationId: number;
    subwayLineId: string;
    stationTimeWeekType: string;
  }) => mockUseFetchStationTimesSummary(params),
  useFetchLastTrainRisk: (params: {
    stationId: number;
    subwayLineId: string;
    upDownType: UpDownType;
    stationTimeWeekType: string;
  }) => mockUseFetchLastTrainRisk(params),
  useFetchQuickExits: (params: {
    stationId: number;
    subwayLineId: string;
    upDownType: UpDownType;
  }) => mockUseFetchQuickExits(params),
  useFetchNearbyPlaces: (params: { stationId: number; subwayLineId: string; limit: number }) =>
    mockUseFetchNearbyPlaces(params),
  useFetchStationWeatherBrief: (params: { stationId: number }) =>
    mockUseFetchStationWeatherBrief(params),
}));

vi.mock('@/components', () => ({
  UiComponent: {
    SpinnerIcon: (props: SVGProps<SVGSVGElement>) => <svg data-testid="spinner-icon" {...props} />,
  },
}));

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

vi.mock('@/assets/icons/system', async importOriginal => {
  const actual = await importOriginal<typeof import('@/assets/icons/system')>();

  return {
    ...actual,
    RetryIcon: (props: SVGProps<SVGSVGElement>) => <svg data-testid="retry-icon" {...props} />,
  };
});

vi.mock('../trainArrivals/TrainArrivals.component', () => ({
  default: ({ trainRealTimes }: { trainRealTimes: unknown[] }) => (
    <div data-testid="train-arrivals">arrivals: {trainRealTimes.length}</div>
  ),
}));

vi.mock('../upDownFilter/UpDownFilter.component', () => ({
  default: ({ sort, handleSort }: { sort: UpDownType; handleSort: () => void }) => (
    <button type="button" onClick={handleSort}>
      정렬: {sort}
    </button>
  ),
}));

describe('TrainRealTimes', () => {
  const push = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseFlow.mockReturnValue({ push });
    mockUseUserStationStore.mockImplementation(
      (selector: (state: { userStations: UserStation[] }) => unknown) =>
        selector({
          userStations: [
            {
              label: '회사',
              stationId: 557,
              stationName: '강남',
              subwayLineInfoList: [{ subwayLineId: '2', subwayLineName: '2호선' }],
            },
          ],
        }),
    );

    mockUseFetchTrainInfo.mockReturnValue({
      data: {
        confidenceLevel: 'HIGH',
        freshnessSec: 12,
        isStale: false,
        trainRealTimes: [
          {
            trainNum: 1001,
            upDownType: UpDownType.UP,
            nextStationDirection: '신촌방면',
            destinationStationDirection: '신촌행',
            currentArrivalTime: 2,
            currentTrainArrivalCode: CurrentTrainArrivalType.ARRIVE,
          },
        ],
      },
      isFetching: false,
      isError: false,
      refetch: vi.fn(),
    });

    mockUseFetchStationTimesSummary.mockReturnValue({
      data: {
        summaries: [
          {
            upDownType: UpDownType.UP,
            firstDepartureTime: '05:12:00',
            lastDepartureTime: '23:55:00',
            firstDestinationStationName: '시청',
            lastDestinationStationName: '서울역',
          },
          {
            upDownType: UpDownType.DOWN,
            firstDepartureTime: '05:16:00',
            lastDepartureTime: '23:57:00',
            firstDestinationStationName: '잠실',
            lastDestinationStationName: '성수',
          },
        ],
        meta: {
          generatedAt: '2026-03-04T12:00:00.000Z',
          availabilityStatus: StationSummaryAvailabilityStatus.AVAILABLE,
          coveragePercent: 100,
          guidanceMessage: '',
          sourceDetails: [
            {
              upDownType: UpDownType.UP,
              dataSource: StationSummaryDataSource.API,
              stationTimesCount: 2,
              fallbackReasonCode: null,
            },
          ],
        },
      },
      isFetching: false,
    });

    mockUseFetchLastTrainRisk.mockReturnValue({
      data: null,
      isFetching: false,
    });

    mockUseFetchQuickExits.mockReturnValue({
      data: {
        recommendations: [
          {
            carNo: '3',
            exitNo: '5',
            directionHint: '왼쪽',
            walkingBenefitMinutes: 2,
            confidenceLevel: QuickExitConfidenceLevel.HIGH,
          },
        ],
      },
      isFetching: false,
    });

    mockUseFetchNearbyPlaces.mockReturnValue({
      data: {
        places: [
          {
            name: '역앞 편의점',
            category: '편의점',
            walkingMinutes: 2,
            openNow: true,
            operatingHours: '24시간',
            crowdLevel: 'LOW',
            crowdUpdatedAt: '2026-03-04T12:00:00.000Z',
            supportsEnglishMenu: true,
            confidenceLevel: NearbyPlaceConfidenceLevel.HIGH,
            poiAccuracyScore: 95,
            poiAccuracyReason: 'live',
          },
        ],
      },
      isFetching: false,
    });

    mockUseFetchStationWeatherBrief.mockReturnValue({
      data: {
        stationId: 557,
        stationName: '강남',
        generatedAt: '2026-03-04T12:00:00.000Z',
        dataSource: StationWeatherDataSource.API,
        isStale: false,
        summaryText: '맑고 온화해요.',
        cautionText: '미세먼지는 보통 수준입니다.',
        friendlyText: '가벼운 겉옷을 챙겨보세요.',
        temperatureC: 11,
        apparentTemperatureC: 10,
        precipitationMm: 0,
        windSpeedMps: 2,
        weatherCode: 1,
        weatherLabel: '맑음',
      },
      isFetching: false,
    });
  });

  it('전체 시간표 버튼은 SubwayTimelinePage로 숫자형 line id를 전달한다', async () => {
    render(<TrainRealTimes stationId={557} stationName="강남" subwayLineId="2" />);

    await userEvent.click(screen.getByRole('button', { name: '전체 시간표' }));

    expect(push).toHaveBeenCalledWith('SubwayTimelinePage', {
      stationId: 557,
      subwayLineId: 2,
      stationName: '강남',
    });
  });

  it('시간표 소스가 fallback empty이면 일시 지연 상태와 안내 문구를 노출한다', () => {
    mockUseFetchStationTimesSummary.mockReturnValue({
      data: {
        summaries: [
          {
            upDownType: UpDownType.UP,
            firstDepartureTime: null,
            lastDepartureTime: null,
            firstDestinationStationName: null,
            lastDestinationStationName: null,
          },
          {
            upDownType: UpDownType.DOWN,
            firstDepartureTime: null,
            lastDepartureTime: null,
            firstDestinationStationName: null,
            lastDestinationStationName: null,
          },
        ],
        meta: {
          generatedAt: '2026-03-04T12:00:00.000Z',
          availabilityStatus: StationSummaryAvailabilityStatus.EMPTY,
          coveragePercent: 0,
          guidanceMessage: '시간표 데이터 지연으로 기본 안내만 표시합니다.',
          sourceDetails: [
            {
              upDownType: UpDownType.UP,
              dataSource: StationSummaryDataSource.FALLBACK_EMPTY,
              stationTimesCount: 0,
              fallbackReasonCode: 'upstream-delay',
            },
          ],
        },
      },
      isFetching: false,
    });

    render(<TrainRealTimes stationId={557} stationName="강남" subwayLineId="2" />);

    expect(screen.getByText('일시 지연')).toBeInTheDocument();
    expect(screen.getByText('시간표 데이터 지연으로 기본 안내만 표시합니다.')).toBeInTheDocument();
  });

  it('막차 리스크가 있으면 배지/문구/기준 역 정보를 함께 렌더링한다', () => {
    mockUseFetchLastTrainRisk.mockReturnValue({
      data: {
        stationTimeWeekType: 'WEEKDAY',
        upDownType: UpDownType.UP,
        walkingMinutes: 8,
        walkingMinutesSource: 'DEFAULT',
        walkingMinutesUpdatedAt: null,
        nowAt: '2026-03-04T12:00:00',
        lastDepartureTime: '23:59',
        minutesToLastTrain: 5,
        isLastTrainRisk: true,
        riskLevel: LastTrainRiskLevel.WARN,
        message: '막차까지 얼마 남지 않았어요.',
      },
      isFetching: false,
    });

    render(<TrainRealTimes stationId={557} stationName="강남" subwayLineId="2" />);

    expect(screen.getByText('막차 임박')).toBeInTheDocument();
    expect(screen.getByText('막차까지 5분')).toBeInTheDocument();
    expect(screen.getByText('기준: 기본값')).toBeInTheDocument();
    expect(
      screen.getByText('마이페이지에서 집/회사 주소를 설정하면 도보 시간이 자동 보정됩니다.'),
    ).toBeInTheDocument();
    expect(screen.getByText('회사 기준 자동 계산')).toBeInTheDocument();
  });
});
