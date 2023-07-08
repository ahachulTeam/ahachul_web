import { ResponseCode } from '@/constants'
import { StandardResponse, ResponseStatus } from '@/types/common'

type Success<R> = {
  readonly tag: 'success'
  readonly result: R
}

type Failed<E> = {
  readonly tag: 'failed'
  readonly error: E
}

export type Try<E, R> = Failed<E> | Success<R>

export const success = <R>(result: R): Try<never, R> => ({ tag: 'success', result })

export const failed = <E>(error: E): Try<E, never> => ({ tag: 'failed', error })

export const isSuccess = <R>(ta: Try<unknown, R>): ta is Success<R> => ta.tag === 'success'

export const isFailed = <E>(ta: Try<E, unknown>): ta is Failed<E> => ta.tag === 'failed'

export const getOrElse = <E, R>(ta: Try<E, R>, defaultValue: (e: E) => R): R => {
  if (isFailed(ta)) {
    return defaultValue(ta.error)
  }

  return ta.result
}

export const map = <E, A, B>(ta: Try<E, A>, f: (a: A) => B): Try<E, B> => {
  if (isFailed(ta)) {
    return ta
  }
  return success(f(ta.result))
}

export const parseResponse = <T>(res: StandardResponse<T>): Try<ResponseStatus, T> => {
  if (res.code !== ResponseCode.SUCCESS) {
    return failed({
      code: res.code,
      message: res.message,
    })
  }

  return success(res.result)
}
