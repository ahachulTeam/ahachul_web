import { http, HttpResponse } from 'msw';

import { APIResponseCode } from '@ahhachul/domain';
import { API_PATHS, API_SERVICE_PATHS, API_SORT } from '@ahhachul/http';

const RESPONSE_MESSAGES = {
  success: 'SUCCESS',
  badRequest: 'BAD REQUEST',
  internalServerError: 'INTERNAL SERVER ERROR',
} as const;

const API_ROOT_SEGMENTS = [
  'auth',
  'members',
  'community-posts',
  'community-hot-posts',
  'complaint-posts',
  'lost-posts',
  'message-rooms',
  'subway-lines',
  'trains',
  'stations',
  'ranks',
  'reports',
  'comments',
  'signout',
  'mock-s3',
] as const;

type UnhandledRequestPrint = {
  warning(): void;
  error(): void;
};

type MockUnhandledRequestStrategy = (request: Request, print: UnhandledRequestPrint) => void;

type Gender = 'MALE' | 'FEMALE';
type AgeRange = '1' | '10' | '20' | '30' | '40' | '50' | '60' | '70' | '80' | '90';

type CommunityCategory = 'HOT' | 'FREE' | 'ISSUE' | 'INSIGHT' | 'HUMOR';
type ComplaintType =
  | 'ENVIRONMENTAL_COMPLAINT'
  | 'TEMPERATURE_CONTROL'
  | 'DISORDER'
  | 'ANNOUNCEMENT'
  | 'EMERGENCY_PATIENT'
  | 'VIOLENCE'
  | 'SEXUAL_HARASSMENT';
type ShortComplaintType =
  | 'WASTE'
  | 'VOMIT'
  | 'VENTILATION_REQUEST'
  | 'NOISY'
  | 'NOT_HEARD'
  | 'TOO_HOT'
  | 'TOO_COLD'
  | 'MOBILE_VENDOR'
  | 'DRUNK'
  | 'HOMELESS'
  | 'BEGGING'
  | 'RELIGIOUS_ACTIVITY'
  | 'SELF'
  | 'WITNESS'
  | 'VICTIM';

type LostType = 'LOST' | 'ACQUIRE';
type LostStatus = 'PROGRESS' | 'COMPLETE';
type CommentStatus = 'CREATED' | 'DELETED';

type MockUser = {
  memberId: number;
  nickname: string;
  email: string;
  gender: Gender;
  ageRange: AgeRange;
};

type MockPostImage = {
  imageId: number;
  imageUrl: string;
};

type MockRecommendPost = {
  id: number;
  title: string;
  writer: string;
  createdAt: string;
  imageUrl?: string;
};

type MockBasePost = {
  id: number;
  title: string;
  writer: string;
  content: string;
  createdAt: string;
  createdBy: string;
  commentCnt: number;
  subwayLineId: number;
  imageUrl?: string;
};

type MockCommunityPostDetail = MockBasePost & {
  likeCnt: number;
  viewCnt: number;
  hashTags: string[];
  regionType: 'METROPOLITAN';
  categoryType: CommunityCategory;
  likeYn: 'Y' | 'N';
  hateYn: 'Y' | 'N';
  hateCnt: number;
  hotPostYn: 'Y' | 'N';
  images: MockPostImage[];
};

type MockComplaintPostDetail = MockBasePost & {
  complaintType: ComplaintType;
  shortContentType: ShortComplaintType;
  trainNo: string;
  phoneNumber: string;
  location: number;
  status: 'CREATED' | 'DONE';
  images: MockPostImage[];
};

type MockLostFoundPostDetail = MockBasePost & {
  status: LostStatus;
  categoryName: string;
  pageUrl: string;
  storage: string;
  storageNumber: string;
  externalSourceImageUrl: string;
  isFromLost112: boolean;
  images: MockPostImage[];
  recommendPosts: MockRecommendPost[];
  lostType: LostType;
};

type MockComment = {
  id: number;
  title: string;
  writer: string;
  content: string;
  createdAt: string;
  createdBy: string;
  status: CommentStatus;
  upperCommentId: number | null;
};

type MockCommentThread = {
  parentComment: MockComment;
  childComments: MockComment[];
};

type MockFavoriteStation = {
  stationId: number;
  stationName: string;
  lineId: number;
  lineName: string;
  label: string;
  subwayLineInfoList: {
    subwayLineId: string;
    subwayLineName: string;
  }[];
};

type MockProfileVisibilitySettings = {
  profilePublic: boolean;
  emailPublic: boolean;
  genderAgePublic: boolean;
  postsPublic: boolean;
  commentsPublic: boolean;
};

type MockFavoriteRouteNode = {
  stationId: number;
  stationName: string;
  order: number;
  favorite: boolean;
};

type MockFavoriteRouteEdge = {
  fromStationId: number;
  toStationId: number;
  subwayLineId: number;
  subwayLineName: string;
};

type MockFavoriteRouteSummary = {
  totalStops: number;
  transferCount: number;
  estimatedMinutes: number;
};

type MockFavoriteRoute = {
  routeId: number | null;
  routeType: 'RECOMMENDED' | 'CUSTOM';
  title: string | null;
  sourceStationId: number;
  sourceStationName: string;
  destinationStationId: number;
  destinationStationName: string;
  nodes: MockFavoriteRouteNode[];
  edges: MockFavoriteRouteEdge[];
  summary: MockFavoriteRouteSummary;
};

type MockSubwayLine = {
  id: number;
  name: string;
  phoneNumber: string;
  stations: {
    id: number;
    name: string;
  }[];
};

type MockArticleType = 'COMMUNITY' | 'COMPLAINT' | 'LOST';

type MockArticleHistoryItem = {
  articleType: MockArticleType;
  articleId: number;
  title: string;
  contentPreview: string;
  writer: string;
  subwayLineId: number;
  stationId: number;
  articleCreatedAt: string;
  reactedAt: string;
};

type MockMessageRoom = {
  roomId: number;
  partnerMemberId: number;
  partnerNickname: string;
  lastMessageContent: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
};

type MockMessageThreadItem = {
  messageId: number;
  senderMemberId: number;
  senderNickname: string;
  content: string;
  createdAt: string;
  mine: boolean;
  readYn: 'Y' | 'N';
};

type MockDelayProofOfficialIncident = {
  eventId: string;
  occurredAt: string;
  resolvedAt: string | null;
  severity: string;
  title: string;
  description: string;
  source: string;
  sourceUrl: string | null;
};

type MockDelayProofCommunitySignal = {
  postId: number;
  createdAt: string;
  writer: string;
  matchedKeyword: string;
  reportedDelayMin: number | null;
  snippet: string;
};

type MockDelayProofPayload = {
  proofId: string;
  issuedAt: string;
  expiresAt: string;
  grade: 'A' | 'B' | 'C';
  confidenceLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  evidenceSummary: {
    official: {
      matched: boolean;
      eventCount: number;
      dataSource: string;
      incidents: MockDelayProofOfficialIncident[];
    };
    community: {
      signalCount: number;
      distinctAuthors: number;
      medianReportedDelayMin: number | null;
      confidenceLevel: 'HIGH' | 'MEDIUM' | 'LOW';
      signals: MockDelayProofCommunitySignal[];
    };
    realtime: {
      isStale: boolean;
      freshnessSec: number;
      confidenceLevel: 'HIGH' | 'MEDIUM' | 'LOW';
      generatedAt: string;
    };
  };
  text: string;
  shareUrl: string;
  signature: string;
};

type MockState = {
  user: MockUser;
  communityPosts: MockCommunityPostDetail[];
  complaintPosts: MockComplaintPostDetail[];
  lostFoundPosts: MockLostFoundPostDetail[];
  likedArticleIds: Record<MockArticleType, Set<number>>;
  bookmarkedArticleIds: Record<MockArticleType, Set<number>>;
  comments: Record<string, MockCommentThread[]>;
  favoriteStations: MockFavoriteStation[];
  profileVisibility: MockProfileVisibilitySettings;
  favoriteRoutes: MockFavoriteRoute[];
  messageRooms: MockMessageRoom[];
  messageThreads: Record<number, MockMessageThreadItem[]>;
  delayProofs: Record<string, MockDelayProofPayload>;
  subwayLines: MockSubwayLine[];
  nextPostId: number;
  nextCommentId: number;
  nextMessageId: number;
  nextFavoriteRouteId: number;
  auth: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
  };
};

type RouteContext = {
  request: Request;
  url: URL;
  rawPathname: string;
  normalizedPath: string;
  params: Record<string, string>;
};

type RouteDefinition = {
  method: string;
  pattern: string;
  resolver: (context: RouteContext) => Promise<Response> | Response;
};

const DEFAULT_PAGE_SIZE = 10;

const SUBWAY_LINES: MockSubwayLine[] = [
  { id: 1, name: '1호선', phoneNumber: '1577-1234', stations: [{ id: 101, name: '서울역' }] },
  { id: 2, name: '2호선', phoneNumber: '1577-1234', stations: [{ id: 201, name: '강남역' }] },
  { id: 3, name: '3호선', phoneNumber: '1577-1234', stations: [{ id: 301, name: '고속터미널역' }] },
  { id: 4, name: '4호선', phoneNumber: '1577-1234', stations: [{ id: 401, name: '사당역' }] },
  { id: 5, name: '5호선', phoneNumber: '1577-1234', stations: [{ id: 501, name: '광화문역' }] },
  { id: 6, name: '6호선', phoneNumber: '1577-1234', stations: [{ id: 601, name: '합정역' }] },
  { id: 7, name: '7호선', phoneNumber: '1577-1234', stations: [{ id: 701, name: '건대입구역' }] },
  { id: 8, name: '8호선', phoneNumber: '1577-1234', stations: [{ id: 801, name: '잠실역' }] },
  { id: 9, name: '9호선', phoneNumber: '1577-1234', stations: [{ id: 901, name: '여의도역' }] },
  { id: 10, name: '경강선', phoneNumber: '1577-1234', stations: [{ id: 1001, name: '판교역' }] },
  {
    id: 11,
    name: '경의중앙선',
    phoneNumber: '1577-1234',
    stations: [{ id: 1101, name: '용산역' }],
  },
  { id: 12, name: '경춘선', phoneNumber: '1577-1234', stations: [{ id: 1201, name: '상봉역' }] },
  {
    id: 13,
    name: '공항철도',
    phoneNumber: '1577-1234',
    stations: [{ id: 1301, name: '홍대입구역' }],
  },
  { id: 15, name: '서해선', phoneNumber: '1577-1234', stations: [{ id: 1501, name: '소사역' }] },
  {
    id: 16,
    name: '수인분당선',
    phoneNumber: '1577-1234',
    stations: [{ id: 1601, name: '선릉역' }],
  },
  { id: 18, name: '신분당선', phoneNumber: '1577-1234', stations: [{ id: 1801, name: '정자역' }] },
  {
    id: 20,
    name: '우이신설경전철',
    phoneNumber: '1577-1234',
    stations: [{ id: 2001, name: '북한산우이역' }],
  },
];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toIsoDate(minutesAgo: number): string {
  const base = new Date('2026-02-17T12:00:00.000Z').getTime();
  return new Date(base - minutesAgo * 60 * 1000).toISOString();
}

function createImages(postId: number, count = 2): MockPostImage[] {
  return Array.from({ length: count }, (_, index) => ({
    imageId: postId * 100 + index + 1,
    imageUrl: `https://images.ahhachul.mock/posts/${postId}/${index + 1}.jpg`,
  }));
}

function createInitialCommunityPosts(): MockCommunityPostDetail[] {
  const categories: CommunityCategory[] = ['FREE', 'ISSUE', 'INSIGHT', 'HUMOR', 'HOT'];

  return Array.from({ length: 18 }, (_, index) => {
    const id = 1000 + index + 1;
    const category = categories[index % categories.length];
    const images = createImages(id, 2);

    return {
      id,
      title: `[커뮤니티] 샘플 게시글 ${id}`,
      writer: '아차철러',
      content: `커뮤니티 샘플 본문 ${id}`,
      createdAt: toIsoDate(index * 40 + 10),
      createdBy: '1',
      commentCnt: (index % 4) + 1,
      subwayLineId: (index % 9) + 1,
      imageUrl: images[0]?.imageUrl,
      likeCnt: 60 - index,
      viewCnt: 320 - index * 4,
      hashTags: ['지하철', '아차철', `태그${(index % 4) + 1}`],
      regionType: 'METROPOLITAN',
      categoryType: category,
      likeYn: 'N',
      hateYn: 'N',
      hateCnt: index % 3,
      hotPostYn: category === 'HOT' ? 'Y' : 'N',
      images,
    };
  });
}

function createInitialComplaintPosts(): MockComplaintPostDetail[] {
  const complaintTypes: ComplaintType[] = [
    'ENVIRONMENTAL_COMPLAINT',
    'TEMPERATURE_CONTROL',
    'DISORDER',
    'ANNOUNCEMENT',
    'EMERGENCY_PATIENT',
    'VIOLENCE',
    'SEXUAL_HARASSMENT',
  ];

  const shortTypes: ShortComplaintType[] = [
    'WASTE',
    'VOMIT',
    'VENTILATION_REQUEST',
    'NOISY',
    'NOT_HEARD',
    'TOO_HOT',
    'TOO_COLD',
    'MOBILE_VENDOR',
    'DRUNK',
    'HOMELESS',
    'BEGGING',
    'RELIGIOUS_ACTIVITY',
    'SELF',
    'WITNESS',
    'VICTIM',
  ];

  return Array.from({ length: 14 }, (_, index) => {
    const id = 2000 + index + 1;
    const images = createImages(id, 1);

    return {
      id,
      title: `[민원] 샘플 게시글 ${id}`,
      writer: '아차철러',
      content: `민원 샘플 본문 ${id}`,
      createdAt: toIsoDate(index * 50 + 30),
      createdBy: '1',
      commentCnt: index % 3,
      subwayLineId: (index % 9) + 1,
      imageUrl: images[0]?.imageUrl,
      complaintType: complaintTypes[index % complaintTypes.length],
      shortContentType: shortTypes[index % shortTypes.length],
      trainNo: `${200 + index}`,
      phoneNumber: '01012345678',
      location: (index % 8) + 1,
      status: index % 2 === 0 ? 'CREATED' : 'DONE',
      images,
    };
  });
}

function createInitialLostFoundPosts(): MockLostFoundPostDetail[] {
  const lostTypes: LostType[] = ['LOST', 'ACQUIRE'];

  return Array.from({ length: 16 }, (_, index) => {
    const id = 3000 + index + 1;
    const lostType = lostTypes[index % lostTypes.length];
    const images = createImages(id, 2);

    return {
      id,
      title: `[유실물] 샘플 게시글 ${id}`,
      writer: '아차철러',
      content: `유실물 샘플 본문 ${id}`,
      createdAt: toIsoDate(index * 35 + 20),
      createdBy: '1',
      commentCnt: index % 5,
      subwayLineId: (index % 9) + 1,
      imageUrl: images[0]?.imageUrl,
      status: index % 2 === 0 ? 'PROGRESS' : 'COMPLETE',
      categoryName: lostType === 'LOST' ? '분실물' : '습득물',
      pageUrl: `https://ahhachul.mock/lost-found/${id}`,
      storage: '서울교통공사 유실물센터',
      storageNumber: '02-1234-5678',
      externalSourceImageUrl: images[0]?.imageUrl ?? '',
      isFromLost112: false,
      images,
      recommendPosts: [
        {
          id: 3900 + index,
          title: `추천 유실물 ${index + 1}`,
          writer: '아차철러',
          createdAt: toIsoDate(index * 20 + 40),
          imageUrl: images[0]?.imageUrl,
        },
      ],
      lostType,
    };
  });
}

function createInitialComments(
  communityPosts: MockCommunityPostDetail[],
  complaintPosts: MockComplaintPostDetail[],
  lostFoundPosts: MockLostFoundPostDetail[],
): Record<string, MockCommentThread[]> {
  const comments: Record<string, MockCommentThread[]> = {};
  let commentIdSeed = 7000;

  const addDefaultThread = (servicePath: string, postId: number) => {
    const parentId = commentIdSeed++;
    comments[commentKey(servicePath, postId)] = [
      {
        parentComment: {
          id: parentId,
          title: '댓글',
          writer: '아차철러',
          content: `샘플 댓글 ${parentId}`,
          createdAt: toIsoDate(parentId % 300),
          createdBy: '1',
          status: 'CREATED',
          upperCommentId: null,
        },
        childComments: [
          {
            id: commentIdSeed++,
            title: '댓글',
            writer: '아차철러',
            content: `샘플 대댓글 ${parentId}`,
            createdAt: toIsoDate(parentId % 150),
            createdBy: '1',
            status: 'CREATED',
            upperCommentId: parentId,
          },
        ],
      },
    ];
  };

  for (const post of communityPosts.slice(0, 8)) {
    addDefaultThread(API_SERVICE_PATHS.community, post.id);
  }

  for (const post of complaintPosts.slice(0, 6)) {
    addDefaultThread(API_SERVICE_PATHS.complaint, post.id);
  }

  for (const post of lostFoundPosts.slice(0, 8)) {
    addDefaultThread(API_SERVICE_PATHS.lostFound, post.id);
  }

  return comments;
}

function createInitialMessageData() {
  const rooms: MockMessageRoom[] = [
    {
      roomId: 1,
      partnerMemberId: 21,
      partnerNickname: '출근메이트',
      lastMessageContent: '오늘 2호선 지연이네요.',
      lastMessageAt: toIsoDate(8),
      unreadCount: 1,
    },
    {
      roomId: 2,
      partnerMemberId: 42,
      partnerNickname: '안암러버',
      lastMessageContent: '안암역 3번 출구 근처 괜찮은 식당 있어요.',
      lastMessageAt: toIsoDate(35),
      unreadCount: 0,
    },
  ];

  const messageThreads: Record<number, MockMessageThreadItem[]> = {
    1: [
      {
        messageId: 5001,
        senderMemberId: 21,
        senderNickname: '출근메이트',
        content: '오늘 2호선 지연 이슈 떴어요.',
        createdAt: toIsoDate(20),
        mine: false,
        readYn: 'Y',
      },
      {
        messageId: 5002,
        senderMemberId: 1,
        senderNickname: '아차철러',
        content: '확인했어요. 회사에 연락해야겠네요.',
        createdAt: toIsoDate(14),
        mine: true,
        readYn: 'Y',
      },
      {
        messageId: 5003,
        senderMemberId: 21,
        senderNickname: '출근메이트',
        content: '오늘 2호선 지연이네요.',
        createdAt: toIsoDate(8),
        mine: false,
        readYn: 'N',
      },
    ],
    2: [
      {
        messageId: 5004,
        senderMemberId: 42,
        senderNickname: '안암러버',
        content: '안암역 3번 출구 근처 괜찮은 식당 있어요.',
        createdAt: toIsoDate(35),
        mine: false,
        readYn: 'Y',
      },
    ],
  };

  return {
    rooms,
    messageThreads,
    nextMessageId: 5005,
  };
}

function createDelayProofPayload(
  proofId: string,
  stationId: number,
  subwayLineId: number,
): MockDelayProofPayload {
  const issuedAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
  const incidents: MockDelayProofOfficialIncident[] = [
    {
      eventId: `evt-${stationId}-${subwayLineId}`,
      occurredAt: toIsoDate(16),
      resolvedAt: null,
      severity: 'MEDIUM',
      title: '신호 장애로 인한 지연',
      description: '일부 구간에서 열차 간격 조정 중입니다.',
      source: '서울교통공사',
      sourceUrl: null,
    },
  ];
  const signals: MockDelayProofCommunitySignal[] = [
    {
      postId: 1001,
      createdAt: toIsoDate(10),
      writer: '아차철러',
      matchedKeyword: '지연',
      reportedDelayMin: 8,
      snippet: '지금 체감상 8분 정도 늦어요.',
    },
  ];

  return {
    proofId,
    issuedAt,
    expiresAt,
    grade: 'B',
    confidenceLevel: 'MEDIUM',
    evidenceSummary: {
      official: {
        matched: true,
        eventCount: incidents.length,
        dataSource: 'API',
        incidents,
      },
      community: {
        signalCount: signals.length,
        distinctAuthors: 1,
        medianReportedDelayMin: 8,
        confidenceLevel: 'MEDIUM',
        signals,
      },
      realtime: {
        isStale: false,
        freshnessSec: 28,
        confidenceLevel: 'HIGH',
        generatedAt: issuedAt,
      },
    },
    text: '열차 지연이 공식/커뮤니티 신호로 확인되어 지연 증빙을 발급했습니다.',
    shareUrl: `https://ahhachul.mock/delay-proofs/${proofId}`,
    signature: `mock-signature-${proofId}`,
  };
}

function toArticleHistoryItem(
  articleType: MockArticleType,
  post: MockCommunityPostDetail | MockComplaintPostDetail | MockLostFoundPostDetail,
  reactedAt: string,
): MockArticleHistoryItem {
  return {
    articleType,
    articleId: post.id,
    title: post.title,
    contentPreview: post.content.slice(0, 80),
    writer: post.writer,
    subwayLineId: post.subwayLineId,
    stationId: post.subwayLineId * 100 + 1,
    articleCreatedAt: post.createdAt,
    reactedAt,
  };
}

function findStationById(
  stationId: number,
  favoriteStations: MockFavoriteStation[],
): { stationName: string; lineId: number; lineName: string } {
  const favorite = favoriteStations.find(station => station.stationId === stationId);
  if (favorite) {
    return {
      stationName: favorite.stationName,
      lineId: favorite.lineId,
      lineName: favorite.lineName,
    };
  }

  for (const line of SUBWAY_LINES) {
    const station = line.stations.find(item => item.id === stationId);
    if (station) {
      return {
        stationName: station.name,
        lineId: line.id,
        lineName: line.name,
      };
    }
  }

  return {
    stationName: `역${stationId}`,
    lineId: 2,
    lineName: '2호선',
  };
}

function createMockFavoriteRoute(
  sourceStationId: number,
  destinationStationId: number,
  favoriteStations: MockFavoriteStation[],
  options: {
    routeType: 'RECOMMENDED' | 'CUSTOM';
    routeId: number | null;
    title?: string | null;
  },
): MockFavoriteRoute {
  const source = findStationById(sourceStationId, favoriteStations);
  const destination = findStationById(destinationStationId, favoriteStations);
  const subwayLineId = source.lineId || destination.lineId || 2;
  const subwayLineName = source.lineName || destination.lineName || `${subwayLineId}호선`;

  const estimatedMinutes = Math.max(
    6,
    Math.min(45, 8 + (Math.abs(sourceStationId - destinationStationId) % 20)),
  );

  return {
    routeId: options.routeId,
    routeType: options.routeType,
    title: options.title ?? null,
    sourceStationId,
    sourceStationName: source.stationName,
    destinationStationId,
    destinationStationName: destination.stationName,
    nodes: [
      {
        stationId: sourceStationId,
        stationName: source.stationName,
        order: 1,
        favorite: favoriteStations.some(station => station.stationId === sourceStationId),
      },
      {
        stationId: destinationStationId,
        stationName: destination.stationName,
        order: 2,
        favorite: favoriteStations.some(station => station.stationId === destinationStationId),
      },
    ],
    edges: [
      {
        fromStationId: sourceStationId,
        toStationId: destinationStationId,
        subwayLineId,
        subwayLineName,
      },
    ],
    summary: {
      totalStops: Math.max(
        2,
        Math.min(12, 2 + (Math.abs(sourceStationId - destinationStationId) % 8)),
      ),
      transferCount: source.lineId === destination.lineId ? 0 : 1,
      estimatedMinutes,
    },
  };
}

function buildRecommendedRoutes(limit: number): MockFavoriteRoute[] {
  const stationIds = Array.from(
    new Set(
      state.favoriteStations.map(station => station.stationId).filter(id => Number.isFinite(id)),
    ),
  );

  if (stationIds.length < 2) {
    return [];
  }

  const routes: MockFavoriteRoute[] = [];
  const source = stationIds[0];
  for (let index = 1; index < stationIds.length; index += 1) {
    const destination = stationIds[index];
    routes.push(
      createMockFavoriteRoute(source, destination, state.favoriteStations, {
        routeType: 'RECOMMENDED',
        routeId: null,
      }),
    );
  }

  if (stationIds.length >= 3) {
    routes.push(
      createMockFavoriteRoute(stationIds[1], stationIds[2], state.favoriteStations, {
        routeType: 'RECOMMENDED',
        routeId: null,
      }),
    );
  }

  return routes.slice(0, Math.max(1, Math.min(limit, 10)));
}

function resolveArticleTypeByServicePath(servicePath: string): MockArticleType {
  if (servicePath === API_SERVICE_PATHS.community) {
    return 'COMMUNITY';
  }
  if (servicePath === API_SERVICE_PATHS.complaint) {
    return 'COMPLAINT';
  }
  return 'LOST';
}

function buildProfilePostActivities(limit: number) {
  const posts = [
    ...state.communityPosts.map(post => ({ articleType: 'COMMUNITY' as const, post })),
    ...state.complaintPosts.map(post => ({ articleType: 'COMPLAINT' as const, post })),
    ...state.lostFoundPosts.map(post => ({ articleType: 'LOST' as const, post })),
  ]
    .sort((a, b) => b.post.createdAt.localeCompare(a.post.createdAt))
    .slice(0, limit)
    .map(({ articleType, post }) => ({
      articleType,
      articleId: post.id,
      title: post.title,
      contentPreview: post.content.slice(0, 120),
      writer: post.writer,
      subwayLineId: post.subwayLineId,
      stationId: post.subwayLineId * 100 + 1,
      createdAt: post.createdAt,
    }));

  return posts;
}

function buildProfileCommentActivities(limit: number) {
  const comments: Array<{
    commentId: number;
    articleType: MockArticleType;
    articleId: number;
    contentPreview: string;
    writer: string;
    createdAt: string;
  }> = [];

  for (const [key, threads] of Object.entries(state.comments)) {
    const [servicePath, postIdText] = key.split(':');
    const articleId = Number(postIdText);
    const articleType = resolveArticleTypeByServicePath(servicePath);

    for (const thread of threads) {
      if (thread.parentComment.status !== 'DELETED') {
        comments.push({
          commentId: thread.parentComment.id,
          articleType,
          articleId,
          contentPreview: thread.parentComment.content.slice(0, 120),
          writer: thread.parentComment.writer,
          createdAt: thread.parentComment.createdAt,
        });
      }

      for (const child of thread.childComments) {
        if (child.status === 'DELETED') {
          continue;
        }
        comments.push({
          commentId: child.id,
          articleType,
          articleId,
          contentPreview: child.content.slice(0, 120),
          writer: child.writer,
          createdAt: child.createdAt,
        });
      }
    }
  }

  return comments.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);
}

function createInitialState(): MockState {
  const user: MockUser = {
    memberId: 1,
    nickname: '아차철러',
    email: 'mock-user@ahhachul.com',
    gender: 'MALE',
    ageRange: '30',
  };

  const communityPosts = createInitialCommunityPosts();
  const complaintPosts = createInitialComplaintPosts();
  const lostFoundPosts = createInitialLostFoundPosts();
  const comments = createInitialComments(communityPosts, complaintPosts, lostFoundPosts);
  const messageData = createInitialMessageData();
  const defaultProof = createDelayProofPayload('dpv2_01abc', 201, 2);

  const favoriteStations: MockFavoriteStation[] = [
    {
      stationId: 201,
      stationName: '강남',
      lineId: 2,
      lineName: '2호선',
      label: '강남역',
      subwayLineInfoList: [{ subwayLineId: '2', subwayLineName: '2호선' }],
    },
    {
      stationId: 501,
      stationName: '광화문',
      lineId: 5,
      lineName: '5호선',
      label: '광화문역',
      subwayLineInfoList: [{ subwayLineId: '5', subwayLineName: '5호선' }],
    },
  ];

  const profileVisibility: MockProfileVisibilitySettings = {
    profilePublic: true,
    emailPublic: false,
    genderAgePublic: false,
    postsPublic: true,
    commentsPublic: true,
  };

  const favoriteRoutes: MockFavoriteRoute[] = [
    createMockFavoriteRoute(201, 501, favoriteStations, {
      routeType: 'CUSTOM',
      routeId: 1,
      title: '출근 경로',
    }),
    createMockFavoriteRoute(501, 201, favoriteStations, {
      routeType: 'CUSTOM',
      routeId: 2,
      title: '퇴근 경로',
    }),
  ];

  return {
    user,
    communityPosts,
    complaintPosts,
    lostFoundPosts,
    likedArticleIds: {
      COMMUNITY: new Set([communityPosts[0]?.id ?? 1001]),
      COMPLAINT: new Set([complaintPosts[0]?.id ?? 2001]),
      LOST: new Set([lostFoundPosts[0]?.id ?? 3001]),
    },
    bookmarkedArticleIds: {
      COMMUNITY: new Set([communityPosts[1]?.id ?? 1002]),
      COMPLAINT: new Set([complaintPosts[1]?.id ?? 2002]),
      LOST: new Set([lostFoundPosts[1]?.id ?? 3002]),
    },
    comments,
    favoriteStations,
    profileVisibility,
    favoriteRoutes,
    messageRooms: messageData.rooms,
    messageThreads: messageData.messageThreads,
    delayProofs: {
      [defaultProof.proofId]: defaultProof,
    },
    subwayLines: SUBWAY_LINES,
    nextPostId: 4000,
    nextCommentId: 9000,
    nextMessageId: messageData.nextMessageId,
    nextFavoriteRouteId: 3,
    auth: {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      accessTokenExpiresIn: 3600,
      refreshTokenExpiresIn: 1209600,
    },
  };
}

let state = createInitialState();

function commentKey(servicePath: string, postId: number): string {
  return `${servicePath}:${postId}`;
}

function findCommentById(commentId: number): {
  servicePath: string;
  postId: number;
  threadIndex: number;
  isParent: boolean;
  comment: MockComment;
} | null {
  for (const [key, threads] of Object.entries(state.comments)) {
    const [servicePath, postIdText] = key.split(':');
    const postId = Number(postIdText);

    for (let threadIndex = 0; threadIndex < threads.length; threadIndex += 1) {
      const thread = threads[threadIndex];
      if (thread.parentComment.id === commentId) {
        return {
          servicePath,
          postId,
          threadIndex,
          isParent: true,
          comment: thread.parentComment,
        };
      }

      const child = thread.childComments.find(item => item.id === commentId);
      if (child) {
        return {
          servicePath,
          postId,
          threadIndex,
          isParent: false,
          comment: child,
        };
      }
    }
  }

  return null;
}

function readPostCollection(
  servicePath: string,
): MockCommunityPostDetail[] | MockComplaintPostDetail[] | MockLostFoundPostDetail[] {
  if (servicePath === API_SERVICE_PATHS.community) {
    return state.communityPosts;
  }

  if (servicePath === API_SERVICE_PATHS.complaint) {
    return state.complaintPosts;
  }

  return state.lostFoundPosts;
}

function updateCommentCount(servicePath: string, postId: number, delta: number) {
  const collection = readPostCollection(servicePath);
  const post = collection.find(item => item.id === postId);

  if (!post) {
    return;
  }

  post.commentCnt = Math.max(0, post.commentCnt + delta);
}

function getReactionTypeByServicePath(servicePath: string): MockArticleType {
  if (servicePath === API_SERVICE_PATHS.community) {
    return 'COMMUNITY';
  }

  if (servicePath === API_SERVICE_PATHS.complaint) {
    return 'COMPLAINT';
  }

  return 'LOST';
}

function getServicePathByArticleType(articleType: MockArticleType): string {
  if (articleType === 'COMMUNITY') {
    return API_SERVICE_PATHS.community;
  }

  if (articleType === 'COMPLAINT') {
    return API_SERVICE_PATHS.complaint;
  }

  return API_SERVICE_PATHS.lostFound;
}

function getPostByServicePath(servicePath: string, postId: number) {
  const collection = readPostCollection(servicePath);
  return collection.find(item => item.id === postId);
}

function upsertReaction(
  servicePath: string,
  postId: number,
  reactionKind: 'like' | 'bookmark',
  action: 'add' | 'remove',
): Response {
  const post = getPostByServicePath(servicePath, postId);
  if (!post) {
    return toErrorResponse('Post not found.', 404);
  }

  const articleType = getReactionTypeByServicePath(servicePath);
  const targetSet =
    reactionKind === 'like'
      ? state.likedArticleIds[articleType]
      : state.bookmarkedArticleIds[articleType];

  if (action === 'add') {
    targetSet.add(postId);
  } else {
    targetSet.delete(postId);
  }

  return toSuccessResponse(null);
}

function buildArticleHistories(limit: number) {
  const likedArticles: MockArticleHistoryItem[] = [];
  const bookmarkedArticles: MockArticleHistoryItem[] = [];

  for (const [articleType, ids] of Object.entries(state.likedArticleIds) as Array<
    [MockArticleType, Set<number>]
  >) {
    for (const id of ids) {
      const servicePath = getServicePathByArticleType(articleType);
      const post = getPostByServicePath(servicePath, id);
      if (post) {
        likedArticles.push(toArticleHistoryItem(articleType, post, new Date().toISOString()));
      }
    }
  }

  for (const [articleType, ids] of Object.entries(state.bookmarkedArticleIds) as Array<
    [MockArticleType, Set<number>]
  >) {
    for (const id of ids) {
      const servicePath = getServicePathByArticleType(articleType);
      const post = getPostByServicePath(servicePath, id);
      if (post) {
        bookmarkedArticles.push(toArticleHistoryItem(articleType, post, new Date().toISOString()));
      }
    }
  }

  likedArticles.sort((a, b) => b.reactedAt.localeCompare(a.reactedAt));
  bookmarkedArticles.sort((a, b) => b.reactedAt.localeCompare(a.reactedAt));

  return {
    likedArticles: likedArticles.slice(0, Math.max(limit, 1)),
    bookmarkedArticles: bookmarkedArticles.slice(0, Math.max(limit, 1)),
  };
}

function toSuccessResponse<T>(result: T, init?: ResponseInit): Response {
  return HttpResponse.json(
    {
      code: APIResponseCode.SUCCESS,
      message: RESPONSE_MESSAGES.success,
      result,
    },
    init,
  );
}

function toErrorResponse(message: string = RESPONSE_MESSAGES.badRequest, status = 400): Response {
  const code = status >= 500 ? APIResponseCode.INTERNAL_SERVER_ERROR : APIResponseCode.BAD_REQUEST;

  return HttpResponse.json(
    {
      code,
      message,
      result: null,
    },
    { status },
  );
}

function normalizePathname(pathname: string): string | null {
  const trimmed = pathname.replace(/\/+$/, '') || '/';
  const withoutApiPrefix = trimmed.startsWith('/api/') ? trimmed.slice(4) || '/' : trimmed;
  const isStaticModuleRequest =
    /\.(?:[cm]?[jt]sx?|css|map|json|svg|png|jpe?g|gif|ico|woff2?)$/i.test(withoutApiPrefix);

  if (
    isStaticModuleRequest ||
    withoutApiPrefix.startsWith('/@vite') ||
    withoutApiPrefix.startsWith('/node_modules/')
  ) {
    return null;
  }

  if (withoutApiPrefix.startsWith('/mock-s3/upload/')) {
    return withoutApiPrefix;
  }

  const presignedPathIndex = withoutApiPrefix.indexOf('/common/presigned/');
  if (presignedPathIndex !== -1) {
    return withoutApiPrefix.slice(presignedPathIndex);
  }

  if (withoutApiPrefix.startsWith('/v2/')) {
    return withoutApiPrefix;
  }

  if (withoutApiPrefix.startsWith('/v1/')) {
    return withoutApiPrefix.slice(3) || '/';
  }

  if (withoutApiPrefix === '/auth/token/refresh') {
    return API_PATHS.auth.refreshToken;
  }

  for (const segment of API_ROOT_SEGMENTS) {
    const token = `/${segment}`;
    const index = withoutApiPrefix.indexOf(token);

    if (index !== -1) {
      return withoutApiPrefix.slice(index);
    }
  }

  return null;
}

function normalizeForCompare(value: string): string {
  return value.replace(/\s+/g, '').toLowerCase();
}

function toNumber(value: string | null, fallback: number): number {
  if (value === null || value === '') {
    return fallback;
  }

  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function toBoolean(value: unknown, fallback: boolean): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  return fallback;
}

function safeDecodeURIComponent(value: string): string {
  let decoded = value;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const next = decodeURIComponent(decoded);
      if (next === decoded) {
        return decoded;
      }
      decoded = next;
    } catch {
      return decoded;
    }
  }

  return decoded;
}

function maskEmailAddress(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain) {
    return email;
  }

  const visiblePrefix = local.slice(0, Math.min(2, local.length));
  const hiddenLength = Math.max(local.length - visiblePrefix.length, 1);
  return `${visiblePrefix}${'*'.repeat(hiddenLength)}@${domain}`;
}

function sortByCreatedAt<T extends { createdAt: string }>(
  items: T[],
  sortParam: string | null,
): T[] {
  const sorted = [...items];

  if (sortParam === API_SORT.createdAtAsc) {
    sorted.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    return sorted;
  }

  sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return sorted;
}

function paginate<T>(items: T[], pageSize: number, pageToken: string | null) {
  const start = Math.max(0, toNumber(pageToken, 0));
  const end = start + pageSize;
  const data = items.slice(start, end);
  const hasNext = end < items.length;

  return {
    hasNext,
    pageToken: hasNext ? String(end) : null,
    data,
  };
}

async function parseRequestBody(request: Request): Promise<Record<string, unknown>> {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData();
    const content = formData.get('content');

    if (typeof content === 'string') {
      return safeJsonParse(content);
    }

    if (content instanceof Blob) {
      return safeJsonParse(await content.text());
    }

    return {};
  }

  if (contentType.includes('application/json')) {
    const body = await request.json().catch(() => null);
    return isObject(body) ? body : {};
  }

  return {};
}

function safeJsonParse(text: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(text);
    return isObject(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function matchRoute(pattern: string, path: string): Record<string, string> | null {
  const normalizedPattern = pattern.replace(/\/+$/, '') || '/';
  const normalizedPath = path.replace(/\/+$/, '') || '/';

  const patternSegments = normalizedPattern.split('/').filter(Boolean);
  const pathSegments = normalizedPath.split('/').filter(Boolean);

  if (patternSegments.length !== pathSegments.length) {
    return null;
  }

  const params: Record<string, string> = {};

  for (let index = 0; index < patternSegments.length; index += 1) {
    const patternSegment = patternSegments[index];
    const pathSegment = pathSegments[index];

    if (!pathSegment) {
      return null;
    }

    if (patternSegment.startsWith(':')) {
      params[patternSegment.slice(1)] = decodeURIComponent(pathSegment);
      continue;
    }

    if (patternSegment !== pathSegment) {
      return null;
    }
  }

  return params;
}

const routes: RouteDefinition[] = [
  {
    method: 'GET',
    pattern: API_PATHS.auth.redirectUrl,
    resolver: ({ url }) =>
      toSuccessResponse({
        redirectUrl: `https://auth.ahhachul.mock/${url.searchParams.get('providerType') ?? 'KAKAO'}`,
      }),
  },
  {
    method: 'GET',
    pattern: API_PATHS.auth.login,
    resolver: ({ url }) => {
      const providerCode = url.searchParams.get('providerCode');
      if (!providerCode) {
        return toErrorResponse('providerCode is required.');
      }

      return toSuccessResponse({
        memberId: String(state.user.memberId),
        isNeedAdditionalUserInfo: false,
        accessToken: state.auth.accessToken,
        accessTokenExpiresIn: state.auth.accessTokenExpiresIn,
        refreshToken: state.auth.refreshToken,
        refreshTokenExpiresIn: state.auth.refreshTokenExpiresIn,
      });
    },
  },
  {
    method: 'POST',
    pattern: API_PATHS.auth.login,
    resolver: async ({ request }) => {
      const payload = await parseRequestBody(request);
      const providerCode = String(payload.providerCode ?? 'mock-provider-code');

      if (!providerCode) {
        return toErrorResponse('providerCode is required.');
      }

      return toSuccessResponse({
        memberId: String(state.user.memberId),
        isNeedAdditionalUserInfo: false,
        accessToken: state.auth.accessToken,
        accessTokenExpiresIn: state.auth.accessTokenExpiresIn,
        refreshToken: state.auth.refreshToken,
        refreshTokenExpiresIn: state.auth.refreshTokenExpiresIn,
      });
    },
  },
  {
    method: 'POST',
    pattern: API_PATHS.auth.refreshToken,
    resolver: async ({ request }) => {
      const payload = await parseRequestBody(request);
      const refreshToken = String(payload.refreshToken ?? '');

      if (!refreshToken) {
        return toErrorResponse('refreshToken is required.');
      }

      state.auth = {
        accessToken: `mock-access-token-${Date.now()}`,
        refreshToken: `mock-refresh-token-${Date.now()}`,
        accessTokenExpiresIn: 3600,
        refreshTokenExpiresIn: 1209600,
      };

      return toSuccessResponse({
        accessToken: state.auth.accessToken,
        refreshToken: state.auth.refreshToken,
      });
    },
  },
  {
    method: 'POST',
    pattern: API_PATHS.auth.signOut,
    resolver: () => HttpResponse.json({}, { status: 200 }),
  },
  {
    method: 'POST',
    pattern: '/auth/logout',
    resolver: () => HttpResponse.json({}, { status: 200 }),
  },
  {
    method: 'GET',
    pattern: API_PATHS.user.profile,
    resolver: () =>
      toSuccessResponse({
        ...state.user,
        ...state.profileVisibility,
      }),
  },
  {
    method: 'GET',
    pattern: '/members/:nickname/profile',
    resolver: ({ params, url }) => {
      const nickname = safeDecodeURIComponent(params.nickname ?? '');
      const limit = Math.max(1, Math.min(toNumber(url.searchParams.get('limit'), 20), 50));
      const asPublic = (url.searchParams.get('asPublic') ?? 'false').toLowerCase() === 'true';
      const isMine = normalizeForCompare(nickname) === normalizeForCompare(state.user.nickname);
      const applyVisibilityPolicy = asPublic || !isMine;

      const profileVisible = applyVisibilityPolicy ? state.profileVisibility.profilePublic : true;
      const postsVisible = applyVisibilityPolicy ? state.profileVisibility.postsPublic : true;
      const commentsVisible = applyVisibilityPolicy ? state.profileVisibility.commentsPublic : true;
      const emailVisible = applyVisibilityPolicy ? state.profileVisibility.emailPublic : true;
      const genderAgeVisible = applyVisibilityPolicy
        ? state.profileVisibility.genderAgePublic
        : true;

      const email = profileVisible && emailVisible ? state.user.email : null;
      const maskedEmail = profileVisible ? maskEmailAddress(state.user.email) : null;
      const gender = profileVisible && genderAgeVisible ? state.user.gender : null;
      const ageRange = profileVisible && genderAgeVisible ? state.user.ageRange : null;

      const posts = postsVisible ? buildProfilePostActivities(limit) : [];
      const comments = commentsVisible ? buildProfileCommentActivities(limit) : [];

      return toSuccessResponse({
        memberId: state.user.memberId,
        nickname: profileVisible ? state.user.nickname : null,
        email,
        maskedEmail,
        gender,
        ageRange,
        isMine,
        visibility: {
          ...state.profileVisibility,
          profileVisible,
          postsVisible,
          commentsVisible,
        },
        activities: {
          posts,
          comments,
        },
      });
    },
  },
  {
    method: 'PATCH',
    pattern: API_PATHS.user.profile,
    resolver: async ({ request }) => {
      const payload = await parseRequestBody(request);
      const hasNickname = Object.prototype.hasOwnProperty.call(payload, 'nickname');
      if (hasNickname) {
        const nickname = String(payload.nickname ?? '').trim();
        if (!nickname) {
          return toErrorResponse('nickname is required.');
        }
        state.user.nickname = nickname;
      }

      state.profileVisibility = {
        profilePublic: toBoolean(payload.profilePublic, state.profileVisibility.profilePublic),
        emailPublic: toBoolean(payload.emailPublic, state.profileVisibility.emailPublic),
        genderAgePublic: toBoolean(
          payload.genderAgePublic,
          state.profileVisibility.genderAgePublic,
        ),
        postsPublic: toBoolean(payload.postsPublic, state.profileVisibility.postsPublic),
        commentsPublic: toBoolean(payload.commentsPublic, state.profileVisibility.commentsPublic),
      };

      return HttpResponse.json({
        nickname: state.user.nickname,
        gender: state.user.gender,
        ageRange: state.user.ageRange,
        ...state.profileVisibility,
      });
    },
  },
  {
    method: 'GET',
    pattern: API_PATHS.user.favoriteStations,
    resolver: () =>
      toSuccessResponse({
        stationInfoList: state.favoriteStations,
      }),
  },
  {
    method: 'POST',
    pattern: API_PATHS.user.favoriteStations,
    resolver: async ({ request }) => {
      const payload = await parseRequestBody(request);
      const stations = Array.isArray(payload.stations) ? payload.stations : [];

      if (stations.length > 0) {
        state.favoriteStations = stations.map((station, index) => {
          if (!isObject(station)) {
            return {
              stationId: 9000 + index,
              stationName: `임시역${index + 1}`,
              lineId: 1,
              lineName: '1호선',
              label: `임시역${index + 1}`,
              subwayLineInfoList: [{ subwayLineId: '1', subwayLineName: '1호선' }],
            };
          }

          const lineId = Number(station.lineId ?? station.subwayLineId ?? 1) || 1;
          const lineName = String(station.lineName ?? `${lineId}호선`);
          const stationName = String(station.stationName ?? `역${index + 1}`);

          return {
            stationId: Number(station.stationId ?? 9000 + index) || 9000 + index,
            stationName,
            lineId,
            lineName,
            label: String(station.label ?? `${stationName}역`),
            subwayLineInfoList: [{ subwayLineId: String(lineId), subwayLineName: lineName }],
          };
        });
      }

      return toSuccessResponse({
        stationInfoList: state.favoriteStations,
      });
    },
  },
  {
    method: 'GET',
    pattern: API_PATHS.user.favoriteRouteRecommendations,
    resolver: ({ url }) => {
      const limit = Math.max(1, Math.min(toNumber(url.searchParams.get('limit'), 3), 10));
      return toSuccessResponse({
        routes: buildRecommendedRoutes(limit),
      });
    },
  },
  {
    method: 'GET',
    pattern: API_PATHS.user.favoriteRoutes,
    resolver: () =>
      toSuccessResponse({
        routes: state.favoriteRoutes,
      }),
  },
  {
    method: 'POST',
    pattern: API_PATHS.user.favoriteRoutes,
    resolver: async ({ request }) => {
      const payload = await parseRequestBody(request);
      const sourceStationId = Number(payload.sourceStationId);
      const destinationStationId = Number(payload.destinationStationId);

      if (
        !Number.isFinite(sourceStationId) ||
        !Number.isFinite(destinationStationId) ||
        sourceStationId <= 0 ||
        destinationStationId <= 0 ||
        sourceStationId === destinationStationId
      ) {
        return toErrorResponse('sourceStationId and destinationStationId are required.');
      }

      const titleRaw = String(payload.title ?? '').trim();
      const route = createMockFavoriteRoute(
        sourceStationId,
        destinationStationId,
        state.favoriteStations,
        {
          routeType: 'CUSTOM',
          routeId: state.nextFavoriteRouteId++,
          title: titleRaw || null,
        },
      );

      state.favoriteRoutes.unshift(route);
      return toSuccessResponse(route);
    },
  },
  {
    method: 'DELETE',
    pattern: API_PATHS.user.favoriteRoute(':routeId'),
    resolver: ({ params }) => {
      const routeId = Number(params.routeId);
      if (!Number.isFinite(routeId) || routeId <= 0) {
        return toErrorResponse('routeId is required.');
      }

      state.favoriteRoutes = state.favoriteRoutes.filter(route => route.routeId !== routeId);
      return toSuccessResponse({ routeId });
    },
  },
  {
    method: 'POST',
    pattern: API_PATHS.user.checkNickname,
    resolver: async ({ request }) => {
      const payload = await parseRequestBody(request);
      const nickname = normalizeForCompare(String(payload.nickname ?? ''));
      const isDuplicate =
        nickname.length > 0 && nickname === normalizeForCompare(state.user.nickname);

      return HttpResponse.json({
        payload: isDuplicate,
      });
    },
  },
  {
    method: 'GET',
    pattern: API_PATHS.user.articleHistories,
    resolver: ({ url }) => {
      const limit = toNumber(url.searchParams.get('limit'), 30);
      return toSuccessResponse(buildArticleHistories(limit));
    },
  },
  {
    method: 'GET',
    pattern: API_PATHS.community.list,
    resolver: ({ url }) => {
      const contentKeyword = (url.searchParams.get('content') ?? '').trim();
      const categoryType = (url.searchParams.get('categoryType') ?? '').trim();
      const subwayLineId = url.searchParams.get('subwayLineId');
      const pageSize = toNumber(url.searchParams.get('pageSize'), DEFAULT_PAGE_SIZE);
      const pageToken = url.searchParams.get('pageToken');

      let data = sortByCreatedAt(state.communityPosts, url.searchParams.get('sort'));

      if (categoryType) {
        data = data.filter(item => item.categoryType === categoryType);
      }

      if (contentKeyword) {
        const normalizedKeyword = normalizeForCompare(contentKeyword);
        data = data.filter(item => normalizeForCompare(item.content).includes(normalizedKeyword));
      }

      if (subwayLineId && subwayLineId !== '0') {
        data = data.filter(item => String(item.subwayLineId) === subwayLineId);
      }

      return toSuccessResponse(paginate(data, pageSize, pageToken));
    },
  },
  {
    method: 'GET',
    pattern: API_PATHS.community.hotList,
    resolver: ({ url }) => {
      const pageSize = toNumber(url.searchParams.get('pageSize'), DEFAULT_PAGE_SIZE);
      const pageToken = url.searchParams.get('pageToken');

      const sorted = [...state.communityPosts].sort((a, b) => b.likeCnt - a.likeCnt);
      return toSuccessResponse(paginate(sorted, pageSize, pageToken));
    },
  },
  {
    method: 'POST',
    pattern: API_PATHS.community.list,
    resolver: async ({ request }) => {
      const payload = await parseRequestBody(request);
      const postId = state.nextPostId++;
      const images = createImages(postId, 2);
      const category = String(payload.categoryType ?? 'FREE') as CommunityCategory;

      const post: MockCommunityPostDetail = {
        id: postId,
        title: String(payload.title ?? `커뮤니티 임시 제목 ${postId}`),
        writer: state.user.nickname,
        content: String(payload.content ?? ''),
        createdAt: new Date().toISOString(),
        createdBy: String(state.user.memberId),
        commentCnt: 0,
        subwayLineId: Number(payload.subwayLineId ?? 2) || 2,
        imageUrl: images[0]?.imageUrl,
        likeCnt: 0,
        viewCnt: 0,
        hashTags: ['지하철', '아차철'],
        regionType: 'METROPOLITAN',
        categoryType: category,
        likeYn: 'N',
        hateYn: 'N',
        hateCnt: 0,
        hotPostYn: category === 'HOT' ? 'Y' : 'N',
        images,
      };

      state.communityPosts.unshift(post);

      return toSuccessResponse({ id: postId });
    },
  },
  {
    method: 'POST',
    pattern: '/community-posts/:id',
    resolver: async ({ params, request }) => {
      const id = Number(params.id);
      const payload = await parseRequestBody(request);
      const post = state.communityPosts.find(item => item.id === id);

      if (!post) {
        return toErrorResponse('Community post not found.', 404);
      }

      if (typeof payload.title === 'string') {
        post.title = payload.title;
      }

      if (typeof payload.content === 'string') {
        post.content = payload.content;
      }

      if (typeof payload.categoryType === 'string') {
        post.categoryType = payload.categoryType as CommunityCategory;
      }

      if (payload.subwayLineId !== undefined) {
        const subwayLineId = Number(payload.subwayLineId);
        if (Number.isFinite(subwayLineId) && subwayLineId > 0) {
          post.subwayLineId = subwayLineId;
        }
      }

      return toSuccessResponse({ id: post.id });
    },
  },
  {
    method: 'GET',
    pattern: '/community-posts/:id',
    resolver: ({ params }) => {
      const id = Number(params.id);
      const post = state.communityPosts.find(item => item.id === id);

      if (!post) {
        return toErrorResponse('Community post not found.', 404);
      }

      return toSuccessResponse(post);
    },
  },
  {
    method: 'DELETE',
    pattern: '/community-posts/:id',
    resolver: ({ params }) => {
      const id = Number(params.id);
      const before = state.communityPosts.length;
      state.communityPosts = state.communityPosts.filter(item => item.id !== id);

      if (state.communityPosts.length === before) {
        return toErrorResponse('Community post not found.', 404);
      }

      delete state.comments[commentKey(API_SERVICE_PATHS.community, id)];
      return toSuccessResponse({ id });
    },
  },
  {
    method: 'POST',
    pattern: '/community-posts/:id/like',
    resolver: ({ params }) => {
      return upsertReaction(API_SERVICE_PATHS.community, Number(params.id), 'like', 'add');
    },
  },
  {
    method: 'DELETE',
    pattern: '/community-posts/:id/like',
    resolver: ({ params }) => {
      return upsertReaction(API_SERVICE_PATHS.community, Number(params.id), 'like', 'remove');
    },
  },
  {
    method: 'POST',
    pattern: '/community-posts/:id/bookmark',
    resolver: ({ params }) => {
      return upsertReaction(API_SERVICE_PATHS.community, Number(params.id), 'bookmark', 'add');
    },
  },
  {
    method: 'DELETE',
    pattern: '/community-posts/:id/bookmark',
    resolver: ({ params }) => {
      return upsertReaction(API_SERVICE_PATHS.community, Number(params.id), 'bookmark', 'remove');
    },
  },
  {
    method: 'GET',
    pattern: API_PATHS.complaint.list,
    resolver: ({ url }) => {
      const keyword = (url.searchParams.get('keyword') ?? '').trim();
      const subwayLineId = url.searchParams.get('subwayLineId');
      const pageSize = toNumber(url.searchParams.get('pageSize'), DEFAULT_PAGE_SIZE);
      const pageToken = url.searchParams.get('pageToken');

      let data = sortByCreatedAt(state.complaintPosts, url.searchParams.get('sort'));

      if (keyword) {
        const normalizedKeyword = normalizeForCompare(keyword);
        data = data.filter(item => normalizeForCompare(item.content).includes(normalizedKeyword));
      }

      if (subwayLineId && subwayLineId !== '0') {
        data = data.filter(item => String(item.subwayLineId) === subwayLineId);
      }

      return toSuccessResponse(paginate(data, pageSize, pageToken));
    },
  },
  {
    method: 'POST',
    pattern: API_PATHS.complaint.list,
    resolver: async ({ request }) => {
      const payload = await parseRequestBody(request);
      const postId = state.nextPostId++;
      const images = createImages(postId, 1);

      const post: MockComplaintPostDetail = {
        id: postId,
        title: String(payload.title ?? `민원 임시 제목 ${postId}`),
        writer: state.user.nickname,
        content: String(payload.content ?? ''),
        createdAt: new Date().toISOString(),
        createdBy: String(state.user.memberId),
        commentCnt: 0,
        subwayLineId: Number(payload.subwayLineId ?? 2) || 2,
        imageUrl: images[0]?.imageUrl,
        complaintType: String(payload.complaintType ?? 'ENVIRONMENTAL_COMPLAINT') as ComplaintType,
        shortContentType: String(payload.shortContentType ?? 'WASTE') as ShortComplaintType,
        trainNo: String(payload.trainNo ?? '201'),
        phoneNumber: String(payload.phoneNumber ?? '01012345678'),
        location: Number(payload.location ?? 1) || 1,
        status: 'CREATED',
        images,
      };

      state.complaintPosts.unshift(post);

      return toSuccessResponse({ id: postId });
    },
  },
  {
    method: 'GET',
    pattern: '/complaint-posts/:id',
    resolver: ({ params }) => {
      const id = Number(params.id);
      const post = state.complaintPosts.find(item => item.id === id);

      if (!post) {
        return toErrorResponse('Complaint post not found.', 404);
      }

      return toSuccessResponse(post);
    },
  },
  {
    method: 'DELETE',
    pattern: '/complaint-posts/:id',
    resolver: ({ params }) => {
      const id = Number(params.id);
      const before = state.complaintPosts.length;
      state.complaintPosts = state.complaintPosts.filter(item => item.id !== id);

      if (state.complaintPosts.length === before) {
        return toErrorResponse('Complaint post not found.', 404);
      }

      delete state.comments[commentKey(API_SERVICE_PATHS.complaint, id)];
      return toSuccessResponse({ id });
    },
  },
  {
    method: 'POST',
    pattern: '/complaint-posts/:id/like',
    resolver: ({ params }) => {
      return upsertReaction(API_SERVICE_PATHS.complaint, Number(params.id), 'like', 'add');
    },
  },
  {
    method: 'DELETE',
    pattern: '/complaint-posts/:id/like',
    resolver: ({ params }) => {
      return upsertReaction(API_SERVICE_PATHS.complaint, Number(params.id), 'like', 'remove');
    },
  },
  {
    method: 'POST',
    pattern: '/complaint-posts/:id/bookmark',
    resolver: ({ params }) => {
      return upsertReaction(API_SERVICE_PATHS.complaint, Number(params.id), 'bookmark', 'add');
    },
  },
  {
    method: 'DELETE',
    pattern: '/complaint-posts/:id/bookmark',
    resolver: ({ params }) => {
      return upsertReaction(API_SERVICE_PATHS.complaint, Number(params.id), 'bookmark', 'remove');
    },
  },
  {
    method: 'GET',
    pattern: API_PATHS.lostFound.list,
    resolver: ({ url }) => {
      const keyword = (url.searchParams.get('keyword') ?? '').trim();
      const subwayLineId = url.searchParams.get('subwayLineId');
      const lostType = (url.searchParams.get('lostType') ?? '').trim();
      const pageSize = toNumber(url.searchParams.get('pageSize'), DEFAULT_PAGE_SIZE);
      const pageToken = url.searchParams.get('pageToken');

      let data = sortByCreatedAt(state.lostFoundPosts, url.searchParams.get('sort'));

      if (keyword) {
        const normalizedKeyword = normalizeForCompare(keyword);
        data = data.filter(item => normalizeForCompare(item.content).includes(normalizedKeyword));
      }

      if (subwayLineId && subwayLineId !== '0') {
        data = data.filter(item => String(item.subwayLineId) === subwayLineId);
      }

      if (lostType) {
        data = data.filter(item => item.lostType === lostType);
      }

      return toSuccessResponse(paginate(data, pageSize, pageToken));
    },
  },
  {
    method: 'POST',
    pattern: API_PATHS.lostFound.list,
    resolver: async ({ request }) => {
      const payload = await parseRequestBody(request);
      const postId = state.nextPostId++;
      const images = createImages(postId, 2);
      const lostType = String(payload.lostType ?? 'LOST') as LostType;

      const post: MockLostFoundPostDetail = {
        id: postId,
        title: String(payload.title ?? `유실물 임시 제목 ${postId}`),
        writer: state.user.nickname,
        content: String(payload.content ?? ''),
        createdAt: new Date().toISOString(),
        createdBy: String(state.user.memberId),
        commentCnt: 0,
        subwayLineId: Number(payload.subwayLineId ?? 2) || 2,
        imageUrl: images[0]?.imageUrl,
        status: 'PROGRESS',
        categoryName: lostType === 'LOST' ? '분실물' : '습득물',
        pageUrl: `https://ahhachul.mock/lost-found/${postId}`,
        storage: '서울교통공사 유실물센터',
        storageNumber: '02-1234-5678',
        externalSourceImageUrl: images[0]?.imageUrl ?? '',
        isFromLost112: false,
        images,
        recommendPosts: [],
        lostType,
      };

      state.lostFoundPosts.unshift(post);
      return toSuccessResponse({ id: postId });
    },
  },
  {
    method: 'POST',
    pattern: '/lost-posts/:id',
    resolver: async ({ params, request }) => {
      const id = Number(params.id);
      const payload = await parseRequestBody(request);
      const post = state.lostFoundPosts.find(item => item.id === id);

      if (!post) {
        return toErrorResponse('Lost-found post not found.', 404);
      }

      if (typeof payload.title === 'string') {
        post.title = payload.title;
      }

      if (typeof payload.content === 'string') {
        post.content = payload.content;
      }

      if (typeof payload.lostType === 'string') {
        post.lostType = payload.lostType as LostType;
      }

      if (payload.subwayLineId !== undefined) {
        const subwayLineId = Number(payload.subwayLineId);
        if (Number.isFinite(subwayLineId) && subwayLineId > 0) {
          post.subwayLineId = subwayLineId;
        }
      }

      return toSuccessResponse({ id: post.id });
    },
  },
  {
    method: 'GET',
    pattern: '/lost-posts/:id',
    resolver: ({ params }) => {
      const id = Number(params.id);
      const post = state.lostFoundPosts.find(item => item.id === id);

      if (!post) {
        return toErrorResponse('Lost-found post not found.', 404);
      }

      return toSuccessResponse(post);
    },
  },
  {
    method: 'DELETE',
    pattern: '/lost-posts/:id',
    resolver: ({ params }) => {
      const id = Number(params.id);
      const before = state.lostFoundPosts.length;
      state.lostFoundPosts = state.lostFoundPosts.filter(item => item.id !== id);

      if (state.lostFoundPosts.length === before) {
        return toErrorResponse('Lost-found post not found.', 404);
      }

      delete state.comments[commentKey(API_SERVICE_PATHS.lostFound, id)];
      return toSuccessResponse({ id });
    },
  },
  {
    method: 'PATCH',
    pattern: '/lost-posts/:id/status',
    resolver: async ({ params, request }) => {
      const id = Number(params.id);
      const payload = await parseRequestBody(request);
      const post = state.lostFoundPosts.find(item => item.id === id);

      if (!post) {
        return toErrorResponse('Lost-found post not found.', 404);
      }

      const status = String(payload.status ?? '').toUpperCase();
      if (status === 'PROGRESS' || status === 'COMPLETE') {
        post.status = status;
      }

      return toSuccessResponse({ id: post.id });
    },
  },
  {
    method: 'POST',
    pattern: '/lost-posts/:id/like',
    resolver: ({ params }) => {
      return upsertReaction(API_SERVICE_PATHS.lostFound, Number(params.id), 'like', 'add');
    },
  },
  {
    method: 'DELETE',
    pattern: '/lost-posts/:id/like',
    resolver: ({ params }) => {
      return upsertReaction(API_SERVICE_PATHS.lostFound, Number(params.id), 'like', 'remove');
    },
  },
  {
    method: 'POST',
    pattern: '/lost-posts/:id/bookmark',
    resolver: ({ params }) => {
      return upsertReaction(API_SERVICE_PATHS.lostFound, Number(params.id), 'bookmark', 'add');
    },
  },
  {
    method: 'DELETE',
    pattern: '/lost-posts/:id/bookmark',
    resolver: ({ params }) => {
      return upsertReaction(API_SERVICE_PATHS.lostFound, Number(params.id), 'bookmark', 'remove');
    },
  },
  {
    method: 'GET',
    pattern: '/community-posts/:postId/comments',
    resolver: ({ params }) => {
      const postId = Number(params.postId);
      const key = commentKey(API_SERVICE_PATHS.community, postId);
      return toSuccessResponse({ comments: state.comments[key] ?? [] });
    },
  },
  {
    method: 'GET',
    pattern: '/complaint-posts/:postId/comments',
    resolver: ({ params }) => {
      const postId = Number(params.postId);
      const key = commentKey(API_SERVICE_PATHS.complaint, postId);
      return toSuccessResponse({ comments: state.comments[key] ?? [] });
    },
  },
  {
    method: 'GET',
    pattern: '/lost-posts/:postId/comments',
    resolver: ({ params }) => {
      const postId = Number(params.postId);
      const key = commentKey(API_SERVICE_PATHS.lostFound, postId);
      return toSuccessResponse({ comments: state.comments[key] ?? [] });
    },
  },
  {
    method: 'POST',
    pattern: '/community-posts/:postId/comments',
    resolver: async ({ params, request }) => {
      const postId = Number(params.postId);
      const payload = await parseRequestBody(request);
      return createComment(API_SERVICE_PATHS.community, postId, payload);
    },
  },
  {
    method: 'POST',
    pattern: '/complaint-posts/:postId/comments',
    resolver: async ({ params, request }) => {
      const postId = Number(params.postId);
      const payload = await parseRequestBody(request);
      return createComment(API_SERVICE_PATHS.complaint, postId, payload);
    },
  },
  {
    method: 'POST',
    pattern: '/lost-posts/:postId/comments',
    resolver: async ({ params, request }) => {
      const postId = Number(params.postId);
      const payload = await parseRequestBody(request);
      return createComment(API_SERVICE_PATHS.lostFound, postId, payload);
    },
  },
  {
    method: 'PATCH',
    pattern: '/community-posts/:postId/comments/:commentId',
    resolver: async ({ params, request }) => {
      const postId = Number(params.postId);
      const commentId = Number(params.commentId);
      const payload = await parseRequestBody(request);
      const content = String(payload.content ?? '').trim();
      const target = findCommentById(commentId);

      if (
        !target ||
        target.servicePath !== API_SERVICE_PATHS.community ||
        target.postId !== postId
      ) {
        return toErrorResponse('Comment not found.', 404);
      }

      if (!content) {
        return toErrorResponse('Comment content is required.');
      }

      target.comment.content = content;
      return toSuccessResponse({ id: commentId, content });
    },
  },
  {
    method: 'PATCH',
    pattern: '/lost-posts/:postId/comments/:commentId',
    resolver: async ({ params, request }) => {
      const postId = Number(params.postId);
      const commentId = Number(params.commentId);
      const payload = await parseRequestBody(request);
      const content = String(payload.content ?? '').trim();
      const target = findCommentById(commentId);

      if (
        !target ||
        target.servicePath !== API_SERVICE_PATHS.lostFound ||
        target.postId !== postId
      ) {
        return toErrorResponse('Comment not found.', 404);
      }

      if (!content) {
        return toErrorResponse('Comment content is required.');
      }

      target.comment.content = content;
      return toSuccessResponse({ id: commentId, content });
    },
  },
  {
    method: 'DELETE',
    pattern: '/community-posts/:postId/comments/:commentId',
    resolver: ({ params }) => {
      const postId = Number(params.postId);
      const commentId = Number(params.commentId);
      const target = findCommentById(commentId);

      if (
        !target ||
        target.servicePath !== API_SERVICE_PATHS.community ||
        target.postId !== postId
      ) {
        return toErrorResponse('Comment not found.', 404);
      }

      target.comment.status = 'DELETED';
      target.comment.content = '삭제된 댓글입니다.';
      updateCommentCount(target.servicePath, target.postId, -1);

      return toSuccessResponse({ id: commentId });
    },
  },
  {
    method: 'DELETE',
    pattern: '/lost-posts/:postId/comments/:commentId',
    resolver: ({ params }) => {
      const postId = Number(params.postId);
      const commentId = Number(params.commentId);
      const target = findCommentById(commentId);

      if (
        !target ||
        target.servicePath !== API_SERVICE_PATHS.lostFound ||
        target.postId !== postId
      ) {
        return toErrorResponse('Comment not found.', 404);
      }

      target.comment.status = 'DELETED';
      target.comment.content = '삭제된 댓글입니다.';
      updateCommentCount(target.servicePath, target.postId, -1);

      return toSuccessResponse({ id: commentId });
    },
  },
  {
    method: 'DELETE',
    pattern: '/comments/:commentId',
    resolver: ({ params }) => {
      const commentId = Number(params.commentId);
      const target = findCommentById(commentId);

      if (!target) {
        return toErrorResponse('Comment not found.', 404);
      }

      target.comment.status = 'DELETED';
      target.comment.content = '삭제된 댓글입니다.';
      updateCommentCount(target.servicePath, target.postId, -1);

      return toSuccessResponse({ id: commentId });
    },
  },
  {
    method: 'PATCH',
    pattern: '/comments/:commentId',
    resolver: async ({ params, request }) => {
      const commentId = Number(params.commentId);
      const payload = await parseRequestBody(request);
      const content = String(payload.content ?? '').trim();
      const target = findCommentById(commentId);

      if (!target) {
        return toErrorResponse('Comment not found.', 404);
      }

      if (!content) {
        return toErrorResponse('Comment content is required.');
      }

      target.comment.content = content;
      return toSuccessResponse({ id: commentId, content });
    },
  },
  {
    method: 'GET',
    pattern: API_PATHS.subway.lines,
    resolver: () =>
      toSuccessResponse({
        subwayLines: state.subwayLines,
      }),
  },
  {
    method: 'GET',
    pattern: API_PATHS.subway.trainRealTimes,
    resolver: ({ url }) => {
      const subwayLineId = toNumber(url.searchParams.get('subwayLineId'), 2);
      const stationId = toNumber(url.searchParams.get('stationId'), 201);

      return toSuccessResponse({
        trainRealTimes: [
          {
            trainNum: subwayLineId * 100 + 1,
            upDownType: 'UP',
            nextStationDirection: `다음역 ${stationId + 1}`,
            destinationStationDirection: '을지로입구',
            currentArrivalTime: 1,
            currentTrainArrivalCode: 'ARRIVE',
          },
          {
            trainNum: subwayLineId * 100 + 2,
            upDownType: 'DOWN',
            nextStationDirection: `다음역 ${stationId - 1}`,
            destinationStationDirection: '강남',
            currentArrivalTime: 4,
            currentTrainArrivalCode: 'RUNNING',
          },
        ],
      });
    },
  },
  {
    method: 'GET',
    pattern: API_PATHS.message.rooms,
    resolver: () =>
      toSuccessResponse({
        rooms: state.messageRooms,
      }),
  },
  {
    method: 'GET',
    pattern: '/message-rooms/:roomId/messages',
    resolver: ({ params, url }) => {
      const roomId = Number(params.roomId);
      const room = state.messageRooms.find(item => item.roomId === roomId);
      if (!room) {
        return toErrorResponse('Message room not found.', 404);
      }

      const cursorId = url.searchParams.get('cursorId');
      const pageSize = toNumber(url.searchParams.get('pageSize'), 30);
      const allMessages = [...(state.messageThreads[roomId] ?? [])].sort(
        (a, b) => a.messageId - b.messageId,
      );
      const filtered = cursorId
        ? allMessages.filter(item => item.messageId < toNumber(cursorId, Number.MAX_SAFE_INTEGER))
        : allMessages;
      const messages = filtered.slice(Math.max(filtered.length - pageSize, 0));

      return toSuccessResponse({
        roomId,
        partnerMemberId: room.partnerMemberId,
        partnerNickname: room.partnerNickname,
        hasNext: filtered.length > messages.length,
        nextCursorId: messages[0]?.messageId ?? null,
        messages,
      });
    },
  },
  {
    method: 'POST',
    pattern: API_PATHS.message.messages,
    resolver: async ({ request }) => {
      const payload = await parseRequestBody(request);
      const roomIdFromPayload = Number(payload.roomId ?? 0);
      const receiverMemberId = Number(payload.receiverMemberId ?? 0);
      const content = String(payload.content ?? '').trim();
      if (!content) {
        return toErrorResponse('Message content is required.');
      }

      let room = state.messageRooms.find(item => item.roomId === roomIdFromPayload);

      if (!room) {
        const nextRoomId =
          state.messageRooms.reduce((max, item) => Math.max(max, item.roomId), 0) + 1;
        room = {
          roomId: nextRoomId,
          partnerMemberId: receiverMemberId > 0 ? receiverMemberId : 9999,
          partnerNickname: receiverMemberId > 0 ? `member-${receiverMemberId}` : '새 유저',
          lastMessageContent: null,
          lastMessageAt: null,
          unreadCount: 0,
        };
        state.messageRooms.unshift(room);
        state.messageThreads[room.roomId] = [];
      }

      const createdAt = new Date().toISOString();
      const messageId = state.nextMessageId++;
      const message: MockMessageThreadItem = {
        messageId,
        senderMemberId: state.user.memberId,
        senderNickname: state.user.nickname,
        content,
        createdAt,
        mine: true,
        readYn: 'N',
      };
      state.messageThreads[room.roomId] = [...(state.messageThreads[room.roomId] ?? []), message];
      room.lastMessageContent = content;
      room.lastMessageAt = createdAt;
      room.unreadCount = 0;

      return toSuccessResponse({
        roomId: room.roomId,
        messageId,
        createdAt,
      });
    },
  },
  {
    method: 'GET',
    pattern: API_PATHS.subway.trainRealTimesV2,
    resolver: ({ url }) => {
      const stationId = toNumber(url.searchParams.get('stationId'), 201);
      const subwayLineId = toNumber(url.searchParams.get('subwayLineId'), 2);
      const upDownType = (url.searchParams.get('upDownType') ?? '').toUpperCase();
      const limit = Math.min(Math.max(toNumber(url.searchParams.get('limit'), 2), 1), 4);
      const now = new Date().toISOString();
      const trainRealTimes = [
        {
          trainNo: `${subwayLineId * 100 + 1}`,
          upDownType: 'UP',
          arrivalCode: 'BEFORE_STATION_ARRIVE',
          etaSec: 75,
          etaMinDisplay: 2,
          destinationStationDirection: '성수행',
          nextStationDirection: `다음역 ${stationId + 1}`,
        },
        {
          trainNo: `${subwayLineId * 100 + 2}`,
          upDownType: 'DOWN',
          arrivalCode: 'RUNNING',
          etaSec: 180,
          etaMinDisplay: 3,
          destinationStationDirection: '강남행',
          nextStationDirection: `다음역 ${Math.max(stationId - 1, 1)}`,
        },
        {
          trainNo: `${subwayLineId * 100 + 3}`,
          upDownType: 'UP',
          arrivalCode: 'BEFORE_STATION_ENTER',
          etaSec: 240,
          etaMinDisplay: 4,
          destinationStationDirection: '왕십리행',
          nextStationDirection: `다음역 ${stationId + 2}`,
        },
      ]
        .filter(item => !upDownType || item.upDownType === upDownType)
        .slice(0, limit);

      return toSuccessResponse({
        generatedAt: now,
        dataSource: 'API',
        isStale: false,
        lastExternalRecptnAt: now,
        freshnessSec: 25,
        confidenceLevel: 'HIGH',
        trainRealTimes,
      });
    },
  },
  {
    method: 'POST',
    pattern: API_PATHS.subway.delayProofsV2,
    resolver: async ({ request }) => {
      const payload = await parseRequestBody(request);
      const stationId = toNumber(String(payload.stationId ?? ''), 201);
      const subwayLineId = toNumber(String(payload.subwayLineId ?? ''), 2);
      const proofId = `dpv2_${Date.now().toString(36)}`;
      const proof = createDelayProofPayload(proofId, stationId, subwayLineId);
      const customMessage = String(payload.customMessage ?? '').trim();
      if (customMessage) {
        proof.text = customMessage;
      }
      state.delayProofs[proofId] = proof;
      return toSuccessResponse(proof);
    },
  },
  {
    method: 'GET',
    pattern: '/v2/delay-proofs/:proofId',
    resolver: ({ params }) => {
      const proof = state.delayProofs[params.proofId];
      if (!proof) {
        return toErrorResponse('Delay proof not found.', 404);
      }

      return toSuccessResponse(proof);
    },
  },
  {
    method: 'GET',
    pattern: API_PATHS.subway.subwayIncidentsV2,
    resolver: () =>
      toSuccessResponse({
        incidents: [
          {
            eventId: 'evt-2-201',
            occurredAt: toIsoDate(20),
            resolvedAt: null,
            severity: 'MEDIUM',
            title: '2호선 일부 지연',
            description: '시설 점검으로 일부 구간 운행 간격이 증가했습니다.',
            source: '서울교통공사',
            sourceUrl: null,
          },
        ],
      }),
  },
  {
    method: 'GET',
    pattern: API_PATHS.subway.communityDelaySignalsV2,
    resolver: ({ url }) => {
      const subwayLineId = toNumber(url.searchParams.get('subwayLineId'), 2);
      const stationIdRaw = url.searchParams.get('stationId');
      const stationId =
        stationIdRaw && stationIdRaw.trim().length > 0 ? toNumber(stationIdRaw, 0) : null;
      const windowMinutes = toNumber(url.searchParams.get('windowMinutes'), 30);
      const normalizedWindowMinutes = Math.max(5, Math.min(120, windowMinutes));
      const slotSignals = stationId ? 7 : 4;
      const slotAuthors = stationId ? 5 : 3;
      let reliabilityBadgeLevel: 'SPIKE' | 'ELEVATED' | 'NONE' = 'NONE';

      if (slotSignals >= 6 && slotAuthors >= 4) {
        reliabilityBadgeLevel = 'SPIKE';
      } else if (slotSignals >= 3 && slotAuthors >= 2) {
        reliabilityBadgeLevel = 'ELEVATED';
      }

      return toSuccessResponse({
        subwayLineId,
        stationId,
        windowMinutes: normalizedWindowMinutes,
        timeSlotMinutes: 10,
        signalCount: stationId ? 18 : 9,
        distinctAuthors: stationId ? 11 : 6,
        medianReportedDelayMin: stationId ? 8 : 6,
        confidenceLevel: stationId ? 'HIGH' : 'MEDIUM',
        reliabilityBadgeLevel,
        sameTimeSlotSignalCount: slotSignals,
        sameTimeSlotDistinctAuthors: slotAuthors,
        signals: [
          {
            postId: 1001,
            createdAt: toIsoDate(9),
            writer: '아차철러',
            matchedKeyword: '지연',
            reportedDelayMin: 8,
            snippet: '체감 지연이 꽤 큽니다.',
          },
          {
            postId: 1002,
            createdAt: toIsoDate(8),
            writer: '출근메이트',
            matchedKeyword: '연착',
            reportedDelayMin: 6,
            snippet: '열차 간격이 늘어난 느낌입니다.',
          },
        ],
      });
    },
  },
  {
    method: 'GET',
    pattern: API_PATHS.subway.stationTimeSummaryV2,
    resolver: ({ url }) => {
      const stationTimeWeekType = (
        url.searchParams.get('stationTimeWeekType') ?? 'WEEKDAY'
      ).toUpperCase();
      return toSuccessResponse({
        stationTimeWeekType,
        summaries: [
          {
            upDownType: 'UP',
            firstDepartureTime: '05:30:00',
            lastDepartureTime: '23:58:00',
            firstDestinationStationName: '성수',
            lastDestinationStationName: '성수',
          },
          {
            upDownType: 'DOWN',
            firstDepartureTime: '05:32:00',
            lastDepartureTime: '23:55:00',
            firstDestinationStationName: '신도림',
            lastDestinationStationName: '신도림',
          },
        ],
      });
    },
  },
  {
    method: 'GET',
    pattern: API_PATHS.subway.stationLastTrainRiskV2,
    resolver: ({ url }) => {
      const walkingMinutes = toNumber(url.searchParams.get('walkingMinutes'), 15);
      let riskLevel: 'SAFE' | 'WARN' | 'RISK' = 'SAFE';
      if (walkingMinutes >= 18) {
        riskLevel = 'RISK';
      } else if (walkingMinutes >= 12) {
        riskLevel = 'WARN';
      }
      return toSuccessResponse({
        stationTimeWeekType: (
          url.searchParams.get('stationTimeWeekType') ?? 'WEEKDAY'
        ).toUpperCase(),
        upDownType: (url.searchParams.get('upDownType') ?? 'UP').toUpperCase(),
        walkingMinutes,
        nowAt: new Date().toISOString(),
        lastDepartureTime: '23:58:00',
        minutesToLastTrain: Math.max(3, 20 - walkingMinutes),
        isLastTrainRisk: walkingMinutes >= 18,
        riskLevel,
        message: walkingMinutes >= 18 ? '막차 위험 구간입니다.' : '여유가 있습니다.',
      });
    },
  },
  {
    method: 'GET',
    pattern: API_PATHS.subway.stationQuickExitsV2,
    resolver: ({ url }) => {
      const stationId = toNumber(url.searchParams.get('stationId'), 201);
      const subwayLineId = toNumber(url.searchParams.get('subwayLineId'), 2);
      const upDownType = (url.searchParams.get('upDownType') ?? 'UP').toUpperCase();
      return toSuccessResponse({
        stationId,
        subwayLineId,
        upDownType,
        recommendations: [
          {
            carNo: '4-2',
            exitNo: '3',
            directionHint: '환승 통로 방향',
            walkingBenefitMinutes: 2,
            confidenceLevel: 'HIGH',
          },
          {
            carNo: '6-1',
            exitNo: '2',
            directionHint: '지상 출구 방향',
            walkingBenefitMinutes: 1,
            confidenceLevel: 'MEDIUM',
          },
        ],
      });
    },
  },
  {
    method: 'GET',
    pattern: API_PATHS.subway.stationNearbyPlacesV2,
    resolver: ({ url }) => {
      const stationId = toNumber(url.searchParams.get('stationId'), 201);
      const subwayLineId = toNumber(url.searchParams.get('subwayLineId'), 2);
      const limit = Math.min(Math.max(toNumber(url.searchParams.get('limit'), 3), 1), 10);
      const places = [
        {
          name: '강남김밥',
          category: '분식',
          essentialType: 'LATE_NIGHT_FOOD',
          walkingMinutes: 4,
          openNow: true,
          operatingHours: '08:00-23:30',
          crowdLevel: 'MEDIUM',
          crowdUpdatedAt: new Date().toISOString(),
          supportsEnglishMenu: true,
          confidenceLevel: 'HIGH',
          poiAccuracyScore: 92,
          poiAccuracyReason: '지도 좌표 + 최근 방문 리뷰 메타 일치',
          reliabilityScore: 88,
          reliabilityReason: '최근 7일 사용자 확인',
          sourceCount: 9,
          lastVerifiedAt: new Date().toISOString(),
        },
        {
          name: '역전우동',
          category: '한식',
          essentialType: 'LATE_NIGHT_FOOD',
          walkingMinutes: 6,
          openNow: true,
          operatingHours: '10:00-02:00',
          crowdLevel: 'HIGH',
          crowdUpdatedAt: new Date().toISOString(),
          supportsEnglishMenu: false,
          confidenceLevel: 'MEDIUM',
          poiAccuracyScore: 84,
          poiAccuracyReason: '운영시간 메타 + 후기 타임라인 근거',
          reliabilityScore: 79,
          reliabilityReason: '최근 14일 제보 기반',
          sourceCount: 6,
          lastVerifiedAt: new Date().toISOString(),
        },
        {
          name: '커피스테이션',
          category: '카페',
          essentialType: 'CONVENIENCE_STORE',
          walkingMinutes: 3,
          openNow: true,
          operatingHours: '07:00-22:00',
          crowdLevel: 'LOW',
          crowdUpdatedAt: new Date().toISOString(),
          supportsEnglishMenu: true,
          confidenceLevel: 'HIGH',
          poiAccuracyScore: 90,
          poiAccuracyReason: '브랜드 POI DB와 좌표 검증 일치',
          reliabilityScore: 86,
          reliabilityReason: '매장 운영 상태 최근 갱신',
          sourceCount: 8,
          lastVerifiedAt: new Date().toISOString(),
        },
      ];
      return toSuccessResponse({
        stationId,
        subwayLineId,
        exitNo: url.searchParams.get('exitNo'),
        places: places.slice(0, limit),
      });
    },
  },
  {
    method: 'GET',
    pattern: API_PATHS.subway.stationWeatherBriefV2,
    resolver: ({ url }) => {
      const stationId = toNumber(url.searchParams.get('stationId'), 201);
      const stationName =
        state.subwayLines.flatMap(line => line.stations).find(station => station.id === stationId)
          ?.name ?? '강남';

      return toSuccessResponse({
        stationId,
        stationName,
        generatedAt: new Date().toISOString(),
        dataSource: 'API',
        isStale: false,
        summaryText: '현재 대체로 맑음, 9°C',
        cautionText: '일교차가 커요. 얇은 겉옷을 챙기면 좋아요.',
        friendlyText: '오늘은 날씨가 화창합니다. 좋은 하루 되세요.',
        temperatureC: 9.2,
        apparentTemperatureC: 7.1,
        precipitationMm: 0.0,
        windSpeedMps: 2.4,
        weatherCode: 1,
        weatherLabel: '대체로 맑음',
      });
    },
  },
  {
    method: 'GET',
    pattern: '/common/presigned/:s3Key',
    resolver: ({ params, url }) => {
      const fileName = url.searchParams.get('fileName');
      const safeName = fileName ? encodeURIComponent(fileName) : 'file';
      return HttpResponse.json({
        url: `${url.origin}/mock-s3/upload/${params.s3Key}?fileName=${safeName}`,
      });
    },
  },
  {
    method: 'POST',
    pattern: '/common/presigned/:s3Key',
    resolver: ({ params, url }) =>
      HttpResponse.json({
        url: `${url.origin}/mock-s3/upload/${params.s3Key}`,
        fields: {
          key: `uploads/${params.s3Key}`,
          policy: 'mock-policy',
          'x-amz-signature': 'mock-signature',
        },
      }),
  },
  {
    method: 'POST',
    pattern: '/mock-s3/upload/:s3Key',
    resolver: () => HttpResponse.json({}, { status: 201 }),
  },
];

function createComment(
  servicePath: string,
  postId: number,
  payload: Record<string, unknown>,
): Response {
  const content = String(payload.content ?? '').trim();

  if (!content) {
    return toErrorResponse('Comment content is required.');
  }

  const upperCommentIdRaw = payload.upperCommentId;
  const upperCommentId =
    typeof upperCommentIdRaw === 'number' && Number.isFinite(upperCommentIdRaw)
      ? upperCommentIdRaw
      : null;

  const key = commentKey(servicePath, postId);
  const threads = state.comments[key] ?? [];
  const id = state.nextCommentId++;
  const createdAt = new Date().toISOString();

  const comment: MockComment = {
    id,
    title: '댓글',
    writer: state.user.nickname,
    content,
    createdAt,
    createdBy: String(state.user.memberId),
    status: 'CREATED',
    upperCommentId,
  };

  if (upperCommentId === null) {
    threads.unshift({ parentComment: comment, childComments: [] });
  } else {
    const parentThread = threads.find(thread => thread.parentComment.id === upperCommentId);

    if (!parentThread) {
      return toErrorResponse('Parent comment not found.', 404);
    }

    parentThread.childComments.push(comment);
  }

  state.comments[key] = threads;
  updateCommentCount(servicePath, postId, 1);

  return toSuccessResponse({
    id,
    upperCommentId,
    content,
  });
}

function resolveRoute(
  method: string,
  normalizedPath: string,
): { route: RouteDefinition; params: Record<string, string> } | null {
  for (const route of routes) {
    if (route.method !== method) {
      continue;
    }

    const params = matchRoute(route.pattern, normalizedPath);

    if (params) {
      return { route, params };
    }
  }

  return null;
}

async function handleApiRequest(request: Request): Promise<Response | undefined> {
  const url = new URL(request.url);
  const normalizedPath = normalizePathname(url.pathname);

  if (!normalizedPath) {
    return undefined;
  }

  const matched = resolveRoute(request.method.toUpperCase(), normalizedPath);

  if (!matched) {
    return toErrorResponse(`Unhandled mock API endpoint: ${request.method} ${normalizedPath}`, 404);
  }

  try {
    return await matched.route.resolver({
      request,
      url,
      rawPathname: url.pathname,
      normalizedPath,
      params: matched.params,
    });
  } catch {
    return toErrorResponse(RESPONSE_MESSAGES.internalServerError, 500);
  }
}

export function isApiRequestPath(pathname: string): boolean {
  return normalizePathname(pathname) !== null;
}

export function isApiRequest(request: Request | string | URL): boolean {
  if (typeof request === 'string') {
    return isApiRequestPath(new URL(request, 'http://localhost').pathname);
  }

  if (request instanceof URL) {
    return isApiRequestPath(request.pathname);
  }

  return isApiRequestPath(new URL(request.url).pathname);
}

export function createMockUnhandledRequestStrategy(): MockUnhandledRequestStrategy {
  return (request, print) => {
    if (isApiRequest(request)) {
      print.error();
    }
  };
}

export function resetMockApiState() {
  state = createInitialState();
}

export const mockApiHandlers = [
  http.all('*', async ({ request }) => {
    return handleApiRequest(request);
  }),
];
