import { type HttpStatusCode } from 'axios';

type ErrorCode =
  | '100'
  | '101'
  | '102'
  | '103'
  | '200'
  | '201'
  | '202'
  | '203'
  | '204'
  | '205';

type CommonResponseMessages =
  | 'SUCCESS'
  | 'BAD_REQUEST'
  | 'INTERNAL_SERVER_ERROR'
  | '유효하지 않은 도메인입니다.'
  | '유효하지 않은 ID 토큰입니다.'
  | '유효기간이 만료된 엑세스 토큰입니다.'
  | '유효하지 않은 리프레쉬 토큰입니다.'
  | '유효기간이 만료된 리프레쉬 토큰입니다.'
  | '유효하지 않은 권한 코드입니다.'
  | '유효하지 않은 엑세스 토큰입니다.';

export type ErrorCodeInfo = Partial<Record<ErrorCode, CommonResponseMessages>>;

export class AssertionError extends Error {
  static assert(condition: boolean, message: string): asserts condition {
    if (!condition) {
      throw new AssertionError(message);
    }
  }
}

export const useErrorBoundary_this_hook_should_be_called_in_ErrorBoundary_props_children =
  'useErrorBoundary: this hook should be called in ErrorBoundary.props.children';

export const useErrorBoundaryGroup_this_hook_should_be_called_in_ErrorBoundary_props_children =
  'useErrorBoundaryGroup: this hook should be called in ErrorBoundary.props.children';
