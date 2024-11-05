export enum APIResponseCode {
  SUCCESS = 100,
  BAD_REQUEST = 101,
  INTERNAL_SERVER_ERROR = 102,
}

export const RESPONSE_MESSAGES: Record<APIResponseCode, string> = {
  [APIResponseCode.SUCCESS]: 'SUCCESS',
  [APIResponseCode.BAD_REQUEST]: 'BAD REQUEST',
  [APIResponseCode.INTERNAL_SERVER_ERROR]: 'INTERNAL SERVER ERROR',
};
