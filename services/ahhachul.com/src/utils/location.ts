import { createActionLogger } from './observability';

const DAUM_POSTCODE_SCRIPT_URL =
  'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
const KAKAO_LOCAL_CATEGORY_SEARCH_URL = 'https://dapi.kakao.com/v2/local/search/category.json';
const KAKAO_LOCAL_SUBWAY_CATEGORY_CODE = 'SW8';
const DEFAULT_WALKING_METER_PER_MINUTE = 80;
const locationLogger = createActionLogger('location-utils');

export type DaumAddressResult = {
  address: string;
  roadAddress?: string;
  jibunAddress?: string;
};

export type KakaoNearbySubwayStation = {
  placeName: string;
  categoryName: string;
  distanceMeters: number;
  latitude: number;
  longitude: number;
  roadAddress?: string;
  address?: string;
};

function ensureDaumPostcodeScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('브라우저 환경에서만 주소 검색을 사용할 수 있습니다.'));
  }

  if (window.daum?.Postcode) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${DAUM_POSTCODE_SCRIPT_URL}"]`,
    );
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener(
        'error',
        () => reject(new Error('주소 검색 스크립트 로드 실패')),
        {
          once: true,
        },
      );
      return;
    }

    const script = document.createElement('script');
    script.src = DAUM_POSTCODE_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('주소 검색 스크립트를 불러오지 못했습니다.'));
    document.head.appendChild(script);
  });
}

export async function openDaumAddressSearch(): Promise<DaumAddressResult> {
  await ensureDaumPostcodeScript();

  return new Promise((resolve, reject) => {
    if (!window.daum?.Postcode) {
      reject(new Error('주소 검색 기능을 사용할 수 없습니다.'));
      return;
    }

    try {
      const postcode = new window.daum.Postcode({
        oncomplete: data => {
          resolve({
            address: data.address,
            roadAddress: data.roadAddress,
            jibunAddress: data.jibunAddress,
          });
        },
      });
      postcode.open();
    } catch (error) {
      reject(error instanceof Error ? error : new Error('주소 검색 실행에 실패했습니다.'));
    }
  });
}

type KakaoCategorySearchResponse = {
  documents: Array<{
    place_name: string;
    category_name: string;
    distance: string;
    x: string;
    y: string;
    road_address_name?: string;
    address_name?: string;
  }>;
};

export async function fetchNearbySubwayStationsByCoordinates(params: {
  latitude: number;
  longitude: number;
  radius?: number;
  limit?: number;
}): Promise<KakaoNearbySubwayStation[]> {
  const apiKey = import.meta.env.VITE_KAKAO_REST_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('VITE_KAKAO_REST_API_KEY가 설정되지 않았습니다.');
  }

  const radius = Math.min(Math.max(params.radius ?? 1500, 100), 20000);
  const limit = Math.min(Math.max(params.limit ?? 15, 1), 15);

  const query = new URLSearchParams({
    category_group_code: KAKAO_LOCAL_SUBWAY_CATEGORY_CODE,
    x: String(params.longitude),
    y: String(params.latitude),
    radius: String(radius),
    size: String(limit),
    sort: 'distance',
  });

  const response = await fetch(`${KAKAO_LOCAL_CATEGORY_SEARCH_URL}?${query.toString()}`, {
    headers: {
      Authorization: `KakaoAK ${apiKey}`,
    },
  });

  if (!response.ok) {
    locationLogger.warn('fetch-nearby-subway-stations:failed', {
      status: response.status,
      statusText: response.statusText,
    });
    throw new Error('주변 지하철역 조회에 실패했습니다.');
  }

  const data = (await response.json()) as KakaoCategorySearchResponse;

  return data.documents
    .map(document => ({
      placeName: document.place_name,
      categoryName: document.category_name,
      distanceMeters: Number(document.distance),
      latitude: Number(document.y),
      longitude: Number(document.x),
      roadAddress: document.road_address_name,
      address: document.address_name,
    }))
    .filter(station => Number.isFinite(station.latitude) && Number.isFinite(station.longitude))
    .filter(station => Number.isFinite(station.distanceMeters));
}

export function normalizeStationName(value: string): string {
  return value.trim().replace(/\s+/g, '').replace(/역$/, '');
}

export function parseLineNameFromCategory(categoryName: string): string | null {
  if (!categoryName) {
    return null;
  }

  const normalized = categoryName.replace(/\s+/g, '');
  const numericLine = normalized.match(/([1-9]|10)호선/)?.[0];
  if (numericLine) {
    return numericLine;
  }

  const candidates = [
    '경의중앙선',
    '수인분당선',
    '신분당선',
    '우이신설경전철',
    '우이신설선',
    '공항철도',
    '경춘선',
    '경강선',
    '서해선',
  ];
  return candidates.find(candidate => normalized.includes(candidate)) ?? null;
}

export function estimateWalkingMinutes(
  distanceMeters: number,
  meterPerMinute = DEFAULT_WALKING_METER_PER_MINUTE,
): number {
  if (!Number.isFinite(distanceMeters) || distanceMeters <= 0) {
    return 0;
  }
  return Math.max(1, Math.ceil(distanceMeters / meterPerMinute));
}
