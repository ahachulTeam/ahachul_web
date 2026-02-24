import type { InfiniteData } from '@tanstack/react-query';

import {
  APIResponseCode,
  type ApiResponse as SharedApiResponse,
  type CursorPagination as SharedCursorPagination,
  type PaginatedList as SharedPaginatedList,
  type WithPostId as SharedWithPostId,
} from '@ahhachul/domain';

export type KeyOf<T> = keyof T;
export type ValueOf<T> = T[keyof T];
export type IndexOf<T, K extends KeyOf<T>> = ValueOf<T[K]>;
export type Nullable<T> = T | null;

export type IResponse<T> = SharedApiResponse<T>;

export enum AppEnv {
  PRODUCTION = 'production',
  STAGING = 'staging',
  DEV = 'development',
}

export { APIResponseCode };

export type CursorPagination = SharedCursorPagination;

export type PaginatedList<TData> = SharedPaginatedList<TData>;

export type InfiniteApiResponse<TData> = InfiniteData<ApiResponse<PaginatedList<TData>>>;

export type ApiResponse<TResult> = SharedApiResponse<TResult>;

export type IPost = {
  id: number;
  title: string;
  writer: string;
  content: string;
  createdAt: string;
  createdBy: string;
  commentCnt: number;
  subwayLineId: number;
  stationId?: number;
  imageUrl?: string;
  image?: IPostImage;
};

export type IPostImage = {
  imageId: number;
  imageUrl: string;
};

export interface EditableImage {
  id: number | null;
  data: File | null;
  url: string;
}

export type IRecommendPost = Pick<IPost, 'id' | 'title' | 'writer' | 'createdAt' | 'imageUrl'>;

export type WithPostId = SharedWithPostId;

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
  isPrivate?: boolean;
  likeCnt?: number;
};

export type CommentList = {
  comments: {
    parentComment: Comment;
    childComments: Comment[];
  }[];
};

export enum SubwayLineFilterOptions {
  ALL_LINES = '0',
  ONLY_MY_LINE = '3',
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

export type ObjectQueryParams = Record<string, string | number | boolean>;

export type ObjectKeys<T extends Record<PropertyKey, unknown>> = `${Exclude<keyof T, symbol>}`;
