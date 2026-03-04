import type { AnchorHTMLAttributes } from 'react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@/lib/test-utils';
import type { UserStation } from '@/types';

import Stations from './Stations.component';

const authState = {
  isCheckingAuthState: false,
  isAuthenticated: true,
};

const stationStoreState = {
  userStations: [] as UserStation[],
  setUserStations: vi.fn(),
};

const subwayLineFilterSpy = vi.fn();
const trainRealTimesSpy = vi.fn();

vi.mock('@/contexts', () => ({
  useAuth: () => ({
    isCheckingAuthState: authState.isCheckingAuthState,
    authService: { isAuthenticated: authState.isAuthenticated },
  }),
}));

vi.mock('@/stackflow', () => ({
  StackFlow: {
    Link: ({ children }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a data-testid="stackflow-link">{children}</a>
    ),
  },
}));

vi.mock('@/stores/subway', () => ({
  useUserStationStore: (selector: (state: typeof stationStoreState) => unknown) =>
    selector(stationStoreState),
}));

vi.mock('./subwayLineFilter/SubwayLineFilter.component', () => ({
  default: (props: {
    userStations: UserStation[];
    currentStation: UserStation;
    setUserStations: (value: UserStation[]) => void;
  }) => {
    subwayLineFilterSpy(props);
    return <div data-testid="subway-line-filter">SubwayLineFilter</div>;
  },
}));

vi.mock('./trainRealTimes/TrainRealTimes.component', () => ({
  default: (props: Record<string, unknown>) => {
    trainRealTimesSpy(props);
    return <div data-testid="train-real-times">TrainRealTimes</div>;
  },
}));

describe('Stations', () => {
  beforeEach(() => {
    authState.isCheckingAuthState = false;
    authState.isAuthenticated = true;
    stationStoreState.userStations = [];
    stationStoreState.setUserStations = vi.fn();
    subwayLineFilterSpy.mockReset();
    trainRealTimesSpy.mockReset();
  });

  it('비로그인 상태에서는 명시적 안내 카드와 전체 노선도 CTA를 렌더링한다', () => {
    authState.isAuthenticated = false;

    render(<Stations />);

    expect(screen.getByText('로그인하면 내 역 실시간 정보를 바로 확인할 수 있어요.')).toBeVisible();
    expect(screen.getByRole('button', { name: '전체 노선도 보기' })).toBeVisible();
    expect(screen.queryByTestId('train-real-times')).not.toBeInTheDocument();
  });

  it('즐겨찾는 역이 없으면 역 설정 fallback을 렌더링한다', () => {
    authState.isAuthenticated = true;
    stationStoreState.userStations = [];

    render(<Stations />);

    expect(screen.getByText('즐겨찾는 역 설정이 필요해요.')).toBeVisible();
    expect(screen.getByRole('button', { name: '즐겨찾는 역 설정' })).toBeVisible();
  });

  it('호선 정보가 없으면 실시간 정보 준비 안내 fallback을 렌더링한다', () => {
    stationStoreState.userStations = [
      {
        label: '회사',
        stationId: 557,
        stationName: '강남',
        subwayLineInfoList: [],
      },
    ];

    render(<Stations />);

    expect(screen.getByText('실시간 정보가 아직 준비되지 않았어요.')).toBeVisible();
    expect(screen.getByRole('button', { name: '전체 노선도 보기' })).toBeVisible();
  });

  it('역/호선 정보가 있으면 필터와 실시간 카드 영역을 렌더링한다', () => {
    stationStoreState.userStations = [
      {
        label: '회사',
        stationId: 557,
        stationName: '강남',
        subwayLineInfoList: [{ subwayLineId: '2', subwayLineName: '2호선' }],
      },
    ];

    render(<Stations />);

    expect(screen.getByTestId('subway-line-filter')).toBeVisible();
    expect(screen.getByTestId('train-real-times')).toBeVisible();
    expect(subwayLineFilterSpy).toHaveBeenCalled();
    expect(trainRealTimesSpy).toHaveBeenCalled();

    const latestTrainRealTimesProps = trainRealTimesSpy.mock.calls.at(-1)?.[0] as Record<
      string,
      unknown
    >;
    expect(latestTrainRealTimesProps).toMatchObject({
      stationId: 557,
      stationName: '강남',
      subwayLineId: '2',
      subwayLineName: '2호선',
    });
  });
});
