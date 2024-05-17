import { http, delay, HttpResponse } from 'msw';
import { API_BASE_URL } from 'data/api';
import { getRandomBoolean } from 'mocks/utils';
import { lostListItemMock, lostContentMock } from './lost.mock';

const getLostListResponse = {
  code: '100',
  message: 'SUCCESS',
  result: {
    hasNext: false,
    posts: new Array(20).fill('').map((_, idx) => lostListItemMock(idx)),
  },
};

const getLostList = http.get(API_BASE_URL + '/lost-posts', async () => {
  await delay(400);

  return HttpResponse.json(getLostListResponse);
});

const getLostDetailResponse = (postId: string, randomBoolean: boolean) => ({
  code: '100',
  message: 'SUCCESS',
  result: {
    id: postId,
    title: '구찌 지갑 분실하신분',
    content: JSON.stringify(lostContentMock),
    writer: '뚜밥뚜밥',
    createdBy: 'dieo21',
    date: '2024-01-21T13:07:35.387616228',
    subwayLine: 1,
    chats: 1,
    status: 'PROGRESS',
    categoryName: '휴대폰',
    storage: '우리집',
    pageUrl: 'http://lost112',
    images: randomBoolean
      ? []
      : [
          {
            imageId: 1,
            imageUrl: 'https://source.unsplash.com/random',
          },
        ],
    externalSourceImageUrl: 'https://source.unsplash.com/random',
    recommendPosts: [
      {
        id: 2,
        title: 'title',
        writer: 'writer',
        imageUrl: 'https://img.png',
        date: '2023/01/23',
      },
    ],
  },
});

const getLostDetail = http.get(API_BASE_URL + '/lost-posts/:postId', async (req) => {
  const { postId } = req.params;

  await delay(400);

  const randomBoolean = getRandomBoolean();

  return HttpResponse.json(getLostDetailResponse(postId as string, randomBoolean));
});

const postLostArticle = http.post(API_BASE_URL + '/lost-posts', async (req) => {
  console.log('req was :', req);

  await delay(400);

  // const tOrF = getRandomBoolean();

  // if (tOrF) {
  return HttpResponse.json({
    code: '100',
    message: 'SUCCESS',
    result: {
      id: 1,
      images: [
        {
          imageId: 1,
          imageUrl: 'url1',
        },
      ],
    },
  });
  // }

  // throw new Error();
});

const lostHandlers = [getLostList, getLostDetail, postLostArticle];

export default lostHandlers;
