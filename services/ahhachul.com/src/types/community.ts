import type {
  CursorPagination,
  RegionType,
  Post,
  SubwayLineFilterOptions,
  PostImage,
  TypeYN,
} from './common';

export enum CommunityType {
  HOT = 'HOT',
  FREE = 'FREE',
  HUMOR = 'HUMOR',
  INSIGHT = 'INSIGHT',
}

export interface CommunityPost extends Post {
  commentCnt: number;
  likeCnt: number;
  viewCnt: number;
  hashTags: string[];
  regionType: RegionType;
  categoryType: CommunityType;
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
  /** 검색하고자 하는 내용 */
  content?: string;
  /** 검색하고자 하는 해시태그 */
  hashTag?: string;
  /** 검색하고자 하는 작성자 닉네임 */
  writer?: string;
}

export type CommunityFilterKeys = 'communityType' | 'subwayLineId';

export type CommunityFilterValues = {
  communityType: CommunityType;
  subwayLineId: SubwayLineFilterOptions;
};

export type CommunityFilters = {
  [K in CommunityFilterKeys]: CommunityFilterValues[K];
};
