import { http } from 'msw';
import { faker } from '@faker-js/faker';
import {
  User,
  ERROR_RATE,
  ADDITIONAL_INFO_RATE,
  createErrorResponse,
  createSuccessResponse,
} from '../mock-utils';

const generateTokenData = () => ({
  accessToken: faker.string.alphanumeric(20),
  accessTokenExpiresIn: faker.number.int({ max: 100000 }),
  refreshToken: faker.string.alphanumeric(20),
  refreshTokenExpiresIn: faker.number.int({ max: 1000000 }),
});

const createLoginSuccessResponse = (memberId: string) =>
  createSuccessResponse({
    memberId,
    ...generateTokenData(),
    isNeedAdditionalUserInfo: Math.random() < ADDITIONAL_INFO_RATE,
  });

<<<<<<< HEAD
const mock_로그인 = http.post('/auth/login', async () => {
=======
const mock_로그인 = http.post('/auth/login', async ({ request }) => {
>>>>>>> main
  if (Math.random() < ERROR_RATE) {
    return createErrorResponse();
  }

  return createLoginSuccessResponse(User[0].memberId);
});

const mock_리다이렉트_URL_조회 = http.get('/auth/redirect-url', () => {
  if (Math.random() < ERROR_RATE) {
    return createErrorResponse();
  }

  return createSuccessResponse({
    redirectUrl: 'https://dev.ahhachul.com/redirectUrl',
  });
});

export default [mock_로그인, mock_리다이렉트_URL_조회];
