import Home from '@/src/static/icons/navbar/IconMenuHome';
import Reservation from '@/src/static/icons/navbar/IconMenuReservation';
import BPay from '@/src/static/icons/navbar/IconMenuBPay';
import Community from '@/src/static/icons/navbar/IconMenuCommunity';

const BOTTOM_NAVBAR_LIST = [
  {
    href: 'Home',
    Icon: Home,
    label: '홈',
  },
  {
    href: 'Complaints',
    Icon: BPay,
    label: '민원',
  },
  {
    href: 'Lost',
    Icon: Reservation,
    label: '유실물',
  },
  {
    href: 'Community',
    Icon: Community,
    label: '커뮤니티',
  },
] as const;

export { BOTTOM_NAVBAR_LIST };
