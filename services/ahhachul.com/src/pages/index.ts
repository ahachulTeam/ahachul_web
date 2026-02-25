import { EditCommentPage, NewCommentReplyPage } from './comment';
import { HashtagPage } from './hashtag';
import { NewsDetailPage } from './news';
import { NotificationPage, NotificationSettingPage } from './notification';
import { DelayProofPage } from './proofs';
import { SubwayMapPage, SubwayTimelinePage } from './subway';
import { TalkPage, TalkDetailPage, TalkSettingPage } from './talk';
import { UserProfilePage, UserProfilePreviewPage, UserProfileSettingPage } from './user';

export const SharingPages = {
  TalkPage,
  TalkDetailPage,
  TalkSettingPage,
  NotificationPage,
  NotificationSettingPage,
  EditCommentPage,
  NewCommentReplyPage,
  NewsDetailPage,
  HashtagPage,
  SubwayMapPage,
  SubwayTimelinePage,
  DelayProofPage,
  UserProfilePage,
  UserProfileSettingPage,
  UserProfilePreviewPage,
} as const;

export * as MyPages from './my';
export * as AuthPages from './auth';
export * as HomePages from './home';
export * as CommunityPages from './community';
export * as LostFoundPages from './lostFound';
export * as ComplaintPages from './complaint';
export * as ForeignerPages from './foreigner';
