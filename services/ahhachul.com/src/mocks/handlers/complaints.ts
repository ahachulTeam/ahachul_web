import { http, delay, HttpResponse } from 'msw';
import { API_BASE_URL } from 'data/api';

const postComplaintsArticle = http.post(API_BASE_URL + '/complaints/messages', async () => {
  await delay(400);

  return HttpResponse.json({
    code: '100',
    message: 'SUCCESS',
    result: null,
  });
});

const complaintsHandlers = [postComplaintsArticle];

export default complaintsHandlers;
