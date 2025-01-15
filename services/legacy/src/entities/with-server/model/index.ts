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
  pageToken?: number;
  nextPageNum?: number;
}
export interface ResponseOfList<TData> extends PageNavigationResponse {
  data: TData[];
}

export interface ResponseOfImage {
  imageId: number;
  imageUrl: string;
}
