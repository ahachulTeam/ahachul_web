import type { CursorBasedPaginationParams } from './common';
import type { Post, RecommendPost } from './post';
import type { PostImage } from './postImage';
import type { SubwayLineFilterOptions, WithSubwayLineId } from './subway';

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

export interface DetailImages {
  id: number | null;
  data: File | null;
  url: string;
}

export interface LostFoundFormData {
  title: string;
  initialContent: string;
  subwayLineId: number;
  lostType: LostFoundType;
  images: DetailImages[];
}
