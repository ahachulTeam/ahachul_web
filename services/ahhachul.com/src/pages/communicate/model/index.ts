import type { Article, WithHashTags } from 'features/articles';
import type { ResponseOfList } from 'entities/with-server';

export type CategoryOfCommunity = 'FREE' | 'INSIGHT' | 'QUESTION';
export interface CommunityArticle extends Article {
  categoryType: CategoryOfCommunity;
}
export type CommunityList = ResponseOfList<CommunityArticle>;
