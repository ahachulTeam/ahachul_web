import { PostImage } from './PostImage';

export type Post = {
  id: number;
  title: string;
  writer: string;
  content: string;
  createdAt: string;
  createdBy: string;
  commentCnt: number;
  subwayLineId: number;
} & Partial<OptionalPostFields>;

export type OptionalPostFields = {
  image: PostImage;
};

export type RecommendPost = {
  id: number;
  title: string;
  writer: string;
  createdAt: string;
  imageUrl: string;
};
