import { http, HttpResponse } from 'msw';

const getCommentsResponse = {
  code: '100',
  message: 'SUCCESS',
  result: {
    comments: [
      {
        parentComment: {
          id: 1,
          upperCommentId: null,
          content: '상위 내용',
          status: 'CREATED',
          createdAt: '2024-04-20T03:42:09.301118048',
          createdBy: '부모 작성자 ID',
          writer: '부모 작성자 닉네임',
        },
        childComments: [
          {
            id: 2,
            upperCommentId: 1,
            content: '하위 내용',
            status: 'CREATED',
            createdAt: '2024-04-20T09:42:09.301156329',
            createdBy: '자식 작성자 ID',
            writer: '자식 작성자 닉네임',
          },
        ],
      },
      {
        parentComment: {
          id: 11,
          upperCommentId: null,
          content: '두번째 상위 내용',
          status: 'DELETED',
          createdAt: '2024-04-25T03:42:09.301118048',
          createdBy: '두번째 부모 작성자 ID',
          writer: '두번째 부모 작성자 닉네임',
        },
        childComments: [
          {
            id: 22,
            upperCommentId: 11,
            content: '두번째 하위 내용',
            status: 'CREATED',
            createdAt: '2024-04-20T09:42:09.301156329',
            createdBy: '두번째 자식 작성자 ID',
            writer: '두번째 자식 작성자 닉네임',
          },
        ],
      },
      {
        parentComment: {
          id: 111,
          upperCommentId: null,
          content:
            '토요일에 볼래요? 어 예쁘다, 생성할 코멘트 내용 생성할 코멘트 내용 생성할 코멘트 내용 생성할 코멘트 내용 생성할 코멘트 내용 생성할 코멘트 내용 생성할 코멘트 내용 생성할 코멘트 내용 ',
          status: 'CREATED',
          createdAt: '2024-04-29T03:42:09.301118048',
          createdBy: '도롱뇽 아이디',
          writer: '도롱뇽',
        },
        childComments: [
          {
            id: 222,
            upperCommentId: 111,
            content: '일주일에 충치치료, 사랑니(매복)2개나 뺄려하다니!!',
            status: 'CREATED',
            createdAt: '2024-04-29T17:42:09.301156329',
            createdBy: '룩삼 아이디',
            writer: '룩삼',
          },
        ],
      },
    ],
  },
};

// 현재는 커뮤니티 내의 글에만 댓글들이 있는데, 앞으로는 모든 종류의 글에도 댓글이 있도록 변경할 예정
const getCommentList = http.get(
  'http://localhost:3000/community-comments',
  async () => {
    return HttpResponse.json(getCommentsResponse);
  },
);

const commentsHandlers = [getCommentList];

export default commentsHandlers;
