const PATH = {
  home: '/',
  lost: '/lost',
  lostDetail: '/lost/:articleId',
  complaints: '/complaints',
  complaintsAskTrainNumber: '/complaints/askTrainNumber',
  complaintsSubmission: '/complaints/complaintsSubmission',
  complaintsComplete: '/complaints/complaintsComplete',
  community: '/community',
  communityDetail: '/community/:articleId',
  myProfile: '/myProfile',
  me: '/me',
  chat: '/chat',
  alarm: '/alarm',
  myTicket: '/my-ticket',
  registerCenter: 'register-center',
  setting: '/setting',
  login: '/login',
} as const;

export { PATH };
