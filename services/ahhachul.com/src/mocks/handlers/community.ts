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

const getCommunityList = http.get(API_BASE_URL + '/community-posts', async () => {
  await delay(750);

  return HttpResponse.json(getCommunityListResponse);
});

const communityHandlers = [getCommunityList];

export default communityHandlers;
