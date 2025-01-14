import type { TypeActivities } from 'app/stackflow';

import { NavbarIcons } from '../static';

export type NavType = {
  href: KeyOf<TypeActivities>;
  label: string;
  createPageOptions: Nullable<{ to: KeyOf<TypeActivities> }>;
  icon: () => React.ReactNode;
};

export const navlist: NavType[] = [
  {
    href: 'Home',
    icon: NavbarIcons.HomeTab,
    label: '홈',
    createPageOptions: null,
  },
  {
    href: 'Complaint',
    icon: NavbarIcons.ComplaintTab,
    label: '민원',
    createPageOptions: {
      to: 'ComplaintList',
    },
  },
  {
    href: 'LostFound',
    icon: NavbarIcons.LostFoundTab,
    label: '유실물',
    createPageOptions: {
      to: 'CreateLostArticle',
    },
  },
  {
    href: 'Community',
    icon: NavbarIcons.CommunityTab,
    label: '커뮤니티',
    createPageOptions: {
      to: 'CreateCommunityArticle',
    },
  },
];
