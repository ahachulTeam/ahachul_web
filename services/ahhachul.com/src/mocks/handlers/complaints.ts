import { http, delay, HttpResponse } from 'msw';
import { API_BASE_URL } from 'data/api';
import { complaintMock } from './complaint.mock';

const getComplaintDetailResponse = (postId: string) => ({
  code: '100',
  message: 'SUCCESS',
  result: {
    id: postId,
    title: '앞에 할머니가',
    content: JSON.stringify(complaintMock),
    shortContent: '목격자',
    lineName: '3호선',
    subwayLineId: 9,
    trainNo: '3920',
    viewCnt: 103,
    commentCnt: 2,
    createdAt: '2024-01-21T13:07:35.387616228',
    createdBy: 'dieo21',
    writer: '뚜밥뚜밥',
    images: [],
    complaintType: '응급',
  },
});

const getComplaintDetail = http.get(API_BASE_URL + '/complaints/:postId', async (req) => {
  const { postId } = req.params;

  await delay(200);

  return HttpResponse.json(getComplaintDetailResponse(postId as string));
});

const postComplaintsArticle = http.post(API_BASE_URL + '/complaints/messages', async () => {
  await delay(400);

  return HttpResponse.json({
    code: '100',
    message: 'SUCCESS',
    result: null,
  });
});

const complaintsHandlers = [postComplaintsArticle, getComplaintDetail];

export default complaintsHandlers;
