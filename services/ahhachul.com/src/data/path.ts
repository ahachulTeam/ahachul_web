const PATH = {
  home: '/',
  subwayMap: '/subwayMap',
  lost: '/lost',
  lostDetail: '/lost/:articleId',
  lostEditor: '/lost/editor',
  complaints: '/complaints',
  complaintsAskTrainNumber: '/complaints/askTrainNumber',
  complaintsSubmission: '/complaints/complaintsSubmission',
  complaintsComplete: '/complaints/complaintsComplete',
  community: '/community',
  communityDetail: '/community/:articleId',
  communityEditor: '/community/editor',
  myProfile: '/myProfile',
  me: '/me',
  chat: '/chat',
  alarm: '/alarm',
  myTicket: '/my-ticket',
  registerCenter: 'register-center',
  setting: '/setting',
  login: '/login',
  blindDate: '/blindDate',
  allServices: '/allServices',
  subwayWarning: '/subwayWarning',
  subwayTimeTable: '/subwayTimeTable',
  stationTalks: '/stationTalks',
  subwayLineTalks: '/subwayLineTalks',
} as const;

export { PATH };
