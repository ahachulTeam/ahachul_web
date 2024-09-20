const PATH = {
  /** 홈 */
  home: '/',

  /** 민원 */
  complaints: {
    home: '/complaints',
    list: '/complaints/list',
    detail: {
      home: '/complaints/:articleId',
      edit: '/complaints/:articleId/edit',
    },
    create: '/complaints/create',
  },

  /** 유실물 */
  lostFound: {
    home: '/lost-found',
    create: '/lost-found/create',
    detail: {
      home: '/lost-found/:articleId',
      edit: '/lost-found/:articleId/edit',
    },
  },

  /** 커뮤니티 */
  community: {
    home: '/community',
    create: '/community/create',
    detail: {
      home: '/community/:articleId',
      edit: '/community/:articleId/edit',
    },
  },

  /** 마이페이지 관련 */
  my: {
    home: '/my',
    setting: {
      home: '/my/setting',
      // 즐겨찾는 역 설정
      register: '/my/register',
    },
  },

  /** 인증 관련 */
  authentication: {
    signIn: {
      home: '/signin',
      terms: '/signup/terms',
      setting: {
        subway: '/signup/setting/subway',
        nickname: '/signup/setting/nickname',
      },
    },
  },

  /** 지하철 관련 */
  subway: {
    home: '/subway',
    map: '/subway/map',
    warning: '/subway/warning', // 지하철 긴급 공지
    timeTable: '/subway/timeTable', // 지하철 시간표
  },

  /** 소개팅 관련 */
  date: {
    home: '/blind-date',
    me: '/blind-date/me',
    form: '/blind-date/form',
    membership: '/blind-date/membership',
  },

  '_shared-pages': {
    /** 전체 서비스  */
    allServices: '/all-services',
    /** 채팅 */
    chat: '/chat',
    /** 알림 */
    alarm: '/alarm',
    /** 지하철 공지사항 */
    subwayNotice: '/subway-notice',
    /** 중고거래 */
    market: '/market',
    /** 카셰어링 */
    carSharing: '/car-sharing',
  },
} as const;

export { PATH };
