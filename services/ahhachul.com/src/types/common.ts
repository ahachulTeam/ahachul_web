import type { InfiniteData } from '@tanstack/react-query';

import type {
  ApiResponse as SharedApiResponse,
  CursorPagination as SharedCursorPagination,
  PaginatedList as SharedPaginatedList,
  WithPostId as SharedWithPostId,
} from '@ahhachul/domain';

export type KeyOf<T> = keyof T;
export type ValueOf<T> = T[keyof T];
export type IndexOf<T, K extends KeyOf<T>> = ValueOf<T[K]>;
export type Nullable<T> = T | null;

export type CursorPagination = SharedCursorPagination;

export type PaginatedList<TData> = SharedPaginatedList<TData>;

export type InfiniteApiResponse<TData> = InfiniteData<ApiResponse<PaginatedList<TData>>>;

export type ApiResponse<TResult> = SharedApiResponse<TResult>;

export type Post = {
  id: number;
  title: string;
  writer: string;
  content: string;
  createdAt: string;
  createdBy: string;
  commentCnt: number;
  subwayLineId: number;
  stationId?: number;
  likeCnt?: number;
  bookmarkCnt?: number;
  likeYn?: TypeYN;
  bookmarkYn?: TypeYN;
  image?: PostImage;
  imageUrl?: string;
};

export type PostImage = {
  imageId: number;
  imageUrl: string;
};

export interface EditableImage {
  id: number | null;
  data: File | null;
  url: string;
}

export type RecommendPost = Pick<Post, 'id' | 'title' | 'writer' | 'createdAt' | 'imageUrl'>;

export type WithPostId = SharedWithPostId;

export type CommentStatus = 'CREATED' | 'DELETED';

export type Comment = {
  id: number;
  title: string;
  writer: string;
  content: string;
  imageUrls?: string[];
  createdAt: string;
  createdBy: string;
  status: CommentStatus;
  upperCommentId: number | null;
  likeCnt?: number;
  isPrivate?: boolean;
  likedByMe?: boolean;
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

export type RegionType = 'METROPOLITAN';

export type TypeYN = 'Y' | 'N';

export type ArticleType = 'COMMUNITY' | 'COMPLAINT' | 'LOST';

export type ArticleHistoryItem = {
  articleType: ArticleType;
  articleId: number;
  title: string;
  contentPreview: string;
  writer?: string | null;
  subwayLineId?: number | null;
  stationId?: number | null;
  articleCreatedAt: string;
  reactedAt: string;
};
