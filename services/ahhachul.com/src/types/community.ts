import type {
  CursorPagination,
  RegionType,
  Post,
  SubwayLineFilterOptions,
  PostImage,
  TypeYN,
  EditableImage,
} from './common';

export enum CommunityType {
  HOT = 'HOT',
  FREE = 'FREE',
  ISSUE = 'ISSUE',
  INSIGHT = 'INSIGHT',
}

export type CommunitySubwayLineFilterValue = SubwayLineFilterOptions | `${number}`;
export type CommunityStationFilterValue = `${number}`;

export interface CommunityPost extends Post {
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
  hateYn: TypeYN;
  hateCnt: number;
  hotPostYn: TypeYN;
  images: PostImage[];
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

export type CommunityFilterKeys = 'communityType' | 'subwayLineId' | 'stationId' | 'hashTag';

export type CommunityFilterValues = {
  communityType: CommunityType;
  subwayLineId: CommunitySubwayLineFilterValue;
  stationId: CommunityStationFilterValue;
  hashTag: string;
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
