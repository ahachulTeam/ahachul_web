import { sendLogToSentry } from './sendLogToSentry';

import { BaseError } from '@/common/errors/BaseError';
import { RequestFailedError } from '@/common/errors/RequestError';
import { SERVER_ERROR_MESSAGES } from '@/common/constants/serverErrorMessages';

export const captureError = async (error: Error) => {
  if (process.env.NODE_ENV !== 'production') return;

  // instanceof 연산자는 객체의 프로토타입 체인을 따라 올라가면서 일치하는 생성자를 찾습니다.
  // 따라서 (RequestFailedError가 BaseError를 상속하는 클래스여도)
  // RequestFailedError의 인스턴스는 RequestFailedError의 instanceof 체크에서 먼저 true를 반환하게 됩니다.
  if (error instanceof RequestFailedError) {
    switch (error.errorMessage) {
      case SERVER_ERROR_MESSAGES.INTERNAL_SERVER_ERROR:
        sendLogToSentry({ error, level: 'fatal' });
        break;
      case SERVER_ERROR_MESSAGES.INVALID_DOMAIN:
      case SERVER_ERROR_MESSAGES.INVALID_ID_TOKEN:
      case SERVER_ERROR_MESSAGES.EXPIRED_ACCESS_TOKEN:
      case SERVER_ERROR_MESSAGES.INVALID_REFRESH_TOKEN:
      case SERVER_ERROR_MESSAGES.EXPIRED_REFRESH_TOKEN:
      case SERVER_ERROR_MESSAGES.INVALID_PERMISSION_CODE:
      case SERVER_ERROR_MESSAGES.INVALID_ACCESS_TOKEN:
        sendLogToSentry({ error, level: 'info' });
        break;
      case SERVER_ERROR_MESSAGES.BAD_REQUEST:
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
