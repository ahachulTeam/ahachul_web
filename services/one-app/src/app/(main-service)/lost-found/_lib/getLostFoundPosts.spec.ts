import { lostFoundQueryKeys } from '@ahhachul/domain';
import { API_PAGE_SIZE, API_PATHS } from '@ahhachul/http';

import { fetchClient } from '@/lib/fetch-client';
import { LostFoundType } from '@/types';

import {
  getLostFoundPosts,
  resolveLostType,
  resolveStationId,
  resolveSubwayLineIds,
} from './getLostFoundPosts';

jest.mock('@/lib/fetch-client', () => ({
  fetchClient: jest.fn(),
}));

const mockedFetchClient = jest.mocked(fetchClient);

describe('getLostFoundPosts', () => {
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

  it('전체 노선(0)은 subwayLineIds 파라미터에 포함하지 않는다', async () => {
    await getLostFoundPosts({
      queryKey: lostFoundQueryKeys.list(
        'category=ACQUIRE&subwayLineId=0&keyword=%20%EC%A7%80%EA%B0%91%20',
      ),
      pageParam: '',
    });

    expect(mockedFetchClient).toHaveBeenCalledWith(API_PATHS.lostFound.list, {
      params: {
        keyword: '지갑',
        pageSize: API_PAGE_SIZE.list,
        lostType: LostFoundType.ACQUIRE,
      },
      next: {
        tags: ['lost-found', 'posts'],
      },
    });
  });

  it('노선이 선택된 경우 subwayLineIds를 전달한다', async () => {
    await getLostFoundPosts({
      queryKey: lostFoundQueryKeys.list('category=LOST&subwayLineId=2'),
      pageParam: 'token-1',
    });

    expect(mockedFetchClient).toHaveBeenCalledWith(API_PATHS.lostFound.list, {
      params: {
        pageSize: API_PAGE_SIZE.list,
        pageToken: 'token-1',
        lostType: LostFoundType.LOST,
        subwayLineIds: '2',
      },
      next: {
        tags: ['lost-found', 'posts'],
      },
    });
  });

  it('역이 선택된 경우 stationId를 전달한다', async () => {
    await getLostFoundPosts({
      queryKey: lostFoundQueryKeys.list('category=LOST&subwayLineId=2&stationId=151'),
      pageParam: '',
    });

    expect(mockedFetchClient).toHaveBeenCalledWith(API_PATHS.lostFound.list, {
      params: {
        pageSize: API_PAGE_SIZE.list,
        lostType: LostFoundType.LOST,
        subwayLineIds: '2',
        stationId: 151,
      },
      next: {
        tags: ['lost-found', 'posts'],
      },
    });
  });
});

describe('getLostFoundPosts param resolvers', () => {
  it('lostType은 허용값만 통과시키고 나머지는 LOST로 고정한다', () => {
    expect(resolveLostType('ACQUIRE')).toBe(LostFoundType.ACQUIRE);
    expect(resolveLostType('LOST')).toBe(LostFoundType.LOST);
    expect(resolveLostType('invalid')).toBe(LostFoundType.LOST);
    expect(resolveLostType(null)).toBe(LostFoundType.LOST);
  });

  it('subwayLineId=0 또는 null이면 필터를 제외한다', () => {
    expect(resolveSubwayLineIds('0')).toBeUndefined();
    expect(resolveSubwayLineIds(null)).toBeUndefined();
    expect(resolveSubwayLineIds('-1')).toBeUndefined();
    expect(resolveSubwayLineIds('abc')).toBeUndefined();
    expect(resolveSubwayLineIds('2')).toBe('2');
  });

  it('stationId=0 또는 비정상 값이면 필터를 제외한다', () => {
    expect(resolveStationId('0')).toBeUndefined();
    expect(resolveStationId('-1')).toBeUndefined();
    expect(resolveStationId('abc')).toBeUndefined();
    expect(resolveStationId(null)).toBeUndefined();
    expect(resolveStationId('151')).toBe(151);
  });
});
