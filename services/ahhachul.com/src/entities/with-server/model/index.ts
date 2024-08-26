/**
 * App Server Response
 */
interface IResponse<TResult> {
  code: string;
  message: string;
  result: TResult;
}

interface PageNavigationResponse {
  hasNext: boolean;
  nextPageNum?: number;
}
interface ResponseOfList<TData> extends PageNavigationResponse {
  posts: TData[];
}

export { IResponse, ResponseOfList };
