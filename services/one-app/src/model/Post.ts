export interface Post {
  id: number;
  title: string;
  writer: string;
  content: string;
  createdAt: string;
  createdBy: string;
  commentCnt: number;
  subwayLineId: number;
}

export interface RecommendPost {
  id: number;
  title: string;
  writer: string;
  createdAt: string;
  imageUrl: string;
}
