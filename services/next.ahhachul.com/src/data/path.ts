const PATH = {
  /** 홈 */
  home: '/',

  /** 민원 */
  complaints: '/complaints',
  complaintDetail: '/complaints/:articleId',
  complaintsAskTrainNumber: '/complaints/askTrainNumber',
  complaintsSubmission: '/complaints/complaintsSubmission',

  /** 유실물  */
  lost: '/lost',
  lostDetail: '/lost/:articleId',
  lostEditor: '/lost/editor',

  /** 커뮤니티 */
  community: '/community',
  communityDetail: '/community/:articleId',
  communityEditor: '/community/editor',

  /** 채팅 관련 */
  chat: '/chat',

  /** 알림 관련 */
  alarm: '/alarm',

  /** 마이페이지 관련 */
  me: '/me',
  setting: '/me/setting',
  myTicket: '/me/setting/my-ticket',
  registerCenter: 'me/register-center',
  settingNickname: '/me/setting/nickname',

  /** 인증 관련 */
  signin: '/signin',
  signup: '/signup',
  signupTerms: '/signup/terms',
  signupRedirect: '/onboarding/redirect',

  /** 지하철 관련 */
  subwayMap: '/subway/map',
  subwayWarning: '/subway/warning', // 지하철 긴급 공지
  subwayTimeTable: '/subway/timeTable', // 지하철 시간표
  stationTalks: '/subway/community/station', // xx역 커뮤니티
  subwayLineTalks: '/subway/community/subway-line', // xx호선 커뮤니티

  /** 소개팅 관련 */
  blindDate: '/blind-date',
  blindDateForm: '/blind-date/form',
  blindDateMyPage: '/blind-date/me',
  blindDateMembership: '/blind-date/membership',

  /** 전체 서비스  */
  allServices: '/all-services',
} as const;

export { PATH };
