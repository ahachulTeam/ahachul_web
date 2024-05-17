import { http, delay, HttpResponse } from 'msw';
import { API_BASE_URL } from 'data/api';
import { communityContentMock, communityListItemMock } from './community.mock';
import { getRandomBoolean } from 'mocks/utils';

const getCommunityListResponse = {
  code: '100',
  message: 'SUCCESS',
  result: {
    hasNext: false,
    posts: new Array(20).fill('').map((_, idx) => communityListItemMock(idx)),
  },
};

const getCommunityDetailResponse = (postId: string, randomBoolean: boolean) => ({
  code: '100',
  message: 'SUCCESS',
  result: {
    id: postId,
    title: '모든 일본 청춘을 울린 한 애니메이션 명대사',
    content: JSON.stringify(communityContentMock),
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
  await delay(400);

  return HttpResponse.json(getCommunityListResponse);
});

const getCommunityDetail = http.get(API_BASE_URL + '/community-posts/:postId', async (req) => {
  const { postId } = req.params;

  await delay(400);

  const randomBoolean = getRandomBoolean();

  return HttpResponse.json(getCommunityDetailResponse(postId as string, randomBoolean));
});

const postCommunityArticle = http.post(API_BASE_URL + '/community-posts', async (req) => {
  console.log('req was :', req);

  await delay(800);

  // const tOrF = getRandomBoolean();

  // if (tOrF) {
  return HttpResponse.json({
    code: '100',
    message: 'SUCCESS',
    result: {
      id: 1,
      title: '생성된 제목',
      content: '생성된 내용',
      categoryType: 'ISSUE',
      region: 'METROPOLITAN',
      subwayLineId: 1,
      images: [
        {
          imageId: 1,
          imageUrl: 'url1',
        },
        {
          imageId: 2,
          imageUrl: 'url2',
        },
      ],
    },
  });
  // }

  // throw new Error();
});

const communityHandlers = [getCommunityList, getCommunityDetail, postCommunityArticle];

export default communityHandlers;
