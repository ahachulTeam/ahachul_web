import type { Article } from 'features/articles';
import type { ResponseOfList } from 'entities/with-server';

export type LostType = 'LOST' | 'ACQUIRE';
export type LostStatusType = 'PROGRESS' | 'COMPLETE';
export interface LostFoundArticle extends Article {
  status: LostStatusType;
}
export type LostList = ResponseOfList<LostFoundArticle>;
