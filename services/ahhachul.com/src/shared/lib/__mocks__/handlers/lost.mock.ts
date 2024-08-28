import {
  getRandomBoolean,
  getRandomImg,
  getRandomContent,
  getRandomSubwayLineId,
  getRandomNickname,
} from '../utils';
import { v4 } from 'uuid';

export const lostContentMock = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '구찌 지갑을 잃어버렸어요..',
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
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '4월 1일 오전 8시 30분 ',
            type: 'text',
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '#서초역에서',
            type: 'hashtag',
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: ' 내릴 때 실수로',
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
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '의자에 두고 왔습니다.',
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
        children: [],
        direction: null,
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
            text: '흠 ㅠㅠ. ',
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
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '혹시 주우신 분 계시면 연락 부탁드릴게요..!!',
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
        children: [],
        direction: null,
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
            text: '#사례',
            type: 'hashtag',
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: ' 있습니다!!',
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
        children: [],
        direction: null,
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
            text: '🙇‍♂️🙇‍♂️',
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
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
};

export const lostListItemMock = (idx: number) => ({
  /** 유실물 아이디 */
  id: v4() + idx,
  /** 유실물 제목 */
  title: getRandomContent(),
  /** 유실물 내용 */
  content: '',
  /** 유실물 작성자 닉네임 */
  writer: getRandomNickname(),
  /** 작성자 ID */
  createdBy: 'jasmin',
  /** 유실물 작성 날짜 */
  date: '2024-04-03T13:07:35.387616228',
  /** 유실 호선 ID */
  subwayLine: getRandomSubwayLineId(),
  /** 유실물 쪽지 개수 */
  chats: getRandomBoolean() ? 1 : 0,
  /** 유실물 찾기 완료 여부 */
  status: 'PROGRESS',
  /** 카테고리 이름 */
  categoryName: '',
  /** 커뮤니티 포스트 이미지 URL */
  imageUrl: getRandomImg(idx),
  /** 포스트 댓글 수 */
  commentCnt: 2,
  /** 포스트 좋아요 수 */
  likeCnt: 7,
});
