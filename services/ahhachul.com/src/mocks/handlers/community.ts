import { http, delay, HttpResponse } from 'msw';
import { API_BASE_URL } from 'data/api';
import { lostContentMock } from './community.mock';
import { getRandomBoolean } from 'mocks/utils';

const getCommunityListResponse = {
  code: '100',
  message: 'SUCCESS',
  result: {
    hasNext: false,
    posts: [],
  },
};

const getCommunityDetailResponse = (postId: string, randomBoolean: boolean) => ({
  code: '100',
  message: 'SUCCESS',
  result: {
    id: postId,
    title: '모든 일본 청춘을 울린 한 애니메이션 명대사',
    content: JSON.stringify(lostContentMock),
    categoryType: 'FREE',
    hashTags: [],
    viewCnt: 103,
    likeCnt: 3,
    hateCnt: 0,
    likeYn: 'N',
    hateYn: 'N',
    hotPostYn: 'N',
    regionType: 'METROPOLITAN',
    subwayLineId: 1,
    createdAt: '2024-01-21T13:07:35.387616228',
    createdBy: 'dieo21',
    writer: '뚜밥뚜밥',
    images: randomBoolean
      ? []
      : [
          {
            imageId: 1,
            imageUrl: 'https://source.unsplash.com/random',
          },
        ],
  },
});

const getCommunityList = http.get(API_BASE_URL + '/community-posts', async () => {
  await delay(750);

  return HttpResponse.json(getCommunityListResponse);
});

const getCommunityDetail = http.get(API_BASE_URL + '/community-posts/:postId', async (req) => {
  const { postId } = req.params;

  await delay(750);

  const randomBoolean = getRandomBoolean();

  return HttpResponse.json(getCommunityDetailResponse(postId as string, randomBoolean));
});

const communityHandlers = [getCommunityList, getCommunityDetail];

export default communityHandlers;
