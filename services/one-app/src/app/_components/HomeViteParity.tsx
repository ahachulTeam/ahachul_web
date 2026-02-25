'use client';

import { type ReactNode, useEffect, useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { API_PATHS, API_SORT } from '@ahhachul/http';

import {
  getMyFavoriteStations,
  getMyProfile,
  getMyTodayCommuteCoach,
  type CommuteCoachRiskLevel,
} from '@/app/(main-service)/me/_lib/getMyProfile';
import { SUBWAY_LOGO_SVG_LIST } from '@/components/Subway/SubwayLogoIconMap';
import { getLocaleMessages, localizePathname, type SupportedLocale } from '@/i18n';
import { AuthService } from '@/lib/auth-service';
import { fetchClient } from '@/lib/fetch-client';
import { fetchForeignerStationGuideV2 } from '@/lib/foreigner-mode';
import { createActionLogger } from '@/lib/observability';
import {
  fetchStationWeatherBriefV2,
  fetchStationTimeSummaryV2,
  fetchTrainRealtimeWithFallback,
} from '@/lib/subway-realtime-v2';
import type {
  ApiResponse,
  PaginatedList,
  RealtimeArrivalCode,
  RealtimeUpDownType,
  StationSummaryAvailabilityStatus,
  StationWeatherBriefV2Payload,
  StationWeatherDataSource,
  StationTimeSummarySourceDetail,
  StationTimeSummaryItem,
  StationTimeWeekType,
  TrainRealtimeV2SectionVM,
  ForeignerLocale as ForeignerModeLocale,
} from '@/types';
import { mapRealtimePayloadToSectionVM } from '@/types';
import type { CommunityPost } from '@/types/community';

type SubwayLineCatalogStation = {
  id: number;
  name: string;
};

type SubwayLineCatalogLine = {
  id: number;
  name: string;
  stations: SubwayLineCatalogStation[];
};

type SubwayLineCatalogResponse = {
  subwayLines: SubwayLineCatalogLine[];
};

type Hashtag = {
  id: number;
  title: string;
};

type SubwayNews = {
  id: number;
  title: string;
  lineNumber: number;
  timeElapsed: string;
  thumbnailUrl?: string;
};

const GREETING_PHRASES = [
  '멋진 오늘을 응원해요',
  '정말 잘하고 있어요',
  '언제나 늘 응원할게요',
  '매일매일 반가워요!',
  '힘차게 시작해볼까요?',
  '활짝 웃는 하루되세요',
  '하나씩 이뤄가볼까요?',
  '목표에 한 걸음 다가가요!',
] as const;

const MOCK_NEWS: SubwayNews[] = [
  {
    id: 1,
    title: '한밤 내복차림 지하철역 헤매던 90대, 시민 도움으로 무사 귀가',
    lineNumber: 2,
    timeElapsed: '2분 전',
    thumbnailUrl:
      'https://ahhachul-api-dev-bucket.s3.ap-northeast-2.amazonaws.com/230fd7b7-0614-4b9a-95af-d9bc01640ddd',
  },
  {
    id: 2,
    title: '지하철 물품보관함 운영 정책 변경 검토',
    lineNumber: 5,
    timeElapsed: '5분 전',
  },
  {
    id: 3,
    title: '출근 시간대 혼잡 구간 안전 점검 강화',
    lineNumber: 9,
    timeElapsed: '9분 전',
  },
  {
    id: 4,
    title: '8호선 구리 구간 역사 점검 결과 발표',
    lineNumber: 18,
    timeElapsed: '14분 전',
  },
  {
    id: 5,
    title: '열차 지연 대응 매뉴얼 개정안 공개',
    lineNumber: 4,
    timeElapsed: '18분 전',
  },
];

const MOCK_HASHTAGS: Hashtag[] = [
  { id: 0, title: '1호선 빌런' },
  { id: 1, title: '2호선 연착' },
  { id: 2, title: '짠테크' },
  { id: 3, title: '데일리뉴스' },
  { id: 4, title: '다이소' },
];

const HOME_COMMUNITY_PREVIEW_LIMIT = 3;

const ARRIVAL_CODE_LABELS: Record<RealtimeArrivalCode, string> = {
  ENTER: '진입',
  ARRIVE: '도착',
  DEPARTURE: '출발',
  BEFORE_STATION_DEPARTURE: '전역 출발',
  BEFORE_STATION_ENTER: '전역 진입',
  BEFORE_STATION_ARRIVE: '전역 도착',
  RUNNING: '운행중',
};

function resolveStationTimeWeekType(currentDate = new Date()): StationTimeWeekType {
  const day = currentDate.getDay();
  if (day === 0) {
    return 'HOLIDAY';
  }
  if (day === 6) {
    return 'SATURDAY';
  }
  return 'WEEKDAY';
}

function formatStationTime(time: string | null | undefined) {
  if (!time) {
    return '--:--';
  }
  return time.slice(0, 5);
}

function resolveSummaryStatusLabel(
  availabilityStatus?: StationSummaryAvailabilityStatus,
  isTemporarilyDelayed = false,
): string | null {
  if (availabilityStatus === 'AVAILABLE') {
    return '시간표 상태: 원활';
  }
  if (availabilityStatus === 'PARTIAL') {
    return '시간표 상태: 일부 제공';
  }
  if (availabilityStatus === 'EMPTY') {
    return isTemporarilyDelayed ? '시간표 상태: 일시 지연' : '시간표 상태: 미제공';
  }
  return null;
}

function resolveSummaryStatusClassName(
  availabilityStatus?: StationSummaryAvailabilityStatus,
  isTemporarilyDelayed = false,
) {
  if (availabilityStatus === 'AVAILABLE') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  }
  if (availabilityStatus === 'PARTIAL') {
    return 'border-amber-200 bg-amber-50 text-amber-700';
  }
  if (availabilityStatus === 'EMPTY' && isTemporarilyDelayed) {
    return 'border-amber-200 bg-amber-50 text-amber-700';
  }
  return 'border-rose-200 bg-rose-50 text-rose-700';
}

function isStationTimeSummaryTemporarilyDelayed(
  sourceDetails?: StationTimeSummarySourceDetail[],
): boolean {
  return Boolean(sourceDetails?.some(detail => detail.dataSource === 'FALLBACK_EMPTY'));
}

function resolveWeatherSourceLabel(
  dataSource?: StationWeatherDataSource,
  isStale?: boolean,
): string | null {
  if (dataSource === 'FALLBACK') {
    return '정보 지연';
  }
  if (isStale || dataSource === 'STALE_CACHE') {
    return '캐시(지연)';
  }
  if (dataSource === 'CACHE') {
    return '캐시';
  }
  if (dataSource === 'API') {
    return '실시간';
  }
  return null;
}

function resolveWeatherSourceClassName(
  dataSource?: StationWeatherDataSource,
  isStale?: boolean,
): string {
  if (dataSource === 'FALLBACK') {
    return 'border-rose-200 bg-rose-50 text-rose-700';
  }
  if (isStale || dataSource === 'STALE_CACHE') {
    return 'border-amber-200 bg-amber-50 text-amber-700';
  }
  if (dataSource === 'CACHE') {
    return 'border-sky-200 bg-sky-50 text-sky-700';
  }
  return 'border-emerald-200 bg-emerald-50 text-emerald-700';
}

function resolveCommuteRiskLabel(riskLevel?: CommuteCoachRiskLevel) {
  if (riskLevel === 'LOW') {
    return '안정';
  }
  if (riskLevel === 'MEDIUM') {
    return '주의';
  }
  return '긴급';
}

function resolveCommuteRiskClassName(riskLevel?: CommuteCoachRiskLevel) {
  if (riskLevel === 'LOW') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  }
  if (riskLevel === 'MEDIUM') {
    return 'border-amber-200 bg-amber-50 text-amber-700';
  }
  return 'border-rose-200 bg-rose-50 text-rose-700';
}

function toSummaryByType(summaries: StationTimeSummaryItem[] = []) {
  return summaries.reduce<Partial<Record<RealtimeUpDownType, StationTimeSummaryItem>>>(
    (accumulator, item) => {
      accumulator[item.upDownType] = item;
      return accumulator;
    },
    {},
  );
}

function resolveFavoriteLineId(lineInfoList?: Array<{ subwayLineId: number }>) {
  return lineInfoList?.[0]?.subwayLineId ?? null;
}

function toCommunityPreview(content: string) {
  if (!content) {
    return '';
  }

  return content
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const homeParityLogger = createActionLogger('home-vite-parity');

type Props = {
  locale: SupportedLocale;
};

export default function HomeViteParity({ locale }: Props) {
  const messages = getLocaleMessages(locale);
  const foreignerLocale = locale as ForeignerModeLocale;
  const stationTimeWeekType = useMemo(() => resolveStationTimeWeekType(), []);
  const greetingPhrase = useMemo(() => {
    return GREETING_PHRASES[Math.floor(Math.random() * GREETING_PHRASES.length)];
  }, []);

  const [nickname, setNickname] = useState('아하철');
  const [subwayLines, setSubwayLines] = useState<SubwayLineCatalogLine[]>([]);
  const [selectedLineId, setSelectedLineId] = useState<number>(0);
  const [selectedStationId, setSelectedStationId] = useState<number>(0);
  const [upDownType, setUpDownType] = useState<RealtimeUpDownType>('UP');
  const [isCatalogLoading, setIsCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState<string | null>(null);

  const [isRealtimeLoading, setIsRealtimeLoading] = useState(false);
  const [realtimeError, setRealtimeError] = useState<string | null>(null);
  const [realtimeSection, setRealtimeSection] = useState<TrainRealtimeV2SectionVM | null>(null);

  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [summaryByType, setSummaryByType] = useState<
    Partial<Record<RealtimeUpDownType, StationTimeSummaryItem>>
  >({});
  const [summaryStatus, setSummaryStatus] = useState<StationSummaryAvailabilityStatus | undefined>(
    undefined,
  );
  const [isSummaryTemporarilyDelayed, setIsSummaryTemporarilyDelayed] = useState(false);
  const [summaryNoDataMessage, setSummaryNoDataMessage] =
    useState('시간표 정보를 확인할 수 없습니다.');

  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [weatherBrief, setWeatherBrief] = useState<StationWeatherBriefV2Payload | null>(null);

  const selectedLine = useMemo(
    () => subwayLines.find(line => line.id === selectedLineId) ?? null,
    [selectedLineId, subwayLines],
  );
  const isLoggedIn = AuthService.isLoggedIn;
  const stationOptions = selectedLine?.stations ?? [];
  const selectedStationName =
    stationOptions.find(station => station.id === selectedStationId)?.name ?? '역 선택';

  const stationCommunityMoreHref = useMemo(() => {
    if (!selectedStationId) {
      return null;
    }

    const search = new URLSearchParams();
    search.set('stationId', String(selectedStationId));
    if (selectedLineId) {
      search.set('subwayLineId', String(selectedLineId));
    }
    if (selectedStationName !== '역 선택') {
      search.set('stationName', selectedStationName);
    }
    if (selectedLine?.name) {
      search.set('lineName', selectedLine.name);
    }

    return `${localizePathname(`/community/station/${selectedStationId}`, locale)}?${search.toString()}`;
  }, [locale, selectedLine?.name, selectedLineId, selectedStationId, selectedStationName]);

  const lineCommunityMoreHref = useMemo(() => {
    if (!selectedLineId) {
      return null;
    }

    const search = new URLSearchParams();
    search.set('subwayLineId', String(selectedLineId));
    if (selectedLine?.name) {
      search.set('lineName', selectedLine.name);
    }

    return `${localizePathname(`/community/line/${selectedLineId}`, locale)}?${search.toString()}`;
  }, [locale, selectedLine?.name, selectedLineId]);

  const stationCommunityHotQuery = useQuery({
    queryKey: ['home', 'community-hot', 'station', selectedLineId, selectedStationId],
    enabled: selectedLineId > 0 && selectedStationId > 0,
    queryFn: () =>
      fetchClient<ApiResponse<PaginatedList<CommunityPost>>>(API_PATHS.community.hotList, {
        params: {
          subwayLineIds: String(selectedLineId),
          stationId: selectedStationId,
          pageSize: HOME_COMMUNITY_PREVIEW_LIMIT,
          sort: API_SORT.createdAtDesc,
        },
        next: {
          tags: ['community', 'posts', 'home', 'station'],
        },
      }),
  });

  const lineCommunityHotQuery = useQuery({
    queryKey: ['home', 'community-hot', 'line', selectedLineId],
    enabled: selectedLineId > 0,
    queryFn: () =>
      fetchClient<ApiResponse<PaginatedList<CommunityPost>>>(API_PATHS.community.hotList, {
        params: {
          subwayLineIds: String(selectedLineId),
          pageSize: HOME_COMMUNITY_PREVIEW_LIMIT,
          sort: API_SORT.createdAtDesc,
        },
        next: {
          tags: ['community', 'posts', 'home', 'line'],
        },
      }),
  });

  const commuteCoachQuery = useQuery({
    queryKey: ['home', 'commute-coach', 'today'],
    enabled: isLoggedIn,
    queryFn: () =>
      getMyTodayCommuteCoach({
        targetArrivalAt: '09:00',
        timezone: 'Asia/Seoul',
      }),
  });

  const foreignerGuideQuery = useQuery({
    queryKey: ['home', 'foreigner-guide-v2', selectedStationId, selectedLineId, foreignerLocale],
    enabled: selectedStationId > 0 && selectedLineId > 0,
    queryFn: () =>
      fetchForeignerStationGuideV2({
        stationId: selectedStationId,
        subwayLineId: selectedLineId,
        locale: foreignerLocale,
      }),
  });

  useEffect(() => {
    if (!stationCommunityHotQuery.error) {
      return;
    }

    homeParityLogger.fail(
      'load-station-community-hot',
      stationCommunityHotQuery.error,
      {
        selectedLineId,
        selectedStationId,
      },
      '역 커뮤니티 인기글을 불러오지 못했습니다.',
    );
  }, [
    selectedLineId,
    selectedStationId,
    stationCommunityHotQuery.error,
    stationCommunityHotQuery.errorUpdatedAt,
  ]);

  useEffect(() => {
    if (!lineCommunityHotQuery.error) {
      return;
    }

    homeParityLogger.fail(
      'load-line-community-hot',
      lineCommunityHotQuery.error,
      {
        selectedLineId,
      },
      '호선 커뮤니티 인기글을 불러오지 못했습니다.',
    );
  }, [lineCommunityHotQuery.error, lineCommunityHotQuery.errorUpdatedAt, selectedLineId]);

  useEffect(() => {
    if (!commuteCoachQuery.error) {
      return;
    }

    homeParityLogger.fail(
      'load-commute-coach',
      commuteCoachQuery.error,
      undefined,
      '출근 코치 정보를 불러오지 못했습니다.',
    );
  }, [commuteCoachQuery.error, commuteCoachQuery.errorUpdatedAt]);

  useEffect(() => {
    if (!foreignerGuideQuery.error) {
      return;
    }

    homeParityLogger.fail(
      'load-foreigner-guide',
      foreignerGuideQuery.error,
      {
        selectedLineId,
        selectedStationId,
        locale: foreignerLocale,
      },
      '외국인 모드 가이드를 불러오지 못했습니다.',
    );
  }, [
    foreignerGuideQuery.error,
    foreignerGuideQuery.errorUpdatedAt,
    foreignerLocale,
    selectedLineId,
    selectedStationId,
  ]);

  useEffect(() => {
    let isActive = true;

    async function loadCatalog() {
      homeParityLogger.start('load-catalog', {});
      setIsCatalogLoading(true);
      setCatalogError(null);

      try {
        const response = await fetchClient<ApiResponse<SubwayLineCatalogResponse>>(
          API_PATHS.subway.lines,
        );
        if (!isActive) {
          return;
        }

        const lines = response.result.subwayLines ?? [];
        setSubwayLines(lines);

        if (!lines.length) {
          setSelectedLineId(0);
          setSelectedStationId(0);
          return;
        }

        setSelectedLineId(previousLineId => {
          const hasCurrentLine = lines.some(line => line.id === previousLineId);
          return hasCurrentLine ? previousLineId : lines[0].id;
        });
        homeParityLogger.success('load-catalog', {
          lineCount: lines.length,
        });
      } catch (error) {
        if (!isActive) {
          return;
        }
        homeParityLogger.fail(
          'load-catalog',
          error,
          {
            isActive,
          },
          '노선/역 정보를 불러오지 못했습니다.',
        );
        setCatalogError('노선/역 정보를 불러오지 못했습니다.');
      } finally {
        if (isActive) {
          setIsCatalogLoading(false);
        }
      }
    }

    void loadCatalog();
    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!stationOptions.length) {
      setSelectedStationId(0);
      return;
    }

    setSelectedStationId(previousStationId => {
      const hasCurrentStation = stationOptions.some(station => station.id === previousStationId);
      return hasCurrentStation ? previousStationId : stationOptions[0].id;
    });
  }, [stationOptions]);

  useEffect(() => {
    let isActive = true;

    async function loadUserContext() {
      if (!AuthService.isLoggedIn) {
        return;
      }

      try {
        const profile = await getMyProfile();
        if (isActive && profile.result?.nickname) {
          setNickname(profile.result.nickname);
        }
      } catch (error) {
        // 인증이 만료된 경우는 기본 닉네임으로 유지한다.
        homeParityLogger.fail(
          'load-user-profile',
          error,
          undefined,
          '사용자 정보를 불러오지 못했습니다.',
        );
      }

      try {
        const favoriteStations = await getMyFavoriteStations();
        if (!isActive) {
          return;
        }

        const favoriteStation = favoriteStations.result.stationInfoList?.[0];
        if (!favoriteStation) {
          return;
        }

        const favoriteLineId = resolveFavoriteLineId(favoriteStation.subwayLineInfoList);
        if (favoriteLineId) {
          setSelectedLineId(favoriteLineId);
        }
        setSelectedStationId(favoriteStation.stationId);
      } catch (error) {
        // 즐겨찾기 역 조회 실패는 홈 렌더를 막지 않는다.
        homeParityLogger.fail(
          'load-user-favorite-station',
          error,
          undefined,
          '즐겨찾는 역 정보를 불러오지 못했습니다.',
        );
      }
    }

    void loadUserContext();
    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedLineId || !selectedStationId) {
      setRealtimeSection(null);
      setSummaryByType({});
      setSummaryStatus(undefined);
      setIsSummaryTemporarilyDelayed(false);
      return;
    }

    let isActive = true;
    let initialLoad = true;

    async function loadRealtimeAndSummary() {
      homeParityLogger.start('load-realtime-and-summary', {
        selectedLineId,
        selectedStationId,
        upDownType,
      });
      let hasRealtimeError = false;
      let hasSummaryError = false;
      if (initialLoad) {
        setIsRealtimeLoading(true);
        setIsSummaryLoading(true);
      }

      try {
        const realtimeResponse = await fetchTrainRealtimeWithFallback({
          stationId: selectedStationId,
          subwayLineId: selectedLineId,
          upDownType,
          limit: 2,
        });
        if (!isActive) {
          return;
        }
        setRealtimeError(null);
        setRealtimeSection(mapRealtimePayloadToSectionVM(realtimeResponse.result));
      } catch (error) {
        if (!isActive) {
          return;
        }
        homeParityLogger.fail(
          'load-realtime',
          error,
          {
            selectedLineId,
            selectedStationId,
            upDownType,
          },
          '실시간 도착 정보를 불러오지 못했습니다.',
        );
        setRealtimeError('실시간 도착 정보를 불러오지 못했습니다.');
        setRealtimeSection(null);
        hasRealtimeError = true;
      } finally {
        if (isActive && initialLoad) {
          setIsRealtimeLoading(false);
        }
      }

      try {
        const summaryResponse = await fetchStationTimeSummaryV2({
          stationId: selectedStationId,
          subwayLineId: selectedLineId,
          stationTimeWeekType,
        });
        if (!isActive) {
          return;
        }

        setSummaryError(null);
        setSummaryByType(toSummaryByType(summaryResponse.result.summaries));
        setSummaryStatus(summaryResponse.result.meta?.availabilityStatus);
        setIsSummaryTemporarilyDelayed(
          isStationTimeSummaryTemporarilyDelayed(summaryResponse.result.meta?.sourceDetails),
        );
        setSummaryNoDataMessage(
          summaryResponse.result.meta?.guidanceMessage ?? '시간표 정보를 확인할 수 없습니다.',
        );
      } catch (error) {
        if (!isActive) {
          return;
        }
        homeParityLogger.fail(
          'load-station-summary',
          error,
          {
            selectedLineId,
            selectedStationId,
            stationTimeWeekType,
          },
          '첫차/막차 정보를 불러오지 못했습니다.',
        );
        setSummaryError('첫차/막차 정보를 불러오지 못했습니다.');
        setSummaryByType({});
        setSummaryStatus(undefined);
        setIsSummaryTemporarilyDelayed(false);
        hasSummaryError = true;
      } finally {
        if (isActive && initialLoad) {
          setIsSummaryLoading(false);
        }
      }

      if (!hasRealtimeError && !hasSummaryError) {
        homeParityLogger.success('load-realtime-and-summary', {
          selectedLineId,
          selectedStationId,
          upDownType,
        });
      }
      initialLoad = false;
    }

    void loadRealtimeAndSummary();
    const timerId = window.setInterval(loadRealtimeAndSummary, 20_000);

    return () => {
      isActive = false;
      window.clearInterval(timerId);
    };
  }, [selectedLineId, selectedStationId, stationTimeWeekType, upDownType]);

  useEffect(() => {
    if (!selectedStationId) {
      setWeatherBrief(null);
      setWeatherError(null);
      return;
    }

    let isActive = true;
    let initialLoad = true;

    async function loadWeatherBrief() {
      homeParityLogger.start('load-weather-brief', {
        selectedStationId,
      });
      let hasWeatherError = false;
      if (initialLoad) {
        setIsWeatherLoading(true);
      }

      try {
        const weatherResponse = await fetchStationWeatherBriefV2({
          stationId: selectedStationId,
        });
        if (!isActive) {
          return;
        }

        setWeatherError(null);
        setWeatherBrief(weatherResponse.result);
      } catch (error) {
        if (!isActive) {
          return;
        }
        homeParityLogger.fail(
          'load-weather-brief',
          error,
          {
            selectedStationId,
          },
          '오늘 날씨 정보를 불러오지 못했습니다.',
        );
        setWeatherBrief(null);
        setWeatherError('오늘 날씨 정보를 불러오지 못했습니다.');
        hasWeatherError = true;
      } finally {
        if (isActive && initialLoad) {
          setIsWeatherLoading(false);
        }
      }

      if (!hasWeatherError) {
        homeParityLogger.success('load-weather-brief', {
          selectedStationId,
        });
      }
      initialLoad = false;
    }

    void loadWeatherBrief();
    const timerId = window.setInterval(loadWeatherBrief, 300_000);

    return () => {
      isActive = false;
      window.clearInterval(timerId);
    };
  }, [selectedStationId]);

  const summaryStatusLabel = resolveSummaryStatusLabel(summaryStatus, isSummaryTemporarilyDelayed);
  const stationCommunityPosts =
    stationCommunityHotQuery.data?.result.data.slice(0, HOME_COMMUNITY_PREVIEW_LIMIT) ?? [];
  const lineCommunityPosts =
    lineCommunityHotQuery.data?.result.data.slice(0, HOME_COMMUNITY_PREVIEW_LIMIT) ?? [];

  let summaryContent: ReactNode;
  if (isSummaryLoading) {
    summaryContent = (
      <p className="mt-2 text-body-small text-gray-70">첫차/막차 정보를 불러오는 중입니다.</p>
    );
  } else if (summaryError) {
    summaryContent = <p className="mt-2 text-body-small text-danger">{summaryError}</p>;
  } else {
    summaryContent = (
      <div className="mt-2 space-y-1 text-body-small text-gray-90">
        <p>
          상행 {formatStationTime(summaryByType.UP?.firstDepartureTime)} /{' '}
          {formatStationTime(summaryByType.UP?.lastDepartureTime)}
        </p>
        <p>
          하행 {formatStationTime(summaryByType.DOWN?.firstDepartureTime)} /{' '}
          {formatStationTime(summaryByType.DOWN?.lastDepartureTime)}
        </p>
        {summaryStatus === 'EMPTY' ? (
          <p className="text-body-small text-gray-70">{summaryNoDataMessage}</p>
        ) : null}
      </div>
    );
  }

  let realtimeContent: ReactNode;
  if (isRealtimeLoading) {
    realtimeContent = (
      <p className="mt-2 text-body-small text-gray-70">실시간 도착 정보를 불러오는 중입니다.</p>
    );
  } else if (realtimeError) {
    realtimeContent = <p className="mt-2 text-body-small text-danger">{realtimeError}</p>;
  } else if (!realtimeSection || realtimeSection.empty) {
    realtimeContent = (
      <p className="mt-2 text-body-small text-gray-70">표시할 도착 열차가 없습니다.</p>
    );
  } else {
    realtimeContent = (
      <ul className="mt-2 space-y-2">
        {realtimeSection.cards.map(card => (
          <li key={card.id} className="rounded-lg border border-gray-20 bg-gray-05 p-2">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white px-2 py-0.5 text-label-small text-gray-90">
                {card.upDownType === 'UP' ? '상행' : '하행'}
              </span>
              <span className="text-label-small text-gray-70">
                {ARRIVAL_CODE_LABELS[card.arrivalCode]}
              </span>
            </div>
            <p className="mt-1 text-body-small text-gray-100">
              {card.etaMinDisplay}분 후 · {card.destinationText}
            </p>
            <p className="mt-1 text-body-small text-gray-70">{card.nextStationText}</p>
          </li>
        ))}
      </ul>
    );
  }

  const weatherSourceLabel = resolveWeatherSourceLabel(
    weatherBrief?.dataSource,
    weatherBrief?.isStale,
  );

  let weatherContent: ReactNode;
  if (isWeatherLoading) {
    weatherContent = (
      <p className="mt-2 text-body-small text-gray-70">오늘 날씨를 불러오는 중입니다.</p>
    );
  } else if (weatherError) {
    weatherContent = <p className="mt-2 text-body-small text-danger">{weatherError}</p>;
  } else if (!weatherBrief) {
    weatherContent = (
      <p className="mt-2 text-body-small text-gray-70">현재 날씨 정보를 확인할 수 없습니다.</p>
    );
  } else {
    weatherContent = (
      <div className="mt-2 space-y-1 text-body-small text-gray-90">
        <p>{weatherBrief.summaryText}</p>
        <p className="text-gray-70">{weatherBrief.cautionText}</p>
        <p className="text-gray-70">{weatherBrief.friendlyText}</p>
      </div>
    );
  }

  const commuteCoach = commuteCoachQuery.data?.result;
  const primaryCommuteRoute = commuteCoach?.primaryRoute ?? null;
  let departureLabel = '-';
  if (commuteCoach?.departureInMinutes != null) {
    departureLabel =
      commuteCoach.departureInMinutes <= 0
        ? '지금 바로 출발 권장'
        : `${commuteCoach.departureInMinutes}분 후`;
  }

  let commuteCoachContent: ReactNode;
  if (!isLoggedIn) {
    commuteCoachContent = (
      <p className="mt-2 text-body-small text-gray-70">로그인 후 출근 코치를 확인할 수 있습니다.</p>
    );
  } else if (commuteCoachQuery.isPending) {
    commuteCoachContent = (
      <p className="mt-2 text-body-small text-gray-70">출근 코치 정보를 계산하는 중입니다.</p>
    );
  } else if (commuteCoachQuery.isError) {
    commuteCoachContent = (
      <p className="mt-2 text-body-small text-danger">출근 코치 정보를 불러오지 못했습니다.</p>
    );
  } else if (!commuteCoach || !primaryCommuteRoute) {
    commuteCoachContent = (
      <p className="mt-2 text-body-small text-gray-70">
        {commuteCoach?.guidanceMessage ??
          '즐겨찾는 역을 2개 이상 등록하면 출근 코치를 제공할 수 있어요.'}
      </p>
    );
  } else {
    commuteCoachContent = (
      <div className="mt-2 space-y-2">
        <div className="grid gap-1 text-body-small text-gray-90">
          <p>목표 도착 시각 {commuteCoach.targetArrivalAt}</p>
          <p>권장 출발 시각 {commuteCoach.safeDepartureAt ?? '-'}</p>
          <p>출발 권장 {departureLabel}</p>
        </div>
        <div className="rounded-lg border border-gray-20 bg-gray-05 p-2">
          <p className="text-label-small text-gray-100">
            기본 경로 {primaryCommuteRoute.sourceStationName} {'->'}{' '}
            {primaryCommuteRoute.destinationStationName}
          </p>
          <p className="mt-1 text-label-small text-gray-70">
            정거장 {primaryCommuteRoute.summary.totalStops} · 환승{' '}
            {primaryCommuteRoute.summary.transferCount} · 예상{' '}
            {primaryCommuteRoute.summary.estimatedMinutes}분
          </p>
        </div>
        {commuteCoach.alternativeRoutes.length > 0 ? (
          <p className="text-label-small text-gray-70">
            대체 경로 {commuteCoach.alternativeRoutes.length}개 제공
          </p>
        ) : null}
        <ul className="space-y-1">
          {commuteCoach.riskReasons.slice(0, 2).map(reason => (
            <li key={reason} className="text-label-small text-gray-70">
              · {reason}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const foreignerGuide = foreignerGuideQuery.data ?? null;
  let foreignerGuideContent: ReactNode;
  if (foreignerGuideQuery.isLoading) {
    foreignerGuideContent = (
      <p className="mt-2 text-body-small text-gray-70">외국인 모드 가이드를 불러오는 중입니다.</p>
    );
  } else if (foreignerGuideQuery.isError) {
    foreignerGuideContent = (
      <p className="mt-2 text-body-small text-danger">외국인 모드 가이드를 불러오지 못했습니다.</p>
    );
  } else if (!foreignerGuide) {
    foreignerGuideContent = (
      <p className="mt-2 text-body-small text-gray-70">외국인 모드 안내 정보가 없습니다.</p>
    );
  } else {
    foreignerGuideContent = (
      <div className="mt-2 space-y-2">
        <div className="rounded-lg border border-gray-20 bg-gray-05 p-2">
          <p className="text-label-small text-gray-100">
            {foreignerGuide.station.nameLocalized} ·{' '}
            {foreignerGuide.station.subwayLineNameLocalized}
          </p>
          <p className="mt-1 text-label-small text-gray-70">
            Romanized: {foreignerGuide.station.romanizedName}
          </p>
          <p className="text-label-small text-gray-70">
            Pronunciation: {foreignerGuide.station.pronunciation}
          </p>
        </div>
        <ul className="space-y-1">
          <li className="text-label-small text-gray-70">
            · {foreignerGuide.cultureGuide.lastTrainTip}
          </li>
          <li className="text-label-small text-gray-70">
            · {foreignerGuide.cultureGuide.transferEtiquetteTip}
          </li>
          <li className="text-label-small text-gray-70">
            · {foreignerGuide.cultureGuide.safetyTip}
          </li>
        </ul>
      </div>
    );
  }

  let stationCommunityContent: ReactNode;
  if (stationCommunityHotQuery.isLoading) {
    stationCommunityContent = (
      <p className="mt-2 text-body-small text-gray-70">역 커뮤니티 인기글을 불러오는 중입니다.</p>
    );
  } else if (stationCommunityHotQuery.isError) {
    stationCommunityContent = (
      <p className="mt-2 text-body-small text-danger">역 커뮤니티 인기글을 불러오지 못했습니다.</p>
    );
  } else if (!stationCommunityPosts.length) {
    stationCommunityContent = (
      <p className="mt-2 text-body-small text-gray-70">해당 역 인기글이 아직 없습니다.</p>
    );
  } else {
    stationCommunityContent = (
      <ul className="mt-2 space-y-2">
        {stationCommunityPosts.map(post => (
          <li key={`station-community-${post.id}`}>
            <Link
              href={localizePathname(`/community/${post.id}`, locale)}
              className="block rounded-xl border border-gray-20 bg-gray-05 px-3 py-2"
            >
              <p className="line-clamp-1 text-body-small text-gray-100">{post.title}</p>
              <p className="mt-1 line-clamp-1 text-label-small text-gray-70">
                {toCommunityPreview(post.content)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  let lineCommunityContent: ReactNode;
  if (lineCommunityHotQuery.isLoading) {
    lineCommunityContent = (
      <p className="mt-2 text-body-small text-gray-70">호선 커뮤니티 인기글을 불러오는 중입니다.</p>
    );
  } else if (lineCommunityHotQuery.isError) {
    lineCommunityContent = (
      <p className="mt-2 text-body-small text-danger">
        호선 커뮤니티 인기글을 불러오지 못했습니다.
      </p>
    );
  } else if (!lineCommunityPosts.length) {
    lineCommunityContent = (
      <p className="mt-2 text-body-small text-gray-70">해당 호선 인기글이 아직 없습니다.</p>
    );
  } else {
    lineCommunityContent = (
      <ul className="mt-2 space-y-2">
        {lineCommunityPosts.map(post => (
          <li key={`line-community-${post.id}`}>
            <Link
              href={localizePathname(`/community/${post.id}`, locale)}
              className="block rounded-xl border border-gray-20 bg-gray-05 px-3 py-2"
            >
              <p className="line-clamp-1 text-body-small text-gray-100">{post.title}</p>
              <p className="mt-1 line-clamp-1 text-label-small text-gray-70">
                {toCommunityPreview(post.content)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <main className="min-h-screen bg-gray-10 pb-24 pt-4">
      <section className="px-5">
        <h1 className="text-headline-small text-black">
          <b className="block font-bold">{nickname}님,</b>
          {greetingPhrase}
        </h1>
      </section>

      <section className="mt-4 px-5">
        <article className="rounded-2xl border border-gray-30 bg-white p-4">
          <h2 className="text-title-small text-gray-100">내 역 실시간 도착정보</h2>
          <p className="mt-1 text-body-small text-gray-70">
            선택한 역/호선 기준으로 도착정보와 첫차·막차 요약을 보여줍니다.
          </p>

          <div className="mt-3 grid gap-2">
            <label className="text-label-small text-gray-80">
              호선
              <select
                className="mt-1 h-10 w-full rounded-lg border border-gray-40 bg-white px-2 text-body-small text-gray-100"
                value={selectedLineId}
                onChange={event => setSelectedLineId(Number(event.target.value))}
                disabled={isCatalogLoading || !subwayLines.length}
              >
                {subwayLines.map(line => (
                  <option key={line.id} value={line.id}>
                    {line.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-label-small text-gray-80">
              역
              <select
                className="mt-1 h-10 w-full rounded-lg border border-gray-40 bg-white px-2 text-body-small text-gray-100"
                value={selectedStationId}
                onChange={event => setSelectedStationId(Number(event.target.value))}
                disabled={isCatalogLoading || !stationOptions.length}
              >
                {stationOptions.map(station => (
                  <option key={station.id} value={station.id}>
                    {station.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className={
                upDownType === 'UP'
                  ? 'h-8 rounded-full bg-gray-100 px-3 text-label-small text-white'
                  : 'h-8 rounded-full border border-gray-40 bg-white px-3 text-label-small text-gray-90'
              }
              onClick={() => setUpDownType('UP')}
            >
              상행
            </button>
            <button
              type="button"
              className={
                upDownType === 'DOWN'
                  ? 'h-8 rounded-full bg-gray-100 px-3 text-label-small text-white'
                  : 'h-8 rounded-full border border-gray-40 bg-white px-3 text-label-small text-gray-90'
              }
              onClick={() => setUpDownType('DOWN')}
            >
              하행
            </button>
          </div>

          {catalogError ? <p className="mt-2 text-body-small text-danger">{catalogError}</p> : null}

          <div className="mt-3 rounded-xl border border-gray-20 bg-white p-3">
            <div className="flex items-center justify-between">
              <p className="text-label-medium text-gray-100">오늘 날씨 안내</p>
              {weatherSourceLabel ? (
                <p
                  className={`inline-flex rounded-full border px-2 py-0.5 text-label-small ${resolveWeatherSourceClassName(
                    weatherBrief?.dataSource,
                    weatherBrief?.isStale,
                  )}`}
                >
                  {weatherSourceLabel}
                </p>
              ) : null}
            </div>
            {weatherContent}
          </div>

          <div className="mt-3 rounded-xl border border-gray-20 bg-white p-3">
            <div className="flex items-center justify-between">
              <p className="text-label-medium text-gray-100">출근 코치</p>
              <div className="flex items-center gap-2">
                {commuteCoach?.riskLevel ? (
                  <p
                    className={`inline-flex rounded-full border px-2 py-0.5 text-label-small ${resolveCommuteRiskClassName(
                      commuteCoach.riskLevel,
                    )}`}
                  >
                    {resolveCommuteRiskLabel(commuteCoach.riskLevel)}
                  </p>
                ) : null}
                {isLoggedIn ? (
                  <button
                    type="button"
                    className="text-label-small text-key-color"
                    onClick={() => {
                      homeParityLogger.info('refresh-commute-coach', {});
                      void commuteCoachQuery.refetch();
                    }}
                  >
                    새로고침
                  </button>
                ) : null}
              </div>
            </div>
            {commuteCoachContent}
          </div>

          <div className="mt-3 rounded-xl border border-gray-20 bg-white p-3">
            <p className="text-label-medium text-gray-100">외국인 모드 가이드</p>
            {foreignerGuideContent}
          </div>

          <div className="mt-3 rounded-xl border border-gray-20 bg-gray-05 p-3">
            <p className="text-label-medium text-gray-100">
              {selectedStationName} · {selectedLine?.name ?? '-'}
            </p>
            {summaryStatusLabel ? (
              <p
                className={`mt-2 inline-flex rounded-full border px-2 py-0.5 text-label-small ${resolveSummaryStatusClassName(
                  summaryStatus,
                  isSummaryTemporarilyDelayed,
                )}`}
              >
                {summaryStatusLabel}
              </p>
            ) : null}

            {summaryContent}
          </div>

          <div className="mt-3 rounded-xl border border-gray-20 bg-white p-3">
            <div className="flex items-center justify-between">
              <p className="text-label-medium text-gray-100">열차 도착</p>
              {realtimeSection ? (
                <p className="text-label-small text-gray-70">{realtimeSection.confidenceLabel}</p>
              ) : null}
            </div>

            {realtimeContent}

            {realtimeSection?.staleMessage ? (
              <p className="mt-2 text-body-small text-amber-700">{realtimeSection.staleMessage}</p>
            ) : null}
          </div>
        </article>
      </section>

      <section className="mt-3 px-5">
        <article className="rounded-2xl border border-gray-30 bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-title-small text-gray-100">
              {selectedStationName} 커뮤니티 인기글
            </h2>
            {stationCommunityMoreHref ? (
              <Link href={stationCommunityMoreHref} className="text-label-small text-key-color">
                더보기
              </Link>
            ) : null}
          </div>
          {stationCommunityContent}
        </article>
      </section>

      <section className="mt-3 px-5">
        <article className="rounded-2xl border border-gray-30 bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-title-small text-gray-100">
              {selectedLine?.name ?? '-'} 커뮤니티 인기글
            </h2>
            {lineCommunityMoreHref ? (
              <Link href={lineCommunityMoreHref} className="text-label-small text-key-color">
                더보기
              </Link>
            ) : null}
          </div>
          {lineCommunityContent}
        </article>
      </section>

      <section className="mt-3 px-5">
        <article className="rounded-2xl border border-gray-30 bg-white p-4">
          <h2 className="text-title-small text-gray-100">실시간 지하철 뉴스</h2>
          <ul className="mt-3 space-y-2">
            {MOCK_NEWS.map(news => (
              <li key={news.id}>
                <Link
                  href={localizePathname(`/news/${news.id}`, locale)}
                  className="block rounded-xl border border-gray-20 bg-gray-05 p-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-body-small text-gray-100">{news.title}</p>
                      <div className="mt-2 flex items-center gap-1 text-label-small text-gray-70">
                        <span className="inline-flex h-4 w-4 items-center justify-center [&_svg]:h-4 [&_svg]:w-4">
                          {SUBWAY_LOGO_SVG_LIST[String(news.lineNumber)] ?? null}
                        </span>
                        <span>{news.timeElapsed}</span>
                      </div>
                    </div>
                    {news.thumbnailUrl ? (
                      <img
                        src={news.thumbnailUrl}
                        alt={`${news.title} 썸네일`}
                        className="h-14 w-20 rounded-lg object-cover"
                      />
                    ) : null}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-3 px-5">
        <article className="rounded-2xl border border-gray-30 bg-white p-4">
          <h2 className="text-title-small text-gray-100">인기 해시태그</h2>
          <div className="mt-3 rounded-xl bg-key-color p-3 text-white">
            <p className="text-label-large font-semibold">#1호선 빌런</p>
            <p className="mt-1 text-body-small text-white/90">오늘의 인기 태그 1위!</p>
          </div>
          <ul className="mt-2 space-y-1">
            {MOCK_HASHTAGS.map((tag, index) => (
              <li key={tag.id}>
                <Link
                  href={`${localizePathname('/hashtag', locale)}?hashTag=${encodeURIComponent(tag.title)}`}
                  className="flex items-center justify-between rounded-lg border border-gray-20 bg-gray-05 px-3 py-2"
                >
                  <span className="text-body-small text-gray-100">
                    <b className="mr-2">{index + 1}</b>
                    {tag.title}
                  </span>
                  <span className="text-label-small text-gray-60">-</span>
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-3 px-5 pb-28">
        <article className="rounded-2xl border border-gray-30 bg-white p-4">
          <h2 className="text-title-small text-gray-100">{messages.home.footerTitle}</h2>
          <p className="mt-2 text-body-small text-gray-80">{messages.home.footerDescription}</p>
        </article>
      </section>
    </main>
  );
}
