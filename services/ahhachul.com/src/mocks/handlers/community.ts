import { http, delay, HttpResponse } from 'msw';

const BASE_URL = process.env.REACT_APP_SERVER_API;

const getFeedResponse = {
  success: true,
  status: 200,
  data: [],
  timestamp: '2024-02-05T10:14:08.636259',
};

const getFeeds = http.get(BASE_URL + '/feed/me', async () => {
  await delay(750);

  return HttpResponse.json(getFeedResponse);
});

const feedHandlers = [getFeeds];

export default feedHandlers;
