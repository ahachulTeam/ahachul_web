import {
  ActivatedCommunityIcon,
  ActivatedComplaintIcon,
  ActivatedHomeIcon,
  ActivatedLostFoundIcon,
  ActivatedProfileIcon,
  CommunityIcon,
  ComplaintIcon,
  HomeIcon,
  LostFoundIcon,
  ProfileIcon,
} from '@/assets/icons/system';

import type { NavItem } from './navItem/NaItem.type';

export const GNBList: NavItem[] = [
  {
    href: 'HomePage',
    icon: <HomeIcon />,
    activeIcon: <ActivatedHomeIcon />,
    label: '홈',
  },
  {
    href: 'CommunityPage',
    icon: <CommunityIcon />,
    activeIcon: <ActivatedCommunityIcon />,
    label: '커뮤니티',
  },
  {
    href: 'LostFoundPage',
    icon: <LostFoundIcon />,
    activeIcon: <ActivatedLostFoundIcon />,
    label: '유실물',
  },
  {
    href: 'ComplaintPage',
    icon: <ComplaintIcon />,
    activeIcon: <ActivatedComplaintIcon />,
    label: '민원',
  },
  {
    href: 'MyPage',
    icon: <ProfileIcon />,
    activeIcon: <ActivatedProfileIcon />,
    label: '마이',
  },
];
