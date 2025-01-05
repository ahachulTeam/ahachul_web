import type { PostImage } from './PostImage';
import type { Post, RecommendPost } from './Post';
import type { CursorBasedPaginationParams } from './Utils';
import type { SubwayLineFilterOptions, WithSubwayLineId } from './Subway';

export enum LostFoundType {
  LOST = 'LOST',
  ACQUIRE = 'ACQUIRE',
}
export type LostStatus = 'PROGRESS' | 'COMPLETE';

export interface LostFoundPost extends Post {
  status: LostStatus;
  imageUrl: string;
  categoryName: string;
}

export interface LostFoundPostDetail extends LostFoundPost {
  pageUrl: string;
  storage: string;
  storageNumber: string;
  externalSourceImageUrl: string;
  isFromLost112: boolean;
  images: PostImage[];
  recommendPosts: RecommendPost[];
  lostType: LostFoundType;
}

export interface LostFoundListParams
  extends CursorBasedPaginationParams,
    Partial<WithSubwayLineId> {
  keyword: string | null;
  lostType: LostFoundType;
}

export type LostFoundFilterKeys = 'lostType' | 'subwayLineId';

export type LostFoundFilterValues = {
  lostType: LostFoundType;
  subwayLineId: SubwayLineFilterOptions;
};

export type LostFoundFilters = {
  [K in LostFoundFilterKeys]: LostFoundFilterValues[K];
};
