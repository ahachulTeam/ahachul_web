export type KeyOf<T> = keyof T;
export type ValueOf<T> = T[keyof T];
export type StringRecord = Record<string, string>;
export type ObjectKeys<T extends Record<PropertyKey, unknown>> = `${Exclude<keyof T, symbol>}`;

export interface IResponse<TResult> {
  code: string;
  message: string;
  result: TResult;
}

export interface CursorBasedPaginationParams {
  pageSize: number;
  pageToken?: string;
}

export interface CursorBasedPaginationResponse {
  hasNext: boolean;
  pageToken: string | null;
}

export interface ListResponseWithPagination<TData> extends CursorBasedPaginationResponse {
  data: TData[];
}

export type CreateFormDataParams<T extends Record<string, any>> = {
  jsonDataKey: string;
  jsonData: T;
  fileDataKey: string;
  fileData: File[];
};

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

export type RecommendPost = Pick<Post, 'id' | 'title' | 'writer' | 'createdAt' | 'imageUrl'>;

export interface PostImage {
  imageId: number;
  imageUrl: string;
}

type CommentStatus = 'CREATED' | 'DELETED';

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
} & Partial<OptionalCommentFields>;

export type OptionalCommentFields = {
  likeCnt: number;
};

export interface CommentList {
  comments: {
    parentComment: Comment;
    childComments: Comment[];
  }[];
}

export interface WithSubwayLineId {
  subwayLineId: number;
}

export enum SubwayLineFilterOptions {
  ALL_LINES = 'ALL_LINES',
  ONLY_MY_LINE = 'ONLY_MY_LINE',
}
