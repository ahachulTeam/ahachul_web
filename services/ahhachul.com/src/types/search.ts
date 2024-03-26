import { Nullable } from './utility-types';

export interface ISearchStore {
  showModal: boolean;
  keyword: Nullable<string>;
  history: Nullable<string[]>;
}
