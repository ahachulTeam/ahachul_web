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
  'subway-lines',
  'trains',
  'common',
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

type MockSubwayLine = {
  id: number;
  name: string;
  phoneNumber: string;
  stations: {
    id: number;
    name: string;
  }[];
};

type MockState = {
  user: MockUser;
  communityPosts: MockCommunityPostDetail[];
  complaintPosts: MockComplaintPostDetail[];
  lostFoundPosts: MockLostFoundPostDetail[];
  comments: Record<string, MockCommentThread[]>;
  favoriteStations: MockFavoriteStation[];
  subwayLines: MockSubwayLine[];
  nextPostId: number;
  nextCommentId: number;
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

  return {
    user,
    communityPosts,
    complaintPosts,
    lostFoundPosts,
    comments,
    favoriteStations,
    subwayLines: SUBWAY_LINES,
    nextPostId: 4000,
    nextCommentId: 9000,
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

  if (trimmed.startsWith('/mock-s3/upload/')) {
    return trimmed;
  }

  if (trimmed === '/api/auth/token/refresh') {
    return API_PATHS.auth.refreshToken;
  }

  for (const segment of API_ROOT_SEGMENTS) {
    const token = `/${segment}`;
    const index = trimmed.indexOf(token);

    if (index !== -1) {
      return trimmed.slice(index);
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
    method: 'GET',
    pattern: API_PATHS.user.profile,
    resolver: () => toSuccessResponse(state.user),
  },
  {
    method: 'PATCH',
    pattern: API_PATHS.user.profile,
    resolver: async ({ request }) => {
      const payload = await parseRequestBody(request);
      const nickname = String(payload.nickname ?? '').trim();

      if (!nickname) {
        return toErrorResponse('nickname is required.');
      }

      state.user.nickname = nickname;

      return HttpResponse.json({
        nickname,
        gender: state.user.gender,
        ageRange: state.user.ageRange,
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
