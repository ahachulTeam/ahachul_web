import { NavbarIcons } from '../static';

export const navlist = [
  {
    href: 'Home',
    icon: NavbarIcons.HomeTab,
    label: '홈',
  },
  {
    href: 'Complaint',
    icon: NavbarIcons.ComplaintTab,
    label: '민원',
  },
  {
    href: 'LostFound',
    icon: NavbarIcons.LostFoundTab,
    label: '유실물',
  },
  {
    href: 'Community',
    icon: NavbarIcons.CommunityTab,
    label: '커뮤니티',
  },
] as const;
