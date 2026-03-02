export const API_PAGE_SIZE = {
  list: 10,
} as const;

export const API_SORT = {
  createdAtAsc: 'createdAt,asc',
  createdAtDesc: 'createdAt,desc',
  likesDesc: 'likes,desc',
} as const;

type Identifier = number | string;

export const API_SERVICE_PATHS = {
  community: 'community-posts',
  complaint: 'complaint-posts',
  lostFound: 'lost-posts',
  message: 'message-rooms',
} as const;

export type ApiServicePath = (typeof API_SERVICE_PATHS)[keyof typeof API_SERVICE_PATHS];

export const API_PATHS = {
  auth: {
    redirectUrl: '/auth/redirect-url',
    login: '/auth/login',
    refreshToken: '/auth/token/refresh',
    signOut: '/signout',
  },
  user: {
    profile: '/members',
    profileDetail: (nickname: Identifier) =>
      `/members/${encodeURIComponent(String(nickname))}/profile`,
    favoriteStations: '/members/bookmarks/stations',
    commuteCoachToday: '/v2/members/commute-coach/today',
    favoriteRouteRecommendations: '/v2/members/bookmarks/routes/recommendations',
    favoriteRoutes: '/v2/members/bookmarks/routes',
    favoriteRoute: (id: Identifier) => `/v2/members/bookmarks/routes/${id}`,
    routeConnectionRecommendations: '/v2/members/route-connections/recommendations',
    articleHistories: '/members/article-histories',
    checkNickname: '/members/check-nickname',
  },
  story: {
    myStoriesV2: '/v2/stories/me',
    memberStoriesV2: (nickname: Identifier) =>
      `/v2/members/${encodeURIComponent(String(nickname))}/stories`,
    publicStoriesV2: '/v2/stories/public',
    createV2: '/v2/stories',
    deleteV2: (storyId: Identifier) => `/v2/stories/${storyId}`,
  },
  community: {
    list: `/${API_SERVICE_PATHS.community}`,
    hotList: '/community-hot-posts',
    detail: (id: Identifier) => `/${API_SERVICE_PATHS.community}/${id}`,
    like: (id: Identifier) => `/${API_SERVICE_PATHS.community}/${id}/like`,
    bookmark: (id: Identifier) => `/${API_SERVICE_PATHS.community}/${id}/bookmark`,
    comments: (id: Identifier) => `/${API_SERVICE_PATHS.community}/${id}/comments`,
    comment: (postId: Identifier, commentId: Identifier) =>
      `/${API_SERVICE_PATHS.community}/${postId}/comments/${commentId}`,
  },
  complaint: {
    list: `/${API_SERVICE_PATHS.complaint}`,
    detail: (id: Identifier) => `/${API_SERVICE_PATHS.complaint}/${id}`,
    like: (id: Identifier) => `/${API_SERVICE_PATHS.complaint}/${id}/like`,
    bookmark: (id: Identifier) => `/${API_SERVICE_PATHS.complaint}/${id}/bookmark`,
    comments: (id: Identifier) => `/${API_SERVICE_PATHS.complaint}/${id}/comments`,
    comment: (postId: Identifier, commentId: Identifier) =>
      `/${API_SERVICE_PATHS.complaint}/${postId}/comments/${commentId}`,
  },
  lostFound: {
    list: `/${API_SERVICE_PATHS.lostFound}`,
    detail: (id: Identifier) => `/${API_SERVICE_PATHS.lostFound}/${id}`,
    like: (id: Identifier) => `/${API_SERVICE_PATHS.lostFound}/${id}/like`,
    bookmark: (id: Identifier) => `/${API_SERVICE_PATHS.lostFound}/${id}/bookmark`,
    comments: (id: Identifier) => `/${API_SERVICE_PATHS.lostFound}/${id}/comments`,
    comment: (postId: Identifier, commentId: Identifier) =>
      `/${API_SERVICE_PATHS.lostFound}/${postId}/comments/${commentId}`,
    status: (id: Identifier) => `/${API_SERVICE_PATHS.lostFound}/${id}/status`,
  },
  comment: {
    likes: (commentId: Identifier) => `/comments/${commentId}/likes`,
  },
  message: {
    rooms: `/${API_SERVICE_PATHS.message}`,
    roomMessages: (roomId: Identifier) => `/${API_SERVICE_PATHS.message}/${roomId}/messages`,
    messages: `/${API_SERVICE_PATHS.message}/messages`,
  },
  subway: {
    lines: '/subway-lines',
    trainRealTimes: '/trains/real-times',
    trainRealTimesV2: '/v2/trains/real-times',
    delayCenterOverviewV2: '/v2/delay-centers/overview',
    delayProofsV2: '/v2/delay-proofs',
    delayProofV2: (proofId: Identifier) => `/v2/delay-proofs/${proofId}`,
    subwayIncidentsV2: '/v2/subway/incidents',
    communityDelaySignalsV2: '/v2/community/delay-signals',
    stationTimeSummaryV2: '/v2/stations/times/summary',
    stationTimesFullV2: '/v2/stations/times/full',
    stationLastTrainRiskV2: '/v2/stations/times/last-train-risk',
    stationQuickExitsV2: '/v2/stations/quick-exits',
    stationNearbyPlacesV2: '/v2/stations/nearby-places',
    stationWeatherBriefV2: '/v2/stations/weather/brief',
    routeSearchV2: '/v2/subway/routes/search',
    routeSearchV3: '/v3/subway/routes/search',
  },
  foreigner: {
    stationGuideV2: '/v2/foreigner/stations/guide',
    communityPostTranslationV2: (postId: Identifier) =>
      `/v2/foreigner/community-posts/${postId}/translation`,
    stationSocialHotspotsV2: '/v2/foreigner/station-social/hotspots',
    stationSocialOverviewV2: '/v2/foreigner/station-social/overview',
    stationSocialMeetupsV2: '/v2/foreigner/station-social/meetups',
    stationSocialMeetupJoinV2: (meetupId: Identifier) =>
      `/v2/foreigner/station-social/meetups/${meetupId}/join`,
    stationSocialMeetupParticipantV2: (meetupId: Identifier, participantId: Identifier) =>
      `/v2/foreigner/station-social/meetups/${meetupId}/participants/${participantId}`,
    stationSocialMeetupMatchV2: (meetupId: Identifier) =>
      `/v2/foreigner/station-social/meetups/${meetupId}/match`,
  },
  dailyVote: {
    todayV2: '/v2/daily-votes/today',
    votesV2: (pollId: Identifier) => `/v2/daily-votes/${pollId}/votes`,
    stationPollsV2: (stationId: Identifier) => `/v2/daily-votes/stations/${stationId}/polls`,
    pollV2: (pollId: Identifier) => `/v2/daily-votes/polls/${pollId}`,
    commentsV2: (pollId: Identifier) => `/v2/daily-votes/${pollId}/comments`,
    commentLikeV2: (commentId: Identifier) => `/v2/daily-votes/comments/${commentId}/likes`,
  },
  common: {
    s3Presigned: (s3Key: string) => `/common/presigned/${s3Key}`,
  },
} as const;
