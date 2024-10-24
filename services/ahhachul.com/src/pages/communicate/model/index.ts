import type { Article, ArticleDetail } from 'features/articles';
import type { ResponseOfList } from 'entities/with-server';

export type CategoryOfCommunity = 'FREE' | 'INSIGHT' | 'QUESTION';
export enum CommunityCategoryType {
  HOT = 'HOT',
  FREE = 'FREE',
  INSIGHT = 'INSIGHT',
  QUESTION = 'QUESTION',
}

export interface CommunityArticle extends Article {
  categoryType: CategoryOfCommunity;
}
export type CommunityList = ResponseOfList<CommunityArticle>;
export interface CommunityDetail extends ArticleDetail {}
