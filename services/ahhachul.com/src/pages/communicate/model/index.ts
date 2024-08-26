import type { BaseArticle } from 'features/articles';
import type { ResponseOfList } from 'entities/with-server';

export type CategoryOfCommunity = 'FREE' | 'INSIGHT' | 'QUESTION';
export interface CommunityArticle extends BaseArticle {
  writer: string;
  hashTags: Array<string>;
  categoryType: CategoryOfCommunity;
}
export type CommunityList = ResponseOfList<CommunityArticle>;
