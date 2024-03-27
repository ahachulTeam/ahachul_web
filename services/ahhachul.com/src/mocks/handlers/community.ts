import { http, delay, HttpResponse } from 'msw';
import { API_BASE_URL } from 'data/api';

const getCommunityListResponse = {
  code: '100',
  message: 'SUCCESS',
  result: {
    hasNext: false,
    posts: [],
  },
};

const getCommunityDetailResponse = (postId: string) => ({
  code: '100',
  message: 'SUCCESS',
  result: { id: postId },
});

const getCommunityList = http.get(API_BASE_URL + '/community-posts', async () => {
  await delay(750);

  return HttpResponse.json(getCommunityListResponse);
});

const getCommunityDetail = http.get(API_BASE_URL + '/community-posts/:postId', async (req) => {
  const { postId } = req.params;

  await delay(750);

  return HttpResponse.json(getCommunityDetailResponse(postId as string));
});

const communityHandlers = [getCommunityList, getCommunityDetail];

export default communityHandlers;
