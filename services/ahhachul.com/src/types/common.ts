import type { InfiniteData } from '@tanstack/react-query';

export type KeyOf<T> = keyof T;
export type ValueOf<T> = T[keyof T];
export type IndexOf<T, K extends KeyOf<T>> = ValueOf<T[K]>;
export type Nullable<T> = T | null;

export interface CursorPagination {
  hasNext: boolean;
  pageToken: string | null;
}

export interface PaginatedList<TData> extends CursorPagination {
  data: TData[];
}

export type InfiniteApiResponse<TData> = InfiniteData<ApiResponse<PaginatedList<TData>>>;

export interface ApiResponse<TResult> {
  code: string;
  message: string;
  result: TResult;
}

export type Post = {
  id: number;
  title: string;
  writer: string;
  content: string;
  createdAt: string;
  createdBy: string;
  commentCnt: number;
  subwayLineId: number;
  imageUrl?: string;
};

export type PostImage = {
  imageId: number;
  imageUrl: string;
};

export type RecommendPost = Pick<Post, 'id' | 'title' | 'writer' | 'createdAt' | 'imageUrl'>;

export type WithPostId = {
  id: number;
};

export type CommentStatus = 'CREATED' | 'DELETED';

export type Comment = {
  id: number;
  title: string;
  writer: string;
  content: string;
  createdAt: string;
  createdBy: string;
  status: CommentStatus;
  upperCommentId: number | null;
  likeCnt?: number;
};

export type CommentList = {
  comments: {
    parentComment: Comment;
    childComments: Comment[];
  }[];
};

export enum SubwayLineFilterOptions {
  ALL_LINES = 'ALL_LINES',
  ONLY_MY_LINE = 'ONLY_MY_LINE',
}

export type StringRecord = Record<string, string>;

export type PrimitiveOrArray = string | number | boolean | null | Array<string | number | File>;

export type RecordWithPrimitives = {
  [key: string]: PrimitiveOrArray;
};

export enum ScrollDirection {
  up = 'up',
  down = 'down',
}
