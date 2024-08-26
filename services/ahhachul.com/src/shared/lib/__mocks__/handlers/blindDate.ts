import { http, delay, HttpResponse } from 'msw';
import { API_BASE_URL } from 'data/api';

const getBlindListResponse = {
  code: '100',
  message: 'SUCCESS',
  result: {},
};

const getBlindList = http.get(API_BASE_URL + '/blindDate', async () => {
  await delay(400);

  return HttpResponse.json(getBlindListResponse);
});

const blindDateHandlers = [getBlindList];

export default blindDateHandlers;
