import type { Article, ArticleDetail } from 'features/articles';
import type { ResponseOfList } from 'entities/with-server';

export type LostType = 'LOST' | 'ACQUIRE';
export enum LostFoundType {
  LOST = 'LOST',
  ACQUIRE = 'ACQUIRE',
}
export type LostStatusType = 'PROGRESS' | 'COMPLETE';
export interface LostFoundArticle extends Article {
  status: LostStatusType;
}
export type LostList = ResponseOfList<LostFoundArticle>;
export interface LostFoundDetail extends ArticleDetail {}
