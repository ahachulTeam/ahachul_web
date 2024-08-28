import {
  getRandomContent,
  getRandomImg,
  getRandomNickname,
  getRandomSubwayLineId,
} from '../utils';
import { v4 } from 'uuid';

export const communityContentMock = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '안녕하세요~',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'start',
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
            text: '이번에 새로 가게를 오픈해서 글 적어요 ㅎㅎ !!',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'start',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      {
        children: [],
        direction: null,
        format: 'start',
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
            text: '(유튜브 틀어놓고 글 읽으시면 더 좋으실 것 같아서 남겨봅니다)',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'start',
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
      { format: '', type: 'youtube', version: 1, videoID: 'wBWzGaxcsgY' },
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
            text: '이제 본론 들어갈게요 !!',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'start',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      {
        children: [],
        direction: null,
        format: 'start',
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
            text: '#노원역에서',
            type: 'hashtag',
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: ' 장사하고 있는데요 ! 이벤트 중이니 많이들 찾아주세요 🙇‍♂️🙇‍♂️',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'start',
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
            text: '저희 가게에 메인 메뉴는 ',
            type: 'text',
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '#쭈삼',
            type: 'hashtag',
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: ' 이에요 !',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'start',
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
            altText: '',
            height: 0,
            type: 'image',
            version: 1,
            width: 0,
          },
        ],
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
            text: '4월 20일까지 소주 1900원, 맥주 3900원 행사중이니',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'start',
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
            text: '퇴근하고 오셔서 시원하게 쏘맥 드시고 가세요 🙌🙌',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'start',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      {
        children: [],
        direction: null,
        format: 'start',
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
            text: '저희 가게는 노원역 7번출구에서 도보 5분거리랍니다 : )',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'start',
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
            altText: '',
            height: 0,
            type: 'image',
            version: 1,
            width: 0,
          },
        ],
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
            text: '노원 숲 ! 자주 방문해주세요 : ) ',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'start',
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
            text: '감사합니다 ☺️ ',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'start',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      {
        children: [],
        direction: null,
        format: 'start',
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
            text: '#홍보',
            type: 'hashtag',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'start',
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
            text: '#소주이벤트',
            type: 'hashtag',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'start',
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

export const communityListItemMock = (idx: number) => ({
  /** 커뮤니티 포스트 아이디 */
  id: v4() + idx,
  /** 커뮤니티 포스트 제목 */
  title: getRandomContent(),
  /** 커뮤니티 포스트 내용 */
  content: '',
  /** 카테고리 타입 */
  categoryType: 'FREE',
  /** 커뮤니티 포스트 해시태그 리스트 */
  hashTags: ['아하철'],
  /** 커뮤니티 포스트 댓글 수 */
  commentCnt: 2,
  /** 커뮤니티 포스트 조회수 */
  viewCnt: 87,
  /** 커뮤니티 포스트 좋아요 수 */
  likeCnt: 7,
  /** 커뮤니티 포스트 핫 게시글 여부 */
  hotPostYn: 'N',
  /** 커뮤니티 포스트 지역 */
  regionType: 'METROPOLITAN',
  /** 커뮤니티 포스트 호선 ID */
  subwayLineId: getRandomSubwayLineId(),
  /** 커뮤니티 포스트 작성 날짜 */
  createdAt: '2024-01-21T13:07:35.387616228',
  /** 커뮤니티 포스트 작성자 ID */
  createdBy: 'jasmin',
  /** 커뮤니티 포스트 작성자 닉네임 */
  writer: getRandomNickname(),
  /** 커뮤니티 포스트 이미지 URL */
  image: {
    imageId: 112313123,
    imageUrl: getRandomImg(idx),
  },
});