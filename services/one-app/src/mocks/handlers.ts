import { http, HttpResponse, StrictResponse } from 'msw';
import { faker } from '@faker-js/faker';

function generateDate() {
  const lastWeek = new Date(Date.now());
  lastWeek.setDate(lastWeek.getDate() - 7);
  return faker.date.between({
    from: lastWeek,
    to: Date.now(),
  });
}
const User = [
  { memberId: 'createhb21', nickname: '효범', gender: 'MALE' },
  { memberId: 'areumsheep', nickname: '아름', gender: 'FEMALE' },
  { memberId: 'YoonJeongLulu', nickname: '윤정', gender: 'FEMALE' },
];
const Posts = [];

export const handlers = [
  http.post('/v1/auth/login', async ({ request }) => {
    console.log('로그인');
    return HttpResponse.json({
      memberId: User[0].memberId,
      accessToken: faker.string.alphanumeric(20),
      accessTokenExpiresIn: faker.number.int({ max: 1000 }),
      refreshToken: faker.string.alphanumeric(20),
      refreshTokenExpiresIn: faker.number.int({ max: 100000 }),
      isNeedAdditionalUserInfo: false,
    });
  }),
  http.post('/v1/auth/logout', () => {
    console.log('로그아웃');
    return new HttpResponse(null);
  }),
  http.get('/v1/auth/redirect-url', () => {
    console.log('리다이렉트 URL 조회');
    return HttpResponse.json({
      code: '100',
      message: 'SUCCESS',
      result: {
        redirectUrl: 'redirectUrl',
      },
    });
  }),
  http.post('/v1/auth/token/refresh', () => {
    console.log('토큰 재발급');
    return HttpResponse.json({
      accessToken: faker.string.alphanumeric(20),
      accessTokenExpiresIn: faker.number.int({ max: 1000 }),
      refreshToken: faker.string.alphanumeric(20),
      refreshTokenExpiresIn: faker.number.int({ max: 100000 }),
    });
  }),
  http.get(
    '/v1/members/:userId',
    ({ request, params }): StrictResponse<any> => {
      const { userId } = params;
      const found = User.find((v) => v.memberId === userId);
      if (found) {
        return HttpResponse.json(found);
      }
      return HttpResponse.json(
        { message: 'no_such_user' },
        {
          status: 404,
        },
      );
    },
  ),
  http.get('/v1/members/:userId/posts', ({ request, params }) => {
    const { userId } = params;
    return HttpResponse.json([
      {
        id: 1,
        writer: User[0].nickname,
        content: `${1} ${userId}의 게시글`,
        image: { imageId: 1, imageUrl: faker.image.urlLoremFlickr() },
        createdAt: generateDate(),
        createdBy: User[0].memberId,
      },
      {
        id: 2,
        writer: User[0].nickname,
        content: `${2} ${userId}의 게시글`,
        image: [{ imageId: 1, imageUrl: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
        createdBy: User[0].memberId,
      },
      {
        id: 3,
        writer: User[0].nickname,
        content: `${3} ${userId}의 게시글`,
        image: { imageId: 1, imageUrl: faker.image.urlLoremFlickr() },
        createdAt: generateDate(),
        createdBy: User[0].memberId,
      },
      {
        id: 4,
        writer: User[0].nickname,
        content: `${4} ${userId}의 게시글`,
        image: { imageId: 1, imageUrl: faker.image.urlLoremFlickr() },
        createdAt: generateDate(),
        createdBy: User[0].memberId,
      },
      {
        id: 5,
        writer: User[0].nickname,
        content: `${5} ${userId}의 게시글`,
        image: { imageId: 1, imageUrl: faker.image.urlLoremFlickr() },
        createdAt: generateDate(),
        createdBy: User[0].memberId,
      },
    ]);
  }),
  http.get(
    '/v1/community-posts/:postId',
    ({ request, params }): StrictResponse<any> => {
      console.log('커뮤니티 글 상세 조회');
      const { postId } = params;
      if (parseInt(postId as string) > 10) {
        return HttpResponse.json(
          { message: 'no_such_post' },
          {
            status: 404,
          },
        );
      }
      return HttpResponse.json({
        postId,
        writer: User[0].nickname,
        title: `${1} 게시글 아이디 ${postId}의 제목`,
        content: faker.lorem.paragraphs(),
        images: [
          { imageId: 1, imageUrl: faker.image.urlLoremFlickr() },
          { imageId: 2, imageUrl: faker.image.urlLoremFlickr() },
          { imageId: 3, imageUrl: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
        createdBy: User[0].memberId,
      });
    },
  ),
  http.get('/api/posts/:postId/comments', ({ request, params }) => {
    console.log('커뮤니티 글 댓글 목록 조회');
    const { postId } = params;
    return HttpResponse.json({
      comments: [
        {
          parentComment: {
            id: 1,
            upperCommentId: null,
            content: faker.lorem.paragraphs(),
            status: 'CREATED',
            createdAt: generateDate(),
            createdBy: User[0].memberId,
            writer: User[0].nickname,
          },
          childComments: [
            {
              id: 2,
              upperCommentId: 1,
              content: faker.lorem.paragraphs(),
              status: 'CREATED',
              createdAt: generateDate(),
              createdBy: User[1].memberId,
              writer: User[1].nickname,
            },
          ],
        },
        {
          parentComment: {
            id: 11,
            upperCommentId: null,
            content: faker.lorem.paragraphs(),
            status: 'DELETED',
            createdAt: generateDate(),
            createdBy: User[1].memberId,
            writer: User[1].nickname,
          },
          childComments: [
            {
              id: 22,
              upperCommentId: 11,
              content: faker.lorem.paragraphs(),
              status: 'CREATED',
              createdAt: generateDate(),
              createdBy: User[1].memberId,
              writer: User[1].nickname,
            },
          ],
        },
        {
          parentComment: {
            id: 111,
            upperCommentId: null,
            content: faker.lorem.paragraphs(),
            status: 'CREATED',
            createdAt: generateDate(),
            createdBy: User[2].memberId,
            writer: User[2].nickname,
          },
          childComments: [
            {
              id: 222,
              upperCommentId: 111,
              content: faker.lorem.paragraphs(),
              status: 'CREATED',
              createdAt: generateDate(),
              createdBy: User[0].memberId,
              writer: User[0].nickname,
            },
          ],
        },
        {
          parentComment: {
            id: 1111,
            upperCommentId: null,
            content: faker.lorem.paragraphs(),
            status: 'CREATED',
            createdAt: generateDate(),
            createdBy: User[2].memberId,
            writer: User[2].nickname,
          },
          childComments: [],
        },
      ],
    });
  }),
];
