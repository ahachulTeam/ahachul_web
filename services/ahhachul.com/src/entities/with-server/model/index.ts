/**
 * App Server Response
 */
export interface IResponse<TResult> {
  code: string;
  message: string;
  result: TResult;
}

interface PageNavigationResponse {
  hasNext: boolean;
  nextPageNum?: number;
}
export interface ResponseOfList<TData> extends PageNavigationResponse {
  posts: TData[];
}

export interface ResponseOfImage {
  imageId: number;
  imageUrl: string;
}
