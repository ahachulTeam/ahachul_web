import { WEB_SERVICE_URL } from '@/constants';

export type ShareablePageMap = {
  CommunityDetailPage: 'community';
  LostFoundDetailPage: 'lostFound';
  ComplaintDetailPage: 'complaint';
};

export type ShareableURLMap = {
  [K in keyof ShareablePageMap]: `${typeof WEB_SERVICE_URL}/${ShareablePageMap[K]}`;
};
