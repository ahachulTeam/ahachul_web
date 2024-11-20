import { sendLogToSentry } from './sendLogToSentry';

import { BaseError } from '@/common/errors/BaseError';
import { RequestFailedError } from '@/common/errors/RequestError';
import { SERVER_ERROR_MESSAGES } from '@/common/constants/serverErrorMessages';
import { IS_DEV_ENV } from '@/common/constants/env';

export const captureError = async (error: Error) => {
  // local 환경이면 얼리리턴
  if (IS_DEV_ENV) return;

  // instanceof 연산자는 객체의 프로토타입 체인을 따라 올라가면서 일치하는 생성자를 찾습니다.
  // 따라서 (RequestFailedError가 BaseError를 상속하는 클래스여도)
  // RequestFailedError의 인스턴스는 RequestFailedError의 instanceof 체크에서 먼저 true를 반환하게 됩니다.
  if (error instanceof RequestFailedError) {
    switch (error.errorMessage) {
      case SERVER_ERROR_MESSAGES[102]:
        sendLogToSentry({ error, level: 'fatal' });
        break;
      case SERVER_ERROR_MESSAGES[103]:
      case SERVER_ERROR_MESSAGES[200]:
      case SERVER_ERROR_MESSAGES[201]:
      case SERVER_ERROR_MESSAGES[203]:
      case SERVER_ERROR_MESSAGES[204]:
      case SERVER_ERROR_MESSAGES[205]:
        sendLogToSentry({ error, level: 'info' });
        break;
      case SERVER_ERROR_MESSAGES[101]:
        sendLogToSentry({ error, level: 'warning' });
        break;
      default:
        sendLogToSentry({ error, level: 'error' });
        break;
    }
  } else if (error instanceof BaseError) {
    sendLogToSentry({ error, level: 'error' });
  } else {
    sendLogToSentry({ error, level: 'fatal' });
  }
};
