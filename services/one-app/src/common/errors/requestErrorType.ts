export type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type Body = BodyInit | object | null;

export type RequestErrorType = Error & {
  requestBody: Body;
  status: number;
  endpoint: string;
  errorCode: string;
  message: string;
  method?: Method;
};
