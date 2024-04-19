import { KeyOf } from './KeyOf';
import { ValueOf } from './ValueOf';

export type IndexOf<T, K extends KeyOf<T>> = ValueOf<T[K]>;
