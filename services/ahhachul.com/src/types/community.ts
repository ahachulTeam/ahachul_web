import { ImageType, ListResponse, Nullable, RegionType, YNType } from 'types';
import { IPageParams } from 'types/request';

export type ICommunityStore = {
  activeTab: CommunityCategoryType;
};

export type CommunityCategoryType = 'HOT' | 'FREE' | 'INSIGHT' | 'ISSUE' | 'HUMOR' | 'QUESTION';

export interface ICommunity {
  /** 커뮤니티 포스트 아이디 */
  id: number;
  /** 커뮤니티 포스트 제목 */
  title: string;
  /** 커뮤니티 포스트 내용 */
  content: string;
  /** 카테고리 타입 */
  categoryType: CommunityCategoryType;
  /** 커뮤니티 포스트 해시태그 리스트 */
  hashTags: string[];
  /** 커뮤니티 포스트 댓글 수 */
  commentCnt: number;
  /** 커뮤니티 포스트 조회수 */
  viewCnt: number;
  /** 커뮤니티 포스트 좋아요 수 */
  likeCnt: number;
  /** 커뮤니티 포스트 핫 게시글 여부 */
  hotPostYn: YNType;
  /** 커뮤니티 포스트 지역 */
  regionType: RegionType;
  /** 커뮤니티 포스트 호선 ID */
  subwayLineId: string;
  /** 커뮤니티 포스트 작성 날짜 */
  createdAt: string;
  /** 커뮤니티 포스트 작성자 ID */
  createdBy: string;
  /** 커뮤니티 포스트 작성자 닉네임 */
  writer: string;
  /** 커뮤니티 포스트 이미지 URL */
  image: ImageType;
}

export type ICommunityList = ListResponse<ICommunity>;

export type ICommunityDetail = Omit<ICommunity, 'commentCnt' | 'image'> & {
  hateCnt: number;
  images: ImageType[];
};

export type CommunityListFilterParamType = 'favor' | 'answeredAt';
export type CommunityListOrderParamType = 'desc' | 'asc';
export type CommunityListSortParamType = `${CommunityListFilterParamType},${CommunityListOrderParamType}`;

export interface ICommunityParams extends IPageParams {
  /** 커뮤니티 포스트 카테고리 타입  */
  categoryType?: CommunityCategoryType;
  /**  커뮤니티 포스트 호선 */
  subwayLineId?: number;
  /** 검색하고자 하는 내용 */
  content?: string;
  /** 검색하고자 하는 해시 태그 */
  hashTag?: string;
  /** 검색하고자 하는 핫 게시글 여부 */
  hotPostYn?: number;
  /** 정렬 조건 */
  sort: CommunityListSortParamType;
}

export interface ICommunityArticleForm {
  // communityImages: Array<File | undefined>;
  title: string;
  content: string;
  communityType: CommunityCategoryType;
  imageFiles: Nullable<File>;
}
