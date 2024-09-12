import type { Article, ArticleDetail } from 'features/articles';
import type { ResponseOfList } from 'entities/with-server';

export type ComplaintType =
  | 'ENVIRONMENTAL_COMPLAINT'
  | 'TEMPERATURE_CONTROL'
  | 'DISORDER'
  | 'ANNOUNCEMENT'
  | 'EMERGENCY_PATIENT'
  | 'VIOLENCE'
  | 'SEXUAL_HARASSMENT';
export type ShortComplaintType =
  | 'WASTE'
  | 'VOMIT'
  | 'VENTILATION_REQUEST'
  | 'NOISY'
  | 'NOT_HEARD'
  | 'TOO_HOT'
  | 'TOO_COLD'
  | 'MOBILE_VENDOR'
  | 'DRUNK'
  | 'HOMELESS'
  | 'BEGGING'
  | 'RELIGIOUS_ACTIVITY'
  | 'SELF'
  | 'WITNESS'
  | 'VICTIM';

export interface ComplaintArticle extends Article {
  complaintType: ComplaintType;
  shortContentType: ShortComplaintType;
}
export type ComplaintList = ResponseOfList<ComplaintArticle>;
export interface ComplaintDetail extends ArticleDetail {}
