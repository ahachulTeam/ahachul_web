import { complaintQueryKeys } from '@ahhachul/domain';
import { API_PAGE_SIZE, API_PATHS, API_SORT } from '@ahhachul/http';

import { fetchClient } from '@/lib/fetch-client';

import { getComplaintPosts, resolveStationId, resolveSubwayLineIds } from './getComplaintPosts';

jest.mock('@/lib/fetch-client', () => ({
  fetchClient: jest.fn(),
}));

const mockedFetchClient = jest.mocked(fetchClient);

describe('getComplaintPosts', () => {
  beforeEach(() => {
    mockedFetchClient.mockReset();
    mockedFetchClient.mockResolvedValue({
      code: '100',
      message: 'SUCCESS',
      result: {
        data: [],
        pageToken: null,
        hasNext: false,
      },
    });
  });

  it('라인/역 필터를 정규화해 complaint-posts에 전달한다', async () => {
    await getComplaintPosts({
      queryKey: complaintQueryKeys.list(
        'subwayLineId=2&stationId=151&keyword=%20%EC%97%B4%EC%B0%A8%20',
      ),
      pageParam: 'token-1',
    });

    expect(mockedFetchClient).toHaveBeenCalledWith(API_PATHS.complaint.list, {
      params: {
        keyword: '열차',
        subwayLineIds: '2',
        stationId: 151,
        pageSize: API_PAGE_SIZE.list,
        sort: API_SORT.createdAtDesc,
        pageToken: 'token-1',
      },
      next: {
        tags: ['complaint', 'posts'],
      },
    });
  });

  it('전체 노선/전체 역은 필터 파라미터에서 제거한다', async () => {
    await getComplaintPosts({
      queryKey: complaintQueryKeys.list('subwayLineId=0&stationId=0'),
      pageParam: '',
    });

    expect(mockedFetchClient).toHaveBeenCalledWith(API_PATHS.complaint.list, {
      params: {
        pageSize: API_PAGE_SIZE.list,
        sort: API_SORT.createdAtDesc,
      },
      next: {
        tags: ['complaint', 'posts'],
      },
    });
  });
});

describe('complaint filter resolvers', () => {
  it('subwayLineId는 0/비정상 값을 제거한다', () => {
    expect(resolveSubwayLineIds('0')).toBeUndefined();
    expect(resolveSubwayLineIds('-1')).toBeUndefined();
    expect(resolveSubwayLineIds('abc')).toBeUndefined();
    expect(resolveSubwayLineIds(null)).toBeUndefined();
    expect(resolveSubwayLineIds('2')).toBe('2');
  });

  it('stationId는 0/비정상 값을 제거한다', () => {
    expect(resolveStationId('0')).toBeUndefined();
    expect(resolveStationId('-1')).toBeUndefined();
    expect(resolveStationId('abc')).toBeUndefined();
    expect(resolveStationId(null)).toBeUndefined();
    expect(resolveStationId('151')).toBe(151);
  });
});
