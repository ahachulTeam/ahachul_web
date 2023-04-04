import { HttpStatusCode } from "axios";

export type ErrorCode = "C1" | "U1" | "A1" | "A2" | "A3" | "A4" | "A5" | "A6" | "A7" | "B1";

export type ErrorCodeInfo = Partial<Record<ErrorCode, string>>;
export type APIErrorResponse = {
  code: ErrorCode;
  errors: string;
  message: string;
  status: HttpStatusCode;
  statusText: string;
};

// 임시 에러 코드
export const ERROR_MESSAGE: Partial<Record<HttpStatusCode, ErrorCodeInfo>> = {
  400: {
    U1: "이미 존재하는 닉네임이에요.",
  },
  401: {
    A1: "존재하지 않는 사용자예요.",
    A2: "유효한 액세스 토큰이 아니에요.",
    A3: "유효한 리프레시 토큰이 아니에요. 다시 로그인 해 주세요.",
    A4: "액세스 토큰이 만료되었어요. 새로운 액세스 토큰 발급 요청을 보내주세요.",
    A5: "리프레시 토큰이 존재하지 않아요.",
    A6: "잘못된 로그아웃 요청이에요. 액세스 토큰이나 리프레시 토큰이 존재하지 않아요.",
    A7: "접근 권한이 없습니다.",
  },
  403: {
    C1: "리소스가 존재하지 않아요.",
  },
  500: {
    B1: "",
  },
};
