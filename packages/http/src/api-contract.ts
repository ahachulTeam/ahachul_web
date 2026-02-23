export const API_PAGE_SIZE = {
  list: 10,
} as const;

export const API_SORT = {
  createdAtAsc: 'createdAt,asc',
  createdAtDesc: 'createdAt,desc',
} as const;

type Identifier = number | string;

export const API_SERVICE_PATHS = {
  community: 'community-posts',
  complaint: 'complaint-posts',
  lostFound: 'lost-posts',
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
    favoriteStations: '/members/bookmarks/stations',
    checkNickname: '/members/check-nickname',
  },
  community: {
    list: `/${API_SERVICE_PATHS.community}`,
    hotList: '/community-hot-posts',
    detail: (id: Identifier) => `/${API_SERVICE_PATHS.community}/${id}`,
    comments: (id: Identifier) => `/${API_SERVICE_PATHS.community}/${id}/comments`,
  },
  complaint: {
    list: `/${API_SERVICE_PATHS.complaint}`,
    detail: (id: Identifier) => `/${API_SERVICE_PATHS.complaint}/${id}`,
    comments: (id: Identifier) => `/${API_SERVICE_PATHS.complaint}/${id}/comments`,
  },
  lostFound: {
    list: `/${API_SERVICE_PATHS.lostFound}`,
    detail: (id: Identifier) => `/${API_SERVICE_PATHS.lostFound}/${id}`,
    comments: (id: Identifier) => `/${API_SERVICE_PATHS.lostFound}/${id}/comments`,
    status: (id: Identifier) => `/${API_SERVICE_PATHS.lostFound}/${id}/status`,
  },
  subway: {
    lines: '/subway-lines',
    trainRealTimes: '/trains/real-times',
    trainRealTimesV2: '/v2/trains/real-times',
    stationTimeSummaryV2: '/v2/stations/times/summary',
    stationLastTrainRiskV2: '/v2/stations/times/last-train-risk',
    stationQuickExitsV2: '/v2/stations/quick-exits',
    stationNearbyPlacesV2: '/v2/stations/nearby-places',
  },
  common: {
    s3Presigned: (s3Key: string) => `/common/presigned/${s3Key}`,
  },
} as const;
