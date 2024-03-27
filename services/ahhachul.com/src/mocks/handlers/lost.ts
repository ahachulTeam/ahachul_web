import { http, delay, HttpResponse } from 'msw';
import { API_BASE_URL } from 'data/api';

const getLostListResponse = {
  code: '100',
  message: 'SUCCESS',
  result: {
    hasNext: false,
    posts: [],
  },
};

const getLostList = http.get(API_BASE_URL + '/lost-posts', async () => {
  await delay(750);

  return HttpResponse.json(getLostListResponse);
});

const lostHandlers = [getLostList];

export default lostHandlers;
