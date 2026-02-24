import { API_PATHS } from '@ahhachul/http';

import { fetchClient } from '@/lib/fetch-client';

import { getUserProfile, resolveProfileArticlePath } from './profile';

jest.mock('@/lib/fetch-client', () => ({
  fetchClient: jest.fn(),
}));

const mockedFetchClient = jest.mocked(fetchClient);

describe('profile lib', () => {
  beforeEach(() => {
    mockedFetchClient.mockReset();
    mockedFetchClient.mockResolvedValue({
      code: '100',
      message: 'SUCCESS',
      result: {},
    });
  });

  it('사용자 프로필 상세를 asPublic/limit 파라미터와 함께 조회한다', async () => {
    await getUserProfile('아하철팀', { asPublic: true, limit: 12 });

    expect(mockedFetchClient).toHaveBeenCalledWith(API_PATHS.user.profileDetail('아하철팀'), {
      params: {
        asPublic: true,
        limit: 12,
      },
    });
  });

  it('게시글 타입에 따라 상세 경로를 반환한다', () => {
    expect(resolveProfileArticlePath('COMMUNITY', 10)).toBe('/community/10');
    expect(resolveProfileArticlePath('COMPLAINT', 11)).toBe('/complaint/11');
    expect(resolveProfileArticlePath('LOST', 12)).toBe('/lost-found/12');
  });
});
