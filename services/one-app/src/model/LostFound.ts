import type { PostImage } from './PostImage';
import type { WithSubwayLineId } from './Subway';
import type { Post, RecommendPost } from './Post';
import type { CursorBasedPaginationParams } from './Utils';

export type LostType = 'LOST' | 'ACQUIRE';
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
  lostType: LostType;
  recommendPosts: RecommendPost[];
}

export interface LostFoundListParams
  extends CursorBasedPaginationParams,
    Partial<WithSubwayLineId> {
  lostType: LostType;
  keyword?: string;
}

export interface DetailImages {
  id: number | null;
  data: File | null;
  url: string;
}

export interface LostFoundFormData {
  title: string;
  initialContent: string;
  subwayLineId: number;
  lostType: LostType;
  images: {
    id: number | null;
    data: File | null;
    url: string;
  }[];
}
