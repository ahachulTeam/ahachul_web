import { HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import { APIResponseCode, RESPONSE_MESSAGES } from '@/common/constants/api';

export const ERROR_RATE = 0.3;
export const ADDITIONAL_INFO_RATE = 0.3;

export const User = [
  { memberId: '1', nickname: '효범', gender: 'MALE' },
  { memberId: '2', nickname: '윤정', gender: 'FEMALE' },
  { memberId: '3', nickname: '희제', gender: 'MALE' },
];

export const createErrorResponse = () =>
  HttpResponse.json(
    {
      code: APIResponseCode.BAD_REQUEST,
      message: RESPONSE_MESSAGES[APIResponseCode.BAD_REQUEST],
      result: null,
    },
    { status: 400 },
  );

export const createSuccessResponse = <TData>(result: TData) =>
  HttpResponse.json({
    code: APIResponseCode.SUCCESS,
    message: RESPONSE_MESSAGES[APIResponseCode.SUCCESS],
    result,
  });

export const generateDate = () => {
  const lastWeek = new Date(Date.now());
  lastWeek.setDate(lastWeek.getDate() - 7);
  return faker.date.between({
    from: lastWeek,
    to: Date.now(),
  });
};

export const generateImages = (count: number) =>
  Array.from({ length: count }, (_, index) => ({
    imageId: index + 1,
    imageUrl: faker.image.urlLoremFlickr(),
  }));

export const generateBasicArticleData = (
  postId: string,
  user: (typeof User)[0],
  imgLength = 3,
) => ({
  postId,
  writer: user.nickname,
  title: `게시글 아이디 ${postId}의 제목`,
  content: faker.lorem.paragraphs(),
  images: generateImages(imgLength),
  createdAt: generateDate(),
  createdBy: user.memberId,
});

const generateComment = (
  id: number,
  upperCommentId: number | null,
  user: (typeof User)[0],
) => ({
  id,
  upperCommentId,
  content: faker.lorem.paragraphs(),
  status: faker.helpers.arrayElement(['CREATED', 'DELETED']),
  createdAt: generateDate(),
  createdBy: user.memberId,
  writer: user.nickname,
});

export const generateCommentThread = () => {
  const parentComment = generateComment(
    faker.number.int({ min: 1, max: 1000 }),
    null,
    faker.helpers.arrayElement(User),
  );
  const childComments = Array.from(
    { length: faker.number.int({ min: 0, max: 3 }) },
    () =>
      generateComment(
        faker.number.int({ min: 1001, max: 2000 }),
        parentComment.id,
        faker.helpers.arrayElement(User),
      ),
  );
  return { parentComment, childComments };
};
