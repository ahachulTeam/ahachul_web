import * as Sentry from '@sentry/react';

import { BaseError } from '@/common/errors/BaseError';
import { RequestFailedError } from '@/common/errors/RequestError';

type SentryLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug' | 'log';
type SendLogToSentry = {
  level?: SentryLevel;
  error: Error;
};

/**
 * level은 아래와 같은 용도에 맞게 지정해줍니다.
 *
 * fatal: 앱이 종료될 수 있는 치명적인 오류
 * error: 특정 기능 실패로 앱 종료까지는 아닌 오류
 * warning: 잠재적으로 문제가 될 수 있는 오류. 현재는 심각하지 않은 오류
 * info: 시스템의 정상적인 동작을 나타냄. 중요한 이벤트나 상태 변화 기록용
 * debug: 디버깅 목적으로 사용됨
 * log: 일반적인 로그 메세지
 */
export const sendLogToSentry = ({
  level = 'error',
  error,
}: SendLogToSentry) => {
  Sentry.withScope((scope) => {
    scope.setLevel(level);
    scope.setTag('environment', process.env.NODE_ENV);

    if (error instanceof BaseError) {
      const { name, message, currentPath, previousPath } = error;
      scope.setTags({
        url: window.location.href,
        name,
        message,
        currentPath: JSON.stringify(currentPath),
        previousPath: JSON.stringify(previousPath),
      });

      if (error instanceof RequestFailedError) {
        const {
          errorCode,
          errorMessage,
          endpoint,
          status,
          requestBody,
          method,
        } = error;
        scope.setTags({
          errorCode,
          errorMessage,
          endpoint,
          status,
          requestBody: JSON.stringify(requestBody),
          method,
        });
        Sentry.captureMessage(`${errorCode}: ${errorMessage}`);
      } else {
        Sentry.captureMessage(`${name}: ${message}`);
      }
    } else {
      const { name, message } = error;
      scope.setTags({
        url: window.location.href,
        name,
        message,
      });
      Sentry.captureMessage(`${name}: ${message}`);
    }
  });
};
