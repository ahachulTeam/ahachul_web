import type { Article, ArticleDetail } from 'features/articles';
import type { ResponseOfList } from 'entities/with-server';

export type ComplaintType =
  | 'ENVIRONMENTAL_COMPLAINT'
  | 'TEMPERATURE_CONTROL'
  | 'DISORDER'
  | 'ANNOUNCEMENT'
  | 'EMERGENCY_PATIENT'
  | 'VIOLENCE'
  | 'SEXUAL_HARASSMENT'
  | 'OTHER_COMPLAINT';

export interface ComplaintArticle extends Article {
  complaintType: ComplaintType;
}
export type ComplaintList = ResponseOfList<ComplaintArticle>;
export interface ComplaintDetail extends ArticleDetail {}
