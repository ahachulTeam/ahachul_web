import { ListResponse } from 'types';
import { IPageParams } from 'types/request';

export type ILostStore = {
  activeTab: LostType;
};

export type LostType = 'LOST' | 'ACQUIRE';
export type LostOriginType = 'LOST112' | 'APP';
export type LostStatusType = 'PROGRESS' | 'COMPLETE';

export interface ILost {
  /** 유실물 아이디 */
  id: number;
  /** 유실물 제목 */
  title: string;
  /** 유실물 내용 */
  content: string;
  /** 유실물 작성자 닉네임 */
  writer: string;
  /** 작성자 ID */
  createdBy: string;
  /** 유실물 작성 날짜 */
  date: string;
  /** 유실 호선 ID */
  subwayLine: number;
  /** 유실물 쪽지 개수 */
  chats: number;
  /** 유실물 찾기 완료 여부 */
  status: LostStatusType;
  /** 카테고리 이름 */
  categoryName: string;
  /** 유실물 이미지 URL */
  imageUrl: string;
}

export type ILostList = ListResponse<ILost>;

export interface ILostParams extends IPageParams {
  /** 유실물 카테고리  - LOST(유실물) / ACQUIRE(습득물 + Lost112) */
  lostType: LostType;
  /**  유실물 호선 */
  subwayLineId?: number;
  /** 유실물 출처 */
  origin?: LostOriginType;
  /** 검색 키워드 */
  keyword?: string;
  /** 마지막으로 조회한 유실물 데이터의 ID */
  lostPostId?: number;
}

export interface ILostArticleForm {
  // lostImages: Array<File | undefined>;
  title: string;
  content: string;
  lostType: LostType;
  desiredLocation?: string;
}
