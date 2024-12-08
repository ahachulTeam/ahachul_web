import type {
  Article,
  ArticleDetail,
  RecommendArticle,
} from 'features/articles';
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
export interface LostFoundDetail extends ArticleDetail {
  recommendPosts: RecommendArticle[];
  externalSourceImageUrl: string;
  isFromLost112: boolean;
  pageUrl: string;
  storage: string;
  storageNumber: number;
  status: LostStatusType;
}
