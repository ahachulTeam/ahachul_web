import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import {
  User,
  ERROR_RATE,
  createErrorResponse,
  createSuccessResponse,
  generateCommentThread,
  generateBasicArticleData,
} from '../mock-utils';

const mock_유실물_상세_조회 = http.get(
  '/lost-posts/:postId',
  ({ params }): HttpResponse => {
    const { postId } = params;

    if (Math.random() < ERROR_RATE || typeof postId !== 'string') {
      return createErrorResponse();
    }

    return createSuccessResponse(generateBasicArticleData(postId, User[0]));
  },
);

const mock_유실물_상세_댓글_목록_조회 = http.get(
  '/lost-posts/:postId/comments',
  (): HttpResponse => {
    if (Math.random() < ERROR_RATE) {
      return createErrorResponse();
    }

    return createSuccessResponse({
      comments: Array.from(
        { length: faker.number.int({ min: 1, max: 5 }) },
        generateCommentThread,
      ),
    });
  },
);

export default [mock_유실물_상세_조회, mock_유실물_상세_댓글_목록_조회];
