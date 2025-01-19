import { http } from 'msw';

import { User, createErrorResponse, createSuccessResponse } from '../mock-utils';

const mock_내_정보_조회 = http.get('/members', ({ params }) => {
  const { userId } = params;
  const found = User.find(v => v.memberId === userId);
  if (!found) {
    return createErrorResponse();
  }
  return createSuccessResponse(found);
});

export default [mock_내_정보_조회];
