import type { PostImage } from './PostImage';

export interface Post {
  id: number;
  title: string;
  writer: string;
  content: string;
  createdAt: string;
  createdBy: string;
  image: PostImage;
  likeCnt?: number;
  hashTags?: string[];
  commentCnt?: number;
  subwayLineId?: number;
}
