import { http, delay, HttpResponse } from 'msw';
import { API_BASE_URL } from 'data/api';
import { complaintMock } from './complaint.mock';
import { getRandomBoolean, getRandomComplaintType, getRandomTrainNo } from 'mocks/utils';

// const getComplaintListResponse = {
//   code: '100',
//   message: 'SUCCESS',
//   result: {
//     hasNext: false,
//     posts: new Array(20).fill('').map((_, idx) => complaintListItemMock(idx)),
//   },
// };

const getComplaintDetailResponse = (postId: string, randomBoolean: boolean) => {
  const info = getRandomTrainNo();
  const complaintInfo = getRandomComplaintType();

  return {
    code: '100',
    message: 'SUCCESS',
    result: {
      id: postId,
      title: '앞에 할머니가',
      content: JSON.stringify(complaintMock),
      shortContent: complaintInfo.shortContent,
      subwayLineId: info.subwayLine,
      trainNo: info.trainNo,
      viewCnt: 103,
      commentCnt: 2,
      createdAt: '2024-01-21T13:07:35.387616228',
      createdBy: 'dieo21',
      roomNumber: info.roomNumber,
      writer: '뚜밥뚜밥',
      images: randomBoolean
        ? []
        : [
            {
              imageId: 1,
              imageUrl: 'https://source.unsplash.com/random',
            },
          ],
      complaintType: complaintInfo.complaintType,
    },
  };
};

// const getComplaintList = http.get(API_BASE_URL + '/complaints', async () => {
//   await delay(400);

//   return HttpResponse.json(getComplaintListResponse);
// });

const getComplaintDetail = http.get(API_BASE_URL + '/complaints/:postId', async (req) => {
  const { postId } = req.params;

  await delay(200);

  const randomBoolean = getRandomBoolean();

  return HttpResponse.json(getComplaintDetailResponse(postId as string, randomBoolean));
});

// const postComplaintsArticle = http.post(API_BASE_URL + '/complaints/messages', async () => {
//   await delay(400);

//   return HttpResponse.json({
//     code: '100',
//     message: 'SUCCESS',
//     result: null,
//   });
// });

const complaintsHandlers = [getComplaintDetail];

export default complaintsHandlers;
