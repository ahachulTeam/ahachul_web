export const ERROR_MSG = {
  FIELD: '필수 항목을 입력해주세요.',
  EMAIL: '이메일 주소를 입력해주세요.',
  EMAIL_VALID: '올바른 이메일 주소를 입력해주세요.',
  PASSWORD: '비밀번호를 입력해주세요.',
  PASSWORD_IS_SAME: '현재 비밀번호와 다른 비밀번호를 입력해주세요.',
  PASSWORD_LENGTH: '8-20자로 입력해주세요.',
  PASSWORD_TYPE: '영문 대소문자, 숫자, 특수문자 중 2가지 이상 조합해주세요.',
  PASSWORD_CONFIRM: '비밀번호가 일치하지 않습니다.',
  ADDR: '주소를 입력해주세요.',
  NAME: '이름을 입력해주세요.',
  MOBILE: '휴대폰 번호를 입력해주세요.',
  MOBILE_VALID: '올바른 휴대폰 번호를 입력해주세요.',
  MOBILE_ALREADY: '이미 등록된 휴대폰 번호입니다.',
  INFO: '필수 정보를 입력해주세요.',
  REASON_CANCEL: '취소 사유를 입력해주세요.',
  REASON_CHANGE: '변경 사유를 입력해주세요.',
  DIGIT_NUM: '10~15자리 숫자를 입력해주세요.',
  ACCOUNT_INCORRECT: '이메일 또는 비밀번호가 올바르지 않습니다.',
  PASSWORD_INCORRECT: '현재 비밀번호가 올바르지 않습니다.',
} as const;

export const AUTH_ALERT_MSG = {
  SESSION_EXPIRED: '세션이 만료되었습니다.',
  INVALID_ACCESS_TOKEN: '유효기간이 만료된 엑세스 토큰입니다.',
  DUPLICATE_SIGNIN_DETECTED: '다른 기기에서 로그인되어 로그아웃되었습니다.',
} as const;
