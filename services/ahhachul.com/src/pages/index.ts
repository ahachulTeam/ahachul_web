import { EditCommentPage, NewCommentReplyPage } from './comment';
import { NotificationPage, NotificationSettingPage } from './notification';
import { TalkPage, TalkDetailPage, TalkSettingPage } from './talk';

export const SharingPages = {
  TalkPage,
  TalkDetailPage,
  TalkSettingPage,
  NotificationPage,
  NotificationSettingPage,
  EditCommentPage,
  NewCommentReplyPage,
} as const;

export * as MyPages from './my';
export * as AuthPages from './auth';
export * as HomePages from './home';
export * as CommunityPages from './community';
export * as LostFoundPages from './lostFound';
export * as ComplaintPages from './complaint';
