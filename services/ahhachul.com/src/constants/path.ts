import type { TypeActivities } from '@/stackflow';
import type { KeyOf } from '@/types';

export const PATH = {
  /** 홈 */
  home: '/',

  /** 유실물 */
  lostFound: {
    home: '/lost-found',
    detail: '/lost-found/:id',
    new: '/lost-found/new',
    edit: '/lost-found/:id/edit',
  },

  /** 커뮤니티 */
  community: {
    home: '/community',
    detail: '/community/:id',
    new: '/community/new',
    edit: '/community/:id/edit',
  },

  /** 민원 */
  complaint: {
    home: '/complaint',
    list: '/complaint/list',
    detail: '/complaint/:id',
    new: '/complaint/new',
    edit: '/complaint/:id/edit',
  },

  /** 마이페이지 관련 */
  me: {
    home: '/me',
    setting: '/me/setting',
  },

  /** 인증 관련 */
  auth: {
    login: '/login',
    callback: '/login/callback',
    /** 회원가입 시 필요한 초기 설정 페이지들 */
    settings: {
      subway: '/login/settings/subway',
      nickname: '/login/settings/nickname',
    },
  },

  /** 채팅 */
  talk: {
    home: '/talk',
    detail: '/talk/:id',
    setting: '/talk/settings',
  },
  /** 알림 */
  notification: {
    home: '/notification',
    setting: '/notification/settings',
  },
  /** 앱 환경 설정 */
  setting: '/setting',

  /** 댓글 */
  comment: {
    edit: '/comments/:commentId/edit',
    reply: '/comments/:commentId/reply',
  },
} as const;

export const MAIN_PATHS: KeyOf<TypeActivities>[] = [
  'MyPage',
  'HomePage',
  'CommunityPage',
  'LostFoundPage',
  'ComplaintPage',
] as const;
