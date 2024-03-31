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

const lostContentMock = {
  root: {
    children: [
      {
        children: [
          { detail: 0, format: 0, mode: 'normal', style: '', text: '오늘 아침 7기 30분에', type: 'text', version: 1 },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '누가 구찌 지갑 흘리셨는데',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      {
        children: [
          { detail: 0, format: 0, mode: 'normal', style: '', text: '이거 주워놨습니다.', type: 'text', version: 1 },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      { children: [], direction: null, format: '', indent: 0, type: 'paragraph', version: 1 },
      {
        children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: '연락주세요!!', type: 'text', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
};

const getLostDetailResponse = {
  code: '100',
  message: 'SUCCESS',
  result: {
    title: '구찌 지갑 분실하신분',
    content: JSON.stringify(lostContentMock),
  },
};

const getLostList = http.get(API_BASE_URL + '/lost-posts', async () => {
  await delay(750);

  return HttpResponse.json(getLostListResponse);
});

const getLostDetail = http.get(API_BASE_URL + '/lost-detail', async () => {
  await delay(750);

  return HttpResponse.json(getLostDetailResponse);
});

const lostHandlers = [getLostList, getLostDetail];

export default lostHandlers;
