import { communityQueryKeys } from '@ahhachul/domain';
import { API_PAGE_SIZE, API_PATHS, API_SORT } from '@ahhachul/http';

import { fetchClient } from '@/lib/fetch-client';
import { CommunityType } from '@/types/community';

import {
  getCommunityPosts,
  resolveCommunityCategory,
  resolveStationId,
  resolveSubwayLineIds,
} from './getCommunityPosts';

jest.mock('@/lib/fetch-client', () => ({
  fetchClient: jest.fn(),
}));

const mockedFetchClient = jest.mocked(fetchClient);

describe('getCommunityPosts', () => {
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

  it('라인/역 필터를 정규화해 community-posts에 전달한다', async () => {
    await getCommunityPosts({
      queryKey: communityQueryKeys.list(
        'category=FREE&subwayLineId=2&stationId=151&keyword=%20%EC%A7%80%EC%97%B0%20',
      ),
      pageParam: 'token-1',
    });

    expect(mockedFetchClient).toHaveBeenCalledWith(API_PATHS.community.list, {
      params: {
        categoryType: CommunityType.FREE,
        content: '지연',
        subwayLineIds: '2',
        stationId: 151,
        pageToken: 'token-1',
        pageSize: API_PAGE_SIZE.list,
        sort: API_SORT.createdAtDesc,
      },
      next: {
        tags: ['community', 'posts'],
      },
    });
  });

  it('HOT 카테고리도 community-posts로 조회한다', async () => {
    await getCommunityPosts({
      queryKey: communityQueryKeys.list('category=HOT&subwayLineId=0&stationId=0'),
      pageParam: '',
    });

    expect(mockedFetchClient).toHaveBeenCalledWith(API_PATHS.community.list, {
      params: {
        pageSize: API_PAGE_SIZE.list,
        sort: API_SORT.createdAtDesc,
      },
      next: {
        tags: ['community', 'posts'],
      },
    });
  });
});

describe('community filter resolvers', () => {
  it('카테고리는 허용값만 통과하고 나머지는 HOT으로 정규화한다', () => {
    expect(resolveCommunityCategory('FREE')).toBe(CommunityType.FREE);
    expect(resolveCommunityCategory('HUMOR')).toBe(CommunityType.HUMOR);
    expect(resolveCommunityCategory('INSIGHT')).toBe(CommunityType.INSIGHT);
    expect(resolveCommunityCategory('INVALID')).toBe(CommunityType.HOT);
    expect(resolveCommunityCategory(null)).toBe(CommunityType.HOT);
  });

  it('subwayLineId는 0/비정상 값을 제거한다', () => {
    expect(resolveSubwayLineIds('0')).toBeUndefined();
    expect(resolveSubwayLineIds('-1')).toBeUndefined();
    expect(resolveSubwayLineIds('abc')).toBeUndefined();
    expect(resolveSubwayLineIds('2')).toBe('2');
  });

  it('stationId는 0/비정상 값을 제거한다', () => {
    expect(resolveStationId('0')).toBeUndefined();
    expect(resolveStationId('-1')).toBeUndefined();
    expect(resolveStationId('abc')).toBeUndefined();
    expect(resolveStationId('151')).toBe(151);
  });
});
