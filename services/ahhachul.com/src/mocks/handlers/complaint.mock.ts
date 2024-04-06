import { getRandomImg, getRandomContent, getRandomNickname, getRandomTrainNo } from 'mocks/utils';
import { v4 } from 'uuid';

export const complaintMock = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '할머니가 옆에서 쓰러지셨는데\r',
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
            text: '우선 119 불러놨어요ㅠㅠㅠ',
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
      { children: [], direction: null, format: '', indent: 0, type: 'paragraph', version: 1 },
      {
        children: [
          { detail: 0, format: 0, mode: 'normal', style: '', text: '얼른 와주세요,,,,,,,,', type: 'text', version: 1 },
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
            text: '현재 고속터미널역 지나가고있습니다 !',
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
        children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: '9번째 칸이고', type: 'text', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
      {
        children: [
          { detail: 0, format: 0, mode: 'normal', style: '', text: '차량번호가 9920이에요.', type: 'text', version: 1 },
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

export const complaintListItemMock = (idx: number) => {
  const info = getRandomTrainNo();

  return {
    /** 유실물 아이디 */
    id: v4() + idx,
    /** 열차 번호 */
    trainNo: info.trainNo,
    /** 유실물 제목 */
    title: getRandomContent(),
    /** 유실물 내용 */
    content: '',
    /** 민원 타입 */
    complaintType: '응급',
    /** 민원 요약 정보 */
    shortContent: '목격자',
    /** 칸 번호 */
    roomNumber: info.roomNumber,
    /** 유실 호선 ID */
    subwayLineId: info.subwayLine,
    /** 조회수 */
    viewCnt: 3,
    /** 댓글수 */
    commentCnt: 2,
    /** 유실물 작성자 닉네임 */
    writer: getRandomNickname(),
    /** 유실물 작성 날짜 */
    createdAt: '2024-04-03T13:07:35.387616228',
    /** 작성자 ID */
    createdBy: 'jasmin',
    image: {
      imageId: 12312313,
      imageUrl: getRandomImg(idx),
    },
  };
};
