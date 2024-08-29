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
  export type OmitKeyOf<
    TObject extends object,
    TKey extends keyof TObject,
  > = Omit<TObject, TKey>;

  export type PropOf<T> = T extends React.ComponentType<infer U> ? U : never;

  /**
   * For typescript compatibility
   */
  export interface HTMLSectionElement extends HTMLElement {}
}

export {};
