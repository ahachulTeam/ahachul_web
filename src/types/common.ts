import { CommonResponseMessages, ErrorCode } from "@/constants";

export interface StandardResponse<T> {
  code: ErrorCode;
  message: CommonResponseMessages;
  result: T;
}
