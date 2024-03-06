import Home from 'static/icons/navbar/IconMenuHome';
import Reservation from 'static/icons/navbar/IconMenuReservation';
import BPay from 'static/icons/navbar/IconMenuBPay';
import Community from 'static/icons/navbar/IconMenuCommunity';
import Schedule from 'static/icons/navbar/IconMenuSchedule';

const BOTTOM_NAVBAR_LIST = [
  {
    href: 'Home',
    Icon: Home,
    label: '홈',
  },
  {
    href: 'Reservation',
    Icon: Reservation,
    label: '예약',
  },
  {
    href: 'BPay',
    Icon: BPay,
    label: '비페이',
  },
  {
    href: 'Community',
    Icon: Community,
    label: '커뮤니티',
  },
  {
    href: 'Schedule',
    Icon: Schedule,
    label: '스케줄',
  },
] as const;

export { BOTTOM_NAVBAR_LIST };
