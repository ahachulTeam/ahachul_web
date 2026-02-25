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
    favoriteRouteRecommendations: '/v2/members/bookmarks/routes/recommendations',
    favoriteRoutes: '/v2/members/bookmarks/routes',
    favoriteRoute: (id: Identifier) => `/v2/members/bookmarks/routes/${id}`,
    articleHistories: '/members/article-histories',
    checkNickname: '/members/check-nickname',
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
  common: {
    s3Presigned: (s3Key: string) => `/common/presigned/${s3Key}`,
  },
} as const;
