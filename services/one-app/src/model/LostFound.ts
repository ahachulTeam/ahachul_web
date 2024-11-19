export type LostStatus = 'PROGRESS' | 'COMPLETE';
export type Image = {
  imageId: number;
  imageUrl: string;
};
export type RecommendPost = {
  id: number;
  title: string;
  writer: string;
  createdAt: string;
  imageUrl: string;
};

export interface LostFound {
  id: number;
  title: string;
  content: string;
  writer: string | null;
  createdBy: string | null;
  createdAt: string;
  subwayLineId: number | null;
  commentCnt: number;
  status: LostStatus;
  storage: string;
  storageNumber: string;
  pageUrl: string;
  images: Image[];
  categoryName: string;
  externalSourceImageUrl: string;
  recommendPosts: RecommendPost[];
  isFromLost112: boolean;
}
