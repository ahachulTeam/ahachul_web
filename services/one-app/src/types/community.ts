import type {
  CursorPagination,
  RegionType,
  IPost,
  SubwayLineFilterOptions,
  IPostImage,
  TypeYN,
  EditableImage,
} from './common';

export enum CommunityType {
  HOT = 'HOT',
  FREE = 'FREE',
  HUMOR = 'HUMOR',
  INSIGHT = 'INSIGHT',
}

export type CommunitySubwayLineFilterValue = SubwayLineFilterOptions | `${number}`;
export type CommunityStationFilterValue = `${number}`;

export interface CommunityPost extends IPost {
  commentCnt: number;
  likeCnt: number;
  viewCnt: number;
  hashTags: string[];
  regionType: RegionType;
  categoryType: CommunityType;
  stationId?: number;
}

export interface CommunityDetail extends CommunityPost {
  likeYn: TypeYN;
  bookmarkYn: TypeYN;
  bookmarkCnt: number;
  hateYn: TypeYN;
  hateCnt: number;
  hotPostYn: TypeYN;
  images: IPostImage[];
}

export interface CommunityListParams<TSubwayLine = number> extends Partial<CursorPagination> {
  categoryType: CommunityType;
  subwayLineId: TSubwayLine;
  stationId?: number;
  /** 검색하고자 하는 내용 */
  content?: string;
  /** 검색하고자 하는 해시태그 */
  hashTag?: string;
  /** 검색하고자 하는 작성자 닉네임 */
  writer?: string;
}

export type CommunityFilterKeys = 'communityType' | 'subwayLineId' | 'stationId';

export type CommunityFilterValues = {
  communityType: CommunityType;
  subwayLineId: CommunitySubwayLineFilterValue;
  stationId: CommunityStationFilterValue;
};

export type CommunityFilters = {
  [K in CommunityFilterKeys]: CommunityFilterValues[K];
};

export interface CommunityForm {
  title: string;
  content: string;
  subwayLineId: number | string;
  stationId: number | string;
  categoryType: CommunityType;
  images: File[];
}

export interface CommunityEditForm {
  title: string;
  content: string;
  subwayLineId: number | string;
  stationId: number | string;
  categoryType: CommunityType;
  images: EditableImage[];
  removeFileIds: number[];
}
