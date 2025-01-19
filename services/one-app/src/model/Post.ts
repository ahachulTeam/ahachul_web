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
  imageUrl: string;
};

<<<<<<< HEAD
export type RecommendPost = Pick<Post, 'id' | 'title' | 'writer' | 'createdAt' | 'imageUrl'>;
=======
export type RecommendPost = Pick<
  Post,
  'id' | 'title' | 'writer' | 'createdAt' | 'imageUrl'
>;
>>>>>>> main
