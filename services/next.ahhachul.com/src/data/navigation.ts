import Home from '@/src/static/icons/navbar/IconMenuHome';
import Reservation from '@/src/static/icons/navbar/IconMenuReservation';
import BPay from '@/src/static/icons/navbar/IconMenuBPay';
import Community from '@/src/static/icons/navbar/IconMenuCommunity';
import { PATH } from './path';

const BOTTOM_NAVBAR_LIST = [
  {
    href: PATH.home,
    Icon: Home,
    label: '홈',
  },
  {
    href: PATH.complaints,
    Icon: BPay,
    label: '민원',
  },
  {
    href: PATH.lost,
    Icon: Reservation,
    label: '유실물',
  },
  {
    href: PATH.community,
    Icon: Community,
    label: '커뮤니티',
  },
] as const;

export { BOTTOM_NAVBAR_LIST };
