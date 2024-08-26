const PATH = {
  /** 홈 */
  home: '/',

  /** 민원 */
  complaints: {
    home: '/complaints',
    detail: {
      home: '/complaints/:articleId',
      edit: '/complaints/:articleId/edit',
    },
    create: {
      progress: '/complaints/create/progress',
      submit: '/complaints/create/submit',
    },
  },

  /** 유실물 */
  lost: {
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
      // 이용권 구매
      ticket: '/my/setting/ticket',
      // 즐겨찾는 역 설정
      register: '/my/register',
    },
  },

  /** 인증 관련 */
  authentication: {
    signin: '/signin',
    signup: {
      home: '/signup',
      terms: '/signup/terms',
      callback: {
        apple: '/signup/callback/apple',
        google: '/signup/callback/google',
        kakao: '/signup/callback/kakao',
        naver: '/signup/callback/naver',
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

  /** 전체 서비스  */
  allServices: '/all-services',
  /** 채팅 */
  chat: '/chat',
  /** 알림 */
  alarm: '/alarm',
} as const;

export { PATH };
