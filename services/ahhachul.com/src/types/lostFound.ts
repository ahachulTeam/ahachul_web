import type {
  Post,
  PostImage,
  RecommendPost,
  CursorPagination,
  SubwayLineFilterOptions,
  EditableImage,
} from './common';

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

export interface LostFoundListParams<TSubwayLine = number> extends Partial<CursorPagination> {
  lostType: LostFoundType;
  subwayLineId: TSubwayLine;
  keyword?: string;
}

export type LostFoundFilterKeys = 'lostType' | 'subwayLineId';

export type LostFoundFilterValues = {
  lostType: LostFoundType;
  subwayLineId: SubwayLineFilterOptions;
};

export type LostFoundFilters = {
  [K in LostFoundFilterKeys]: LostFoundFilterValues[K];
};

export interface LostFoundForm {
  title: string;
  content: string;
  subwayLineId: number;
  lostType: LostFoundType;
  images: File[];
}

export interface LostFoundEditForm {
  title: string;
  content: string;
  subwayLineId: number;
  lostType: LostFoundType;
  images: EditableImage[];
  removeFileIds: number[];
}
