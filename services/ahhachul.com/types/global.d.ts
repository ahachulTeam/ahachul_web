declare global {
  /**
   * Custom utility types
   */
  export type Nullable<T> = T | null;

  export type KeyOf<T> = keyof T;
  export type Keys<T extends Record<string, unknown>> = keyof T;

  export type ValueOf<T> = T[keyof T];
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type IndexOf<T, K extends KeyOf<T>> = ValueOf<T[K]>;
  export type OmitKeyOf<TObject extends object, TKey extends keyof TObject> = Omit<TObject, TKey>;

  /**
   * App Server Response
   */
  export interface IResponse<TResult> {
    /** 응답코드 */
    code: string;
    /** 응답메시지 */
    message: string;
    /** response data */
    result: TResult;
  }
}

export {};
