import type { AnchorHTMLAttributes } from 'react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@/lib/test-utils';

import CommunityHotPosts from './CommunityHotPosts.component';

const mockUseAuth = vi.fn();
const mockUseFetchUserProfile = vi.fn();
const mockUseUserStationStore = vi.fn();
const mockFetchCommunityList = vi.fn();

vi.mock('@/contexts', () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock('@/services/user', () => ({
  useFetchUserProfile: () => mockUseFetchUserProfile(),
}));

vi.mock('@/stores/subway', () => ({
  useUserStationStore: (selector: (state: { userStations: unknown[] }) => unknown) =>
    selector(mockUseUserStationStore()),
}));

vi.mock('@/apis/request', () => ({
  fetchCommunityList: (...args: unknown[]) => mockFetchCommunityList(...args),
}));

vi.mock('@/components', () => ({
  UiComponent: {
    ListItem: () => <div>post-item</div>,
  },
}));

vi.mock('@/stackflow', () => ({
  StackFlow: {
    Link: ({
      children,
      activityName,
      activityParams,
      ...props
    }: AnchorHTMLAttributes<HTMLAnchorElement> & {
      activityName: string;
      activityParams: Record<string, unknown>;
    }) => (
      <a
        data-testid="stackflow-link"
        data-activity-name={activityName}
        data-activity-params={JSON.stringify(activityParams)}
        {...props}
      >
        {children}
      </a>
    ),
  },
}));

describe('CommunityHotPosts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      isCheckingAuthState: false,
      authService: { isAuthenticated: true },
    });
    mockUseFetchUserProfile.mockReturnValue({
      isLoading: false,
    });
    mockUseUserStationStore.mockReturnValue({
      userStations: [],
    });
    mockFetchCommunityList.mockResolvedValue({
      result: { data: [] },
    });
  });

  it('비로그인 상태에서 로그인 CTA를 렌더링한다', () => {
    mockUseAuth.mockReturnValue({
      isCheckingAuthState: false,
      authService: { isAuthenticated: false },
    });

    render(<CommunityHotPosts />);

    expect(screen.getByText('로그인 후 인기글을 빠르게 확인하세요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그인하기' })).toBeInTheDocument();
  });

  it('즐겨찾는 역이 없으면 명시적 fallback 문구를 렌더링한다', () => {
    render(<CommunityHotPosts />);

    expect(
      screen.getByText('즐겨찾는 역을 설정하면 역/호선 인기글을 맞춤으로 보여드려요.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '즐겨찾는 역 설정' })).toBeInTheDocument();
  });

  it('로그인 + 즐겨찾는 역 상태에서 역/호선 CTA 파라미터 계약을 유지한다', () => {
    mockUseUserStationStore.mockReturnValue({
      userStations: [
        {
          label: '회사',
          stationId: 557,
          stationName: '강남',
          subwayLineInfoList: [{ subwayLineId: '2', subwayLineName: '2호선' }],
        },
      ],
    });

    render(<CommunityHotPosts />);

    const links = screen.getAllByTestId('stackflow-link');
    const stationLink = links.find(
      link => link.getAttribute('data-activity-name') === 'CommunityStationPage',
    );
    const lineLink = links.find(
      link => link.getAttribute('data-activity-name') === 'CommunityLinePage',
    );

    expect(stationLink).toBeDefined();
    expect(stationLink).toHaveAttribute(
      'data-activity-params',
      JSON.stringify({
        stationId: 557,
        stationName: '강남',
        subwayLineId: 2,
        lineName: '2호선',
      }),
    );

    expect(lineLink).toBeDefined();
    expect(lineLink).toHaveAttribute(
      'data-activity-params',
      JSON.stringify({
        subwayLineId: 2,
        lineName: '2호선',
      }),
    );
  });

  it('역 데이터에 호선 정보가 누락되어도 런타임 오류 없이 fallback을 노출한다', () => {
    mockUseUserStationStore.mockReturnValue({
      userStations: [
        {
          label: '회사',
          stationId: 557,
          stationName: '강남',
          subwayLineInfoList: undefined,
        },
      ],
    });

    render(<CommunityHotPosts />);

    expect(
      screen.getByText('즐겨찾는 역을 설정하면 역/호선 인기글을 맞춤으로 보여드려요.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '즐겨찾는 역 설정' })).toBeInTheDocument();
  });
});
