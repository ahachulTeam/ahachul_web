import type { TypeActivities } from '@/stackflow';
import type { KeyOf } from '@/types';

export type AuthenticatedActivityName = Extract<
  KeyOf<TypeActivities>,
  'TalkPage' | 'NotificationPage'
>;
export type UnauthenticatedActivityName = Extract<KeyOf<TypeActivities>, 'SignInPage'>;
export type NavigationActivityName = AuthenticatedActivityName | UnauthenticatedActivityName;

export interface NavigationLink {
  icon: React.ReactNode;
  authenticatedRoute: AuthenticatedActivityName;
  unauthenticatedRoute: UnauthenticatedActivityName;
}
