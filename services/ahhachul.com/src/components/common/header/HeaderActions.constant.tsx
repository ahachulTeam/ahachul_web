import { BellIcon, TalkIcon } from '@/assets/icons/system';

import type { NavigationLink } from './HeaderActions.type';

export const NAVIGATION_LINKS: NavigationLink[] = [
  {
    icon: <TalkIcon />,
    authenticatedRoute: 'TalkPage',
    unauthenticatedRoute: 'SignInPage',
  },
  {
    icon: <BellIcon />,
    authenticatedRoute: 'NotificationPage',
    unauthenticatedRoute: 'SignInPage',
  },
] as const;
