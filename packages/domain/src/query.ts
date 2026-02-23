type QuerySignatureValue = string | number | boolean | null | undefined;

export type QuerySignatureInput = Record<string, QuerySignatureValue>;

function isEmptySignatureValue(value: QuerySignatureValue) {
  return value === undefined || value === null || value === '';
}

export function normalizeQuerySignature(signature: string) {
  if (!signature) {
    return '';
  }

  const entries = Array.from(new URLSearchParams(signature).entries()).sort((left, right) => {
    if (left[0] === right[0]) {
      return left[1].localeCompare(right[1]);
    }

    return left[0].localeCompare(right[0]);
  });
  const normalized = new URLSearchParams();

  entries.forEach(([key, value]) => {
    normalized.append(key, value);
  });

  return normalized.toString();
}

export function buildQuerySignature(filters: QuerySignatureInput) {
  const params = new URLSearchParams();

  Object.entries(filters)
    .sort(([left], [right]) => left.localeCompare(right))
    .forEach(([key, value]) => {
      if (isEmptySignatureValue(value)) {
        return;
      }

      params.set(key, String(value));
    });

  return params.toString();
}

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

export const QUERY_STALE_TIME = {
  feed: MINUTE,
  detail: 5 * MINUTE,
  user: 30 * MINUTE,
  static: Infinity,
} as const;

export const QUERY_GC_TIME = {
  feed: 5 * MINUTE,
  detail: 10 * MINUTE,
  user: HOUR,
  static: Infinity,
} as const;

function createPostQueryKeyFactory(scope: 'community' | 'complaint' | 'lost-found') {
  const all = [scope] as const;
  const lists = () => [...all, 'list'] as const;
  const list = (signature = '') => [...lists(), normalizeQuerySignature(signature)] as const;
  const details = () => [...all, 'detail'] as const;
  const detail = (id: number) => [...details(), id] as const;
  const comments = (id: number) => [...detail(id), 'comments'] as const;

  return {
    all,
    lists,
    list,
    details,
    detail,
    comments,
  } as const;
}

export const communityQueryKeys = createPostQueryKeyFactory('community');
export const complaintQueryKeys = createPostQueryKeyFactory('complaint');
export const lostFoundQueryKeys = createPostQueryKeyFactory('lost-found');

export const userQueryKeys = {
  all: ['user'] as const,
  info: () => [...userQueryKeys.all, 'info'] as const,
  stations: () => [...userQueryKeys.all, 'stations'] as const,
} as const;

export const myQueryKeys = {
  all: ['me'] as const,
  profile: () => [...myQueryKeys.all, 'profile'] as const,
  favoriteStations: () => [...myQueryKeys.all, 'favorite-stations'] as const,
} as const;

export const subwayQueryKeys = {
  all: ['subway'] as const,
  subwayLine: () => [...subwayQueryKeys.all, 'subway-line'] as const,
  trains: () => [...subwayQueryKeys.all, 'list'] as const,
  train: (signature = '') =>
    [...subwayQueryKeys.trains(), normalizeQuerySignature(signature)] as const,
} as const;

export const subwayRealtimeV2QueryKeys = {
  all: ['subway-realtime-v2'] as const,
  list: (signature = '') =>
    [...subwayRealtimeV2QueryKeys.all, normalizeQuerySignature(signature)] as const,
} as const;

export type PostQueryDomain = 'community' | 'complaint' | 'lost-found';

export function resolvePostQueryDomain(queryKey: readonly unknown[]): PostQueryDomain | null {
  const [scope] = queryKey;

  if (scope === 'community' || scope === 'complaint' || scope === 'lost-found') {
    return scope;
  }

  if (scope === 'lostFound') {
    return 'lost-found';
  }

  return null;
}

export function resolvePostListInvalidationKey(queryKey: readonly unknown[]) {
  const scope = resolvePostQueryDomain(queryKey);

  if (scope === 'community') {
    return communityQueryKeys.lists();
  }

  if (scope === 'lost-found') {
    return lostFoundQueryKeys.lists();
  }

  if (scope === 'complaint') {
    return complaintQueryKeys.lists();
  }

  return null;
}
