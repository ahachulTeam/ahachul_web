'use client';

import { useMemo, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import { QUERY_STALE_TIME, myQueryKeys } from '@ahhachul/domain';
import { API_PATHS } from '@ahhachul/http';
import {
  formatDisplayDate,
  maskEmail,
  normalizeInputText,
  validateNickname,
} from '@ahhachul/utils';

import LanguageSelector from '@/app/_components/LanguageSelector';
import { useStationTimeSummaryV2Query, useTrainRealtimeV2Query } from '@/hooks';
import { localizePathname, type LocaleMessages, type SupportedLocale } from '@/i18n';
import { getMyArticleReactionHistories } from '@/lib/article-reactions';
import { AuthService } from '@/lib/auth-service';
import { createDelayProofV2 } from '@/lib/delay-proof';
import { fetchClient } from '@/lib/fetch-client';
import {
  mapRealtimePayloadToSectionVM,
  type ApiResponse,
  type DelayProofPayload,
  type StationSummaryAvailabilityStatus,
  type StationTimeSummarySourceDetail,
  type StationTimeWeekType,
} from '@/types';

import {
  checkNicknameAvailability,
  createMyFavoriteRoute,
  deleteMyFavoriteRoute,
  getMyFavoriteRouteRecommendations,
  getMyFavoriteRoutes,
  getMyFavoriteStations,
  getMyProfile,
  updateMyFavoriteStations,
  updateMyProfile,
} from '../_lib/getMyProfile';

const cardClassName = 'rounded-2xl border border-gray-30 bg-white p-4';
const TERMS_URL = process.env.NEXT_PUBLIC_AHHACHUL_TERMS_URL ?? 'https://ahhachul.com/terms';
const PRIVACY_URL = process.env.NEXT_PUBLIC_AHHACHUL_PRIVACY_URL ?? 'https://ahhachul.com/privacy';
const MAX_FAVORITE_STATIONS = 4;
const DEFAULT_DELAY_PROOF_MINUTES = 10;

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

function toDatetimeLocalValue(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hours = `${date.getHours()}`.padStart(2, '0');
  const minutes = `${date.getMinutes()}`.padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function buildExpectedArrivalDraft(etaSec: number | undefined): string {
  const minutes = Math.max(Math.ceil((etaSec ?? DEFAULT_DELAY_PROOF_MINUTES * 60) / 60), 1);
  const arrivalAt = new Date(Date.now() + minutes * 60 * 1000);
  return toDatetimeLocalValue(arrivalAt);
}

type EditableFavoriteStation = {
  subwayLineId: number;
  stationId: number;
  stationName: string;
  label: string;
};

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

type FavoriteFeedbackType = 'success' | 'error' | 'info';

type FavoriteFeedback = {
  type: FavoriteFeedbackType;
  message: string;
};

function getFavoriteFeedbackClassName(type: FavoriteFeedbackType) {
  if (type === 'error') {
    return 'text-danger';
  }

  if (type === 'success') {
    return 'text-key-color';
  }

  return 'text-gray-80';
}

function resolveSummaryStatusLabel(
  copy: LocaleMessages['me'],
  availabilityStatus?: StationSummaryAvailabilityStatus,
  isTemporarilyDelayed = false,
): string | null {
  if (availabilityStatus === 'AVAILABLE') {
    return copy.realtime.summaryStatusAvailable;
  }
  if (availabilityStatus === 'PARTIAL') {
    return copy.realtime.summaryStatusPartial;
  }
  if (availabilityStatus === 'EMPTY') {
    return isTemporarilyDelayed
      ? copy.realtime.summaryStatusDelayed
      : copy.realtime.summaryStatusEmpty;
  }
  return null;
}

function resolveSummaryStatusStyle(
  availabilityStatus?: StationSummaryAvailabilityStatus,
  isTemporarilyDelayed = false,
) {
  if (availabilityStatus === 'AVAILABLE') {
    return {
      color: '#047857',
      backgroundColor: '#ECFDF3',
      borderColor: '#A7F3D0',
    };
  }
  if (availabilityStatus === 'PARTIAL') {
    return {
      color: '#B45309',
      backgroundColor: '#FFFBEB',
      borderColor: '#FCD34D',
    };
  }
  if (availabilityStatus === 'EMPTY' && isTemporarilyDelayed) {
    return {
      color: '#B45309',
      backgroundColor: '#FFFBEB',
      borderColor: '#FCD34D',
    };
  }
  return {
    color: '#B91C1C',
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
  };
}

function isStationTimeSummaryTemporarilyDelayed(
  sourceDetails?: StationTimeSummarySourceDetail[],
): boolean {
  return Boolean(sourceDetails?.some(detail => detail.dataSource === 'FALLBACK_EMPTY'));
}

type MyDashboardProps = {
  locale: SupportedLocale;
  copy: LocaleMessages['me'];
};

export default function MyDashboard({ locale, copy }: MyDashboardProps) {
  const queryClient = useQueryClient();
  const [isEditingFavorites, setIsEditingFavorites] = useState(false);
  const [favoriteDraft, setFavoriteDraft] = useState<EditableFavoriteStation[]>([]);
  const [favoriteFeedback, setFavoriteFeedback] = useState<FavoriteFeedback | null>(null);
  const [isDelayProofFormOpen, setIsDelayProofFormOpen] = useState(false);
  const [expectedArrivalAtDraft, setExpectedArrivalAtDraft] = useState('');
  const [customDelayMessage, setCustomDelayMessage] = useState('');
  const [delayProofResult, setDelayProofResult] = useState<DelayProofPayload | null>(null);
  const [routeSourceStationId, setRouteSourceStationId] = useState<number | null>(null);
  const [routeDestinationStationId, setRouteDestinationStationId] = useState<number | null>(null);
  const [routeTitleDraft, setRouteTitleDraft] = useState('');

  const {
    data: profile,
    isPending: isProfilePending,
    isError: isProfileError,
  } = useQuery({
    queryKey: myQueryKeys.profile(),
    queryFn: getMyProfile,
    staleTime: QUERY_STALE_TIME.user,
  });

  const { data: stations } = useQuery({
    queryKey: myQueryKeys.favoriteStations(),
    queryFn: getMyFavoriteStations,
    staleTime: QUERY_STALE_TIME.user,
  });

  const subwayLineCatalogQuery = useQuery({
    queryKey: ['subway-lines-for-me-favorite-editor'],
    queryFn: () => fetchClient<ApiResponse<SubwayLineCatalogResponse>>(API_PATHS.subway.lines),
    staleTime: QUERY_STALE_TIME.static,
    select: response => response.result.subwayLines ?? [],
  });

  const {
    data: routeRecommendationResponse,
    isPending: isRouteRecommendationPending,
    isError: isRouteRecommendationError,
    refetch: refetchRouteRecommendations,
  } = useQuery({
    queryKey: [...myQueryKeys.all, 'favorite-route-recommendations'],
    queryFn: () => getMyFavoriteRouteRecommendations(3),
    staleTime: QUERY_STALE_TIME.user,
    enabled: Boolean(profile?.result) && !isProfilePending && !isProfileError,
  });

  const {
    data: favoriteRouteResponse,
    isPending: isFavoriteRoutePending,
    isError: isFavoriteRouteError,
    refetch: refetchFavoriteRoutes,
  } = useQuery({
    queryKey: [...myQueryKeys.all, 'favorite-routes'],
    queryFn: getMyFavoriteRoutes,
    staleTime: QUERY_STALE_TIME.user,
    enabled: Boolean(profile?.result) && !isProfilePending && !isProfileError,
  });

  const profileReady = Boolean(profile?.result) && !isProfilePending && !isProfileError;
  const favoriteStations = stations?.result.stationInfoList ?? [];
  const subwayLines = subwayLineCatalogQuery.data ?? [];
  const recommendedRoutes = routeRecommendationResponse?.result.routes ?? [];
  const favoriteRoutes = favoriteRouteResponse?.result.routes ?? [];
  const stationNames = favoriteStations.map(station => station.stationName);
  const primaryStation = favoriteStations[0];
  const primarySubwayLineId =
    primaryStation?.lineId ?? primaryStation?.subwayLineInfoList?.[0]?.subwayLineId ?? 0;
  const stationTimeWeekType = resolveStationTimeWeekType();

  const nicknameMutation = useMutation({
    mutationFn: async (nickname: string) => {
      const check = await checkNicknameAvailability(nickname);
      if (!check.result.available) {
        throw new Error('중복인 닉네임이라 사용할 수 없습니다.');
      }
      return updateMyProfile({ nickname });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: myQueryKeys.profile() });
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: updateMyFavoriteStations,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: myQueryKeys.favoriteStations() });
      setIsEditingFavorites(false);
    },
  });

  const favoriteRouteCreateMutation = useMutation({
    mutationFn: createMyFavoriteRoute,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [...myQueryKeys.all, 'favorite-routes'] });
      await queryClient.invalidateQueries({
        queryKey: [...myQueryKeys.all, 'favorite-route-recommendations'],
      });
      setRouteTitleDraft('');
      setRouteSourceStationId(null);
      setRouteDestinationStationId(null);
    },
  });

  const favoriteRouteDeleteMutation = useMutation({
    mutationFn: deleteMyFavoriteRoute,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [...myQueryKeys.all, 'favorite-routes'] });
      await queryClient.invalidateQueries({
        queryKey: [...myQueryKeys.all, 'favorite-route-recommendations'],
      });
    },
  });

  const {
    data: realtimeResponse,
    isPending: isRealtimePending,
    isFetching: isRealtimeFetching,
    isError: isRealtimeError,
    refetch: refetchRealtime,
  } = useTrainRealtimeV2Query(
    {
      stationId: primaryStation?.stationId ?? 0,
      subwayLineId: primarySubwayLineId,
      limit: 2,
    },
    {
      enabled: profileReady && Boolean(primaryStation),
    },
  );

  const {
    data: summaryResponse,
    isPending: isSummaryPending,
    isError: isSummaryError,
    refetch: refetchSummary,
  } = useStationTimeSummaryV2Query(
    {
      stationId: primaryStation?.stationId ?? 0,
      subwayLineId: primarySubwayLineId,
      stationTimeWeekType,
    },
    {
      enabled: profileReady && Boolean(primaryStation),
    },
  );

  const realtimeSection = realtimeResponse?.result
    ? mapRealtimePayloadToSectionVM(realtimeResponse.result)
    : null;

  const summaryByType = summaryResponse?.result.summaries.reduce<
    Partial<Record<'UP' | 'DOWN', { first: string | null; last: string | null }>>
  >((accumulator, summary) => {
    accumulator[summary.upDownType] = {
      first: summary.firstDepartureTime,
      last: summary.lastDepartureTime,
    };
    return accumulator;
  }, {});
  const isSummaryNoData = Boolean(
    summaryResponse?.result.summaries.every(
      summary => !summary.firstDepartureTime && !summary.lastDepartureTime,
    ),
  );
  const summaryMeta = summaryResponse?.result.meta;
  const isSummaryTemporarilyDelayed = isStationTimeSummaryTemporarilyDelayed(
    summaryMeta?.sourceDetails,
  );
  const summaryStatusLabel = resolveSummaryStatusLabel(
    copy,
    summaryMeta?.availabilityStatus,
    isSummaryTemporarilyDelayed,
  );
  const summaryNoDataMessage = summaryMeta?.guidanceMessage ?? copy.realtime.summaryNoData;

  const handleRealtimeRefresh = () => {
    void refetchRealtime();
    void refetchSummary();
  };

  const {
    data: articleHistoryResponse,
    isPending: isArticleHistoryPending,
    isError: isArticleHistoryError,
    refetch: refetchArticleHistory,
  } = useQuery({
    queryKey: [...myQueryKeys.all, 'article-histories'],
    queryFn: () => getMyArticleReactionHistories(30),
    staleTime: QUERY_STALE_TIME.user,
    enabled: profileReady,
  });

  const delayProofMutation = useMutation({
    mutationFn: createDelayProofV2,
    onSuccess: response => {
      setDelayProofResult(response.result);
    },
  });

  const setFavoriteFeedbackMessage = (type: FavoriteFeedbackType, message: string) => {
    setFavoriteFeedback({ type, message });
  };

  const getStationsByLineId = (lineId: number) => {
    return subwayLines.find(line => line.id === lineId)?.stations ?? [];
  };

  const openFavoriteEditor = () => {
    if (!subwayLines.length) {
      setFavoriteFeedbackMessage(
        'error',
        '노선 정보를 아직 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
      );
      return;
    }

    if (!favoriteStations.length) {
      const fallbackLine = subwayLines[0];
      const fallbackStation = fallbackLine?.stations[0];
      setFavoriteDraft(
        fallbackLine && fallbackStation
          ? [
              {
                subwayLineId: fallbackLine.id,
                stationId: fallbackStation.id,
                stationName: fallbackStation.name,
                label: '',
              },
            ]
          : [],
      );
      setIsEditingFavorites(true);
      setFavoriteFeedback(null);
      return;
    }

    setFavoriteDraft(
      favoriteStations.map(station => {
        const inferredLineId =
          station.subwayLineInfoList?.[0]?.subwayLineId ??
          subwayLines.find(line =>
            line.stations.some(lineStation => lineStation.id === station.stationId),
          )?.id ??
          subwayLines[0]?.id ??
          0;
        const stationsByLine = getStationsByLineId(inferredLineId);
        const matchedStation =
          stationsByLine.find(lineStation => lineStation.id === station.stationId) ??
          stationsByLine[0];

        return {
          subwayLineId: inferredLineId,
          stationId: matchedStation?.id ?? station.stationId ?? 0,
          stationName: matchedStation?.name ?? station.stationName,
          label: station.label ?? '',
        };
      }),
    );
    setIsEditingFavorites(true);
    setFavoriteFeedback(null);
  };

  const handleFavoriteLineChange = (index: number, lineId: number) => {
    const lineStations = getStationsByLineId(lineId);
    const nextStation = lineStations[0];

    setFavoriteDraft(previous =>
      previous.map((station, stationIndex) => {
        if (stationIndex !== index) {
          return station;
        }
        return {
          ...station,
          subwayLineId: lineId,
          stationId: nextStation?.id ?? 0,
          stationName: nextStation?.name ?? '',
        };
      }),
    );
  };

  const handleFavoriteStationChange = (index: number, stationId: number) => {
    setFavoriteDraft(previous =>
      previous.map((station, stationIndex) => {
        if (stationIndex !== index) {
          return station;
        }

        const lineStations = getStationsByLineId(station.subwayLineId);
        const nextStation = lineStations.find(lineStation => lineStation.id === stationId);

        return {
          ...station,
          stationId,
          stationName: nextStation?.name ?? '',
        };
      }),
    );
  };

  const handleFavoriteLabelChange = (index: number, value: string) => {
    setFavoriteDraft(previous =>
      previous.map((station, stationIndex) => {
        if (stationIndex !== index) {
          return station;
        }
        return {
          ...station,
          label: value,
        };
      }),
    );
  };

  const addFavoriteDraft = () => {
    if (favoriteDraft.length >= MAX_FAVORITE_STATIONS) {
      setFavoriteFeedbackMessage(
        'info',
        `즐겨찾는 역은 최대 ${MAX_FAVORITE_STATIONS}개까지 등록할 수 있습니다.`,
      );
      return;
    }

    const fallbackLine = subwayLines[0];
    const fallbackStation = fallbackLine?.stations[0];
    if (!fallbackLine || !fallbackStation) {
      setFavoriteFeedbackMessage('error', '노선 정보를 불러오지 못해 역을 추가할 수 없습니다.');
      return;
    }

    setFavoriteDraft(previous => [
      ...previous,
      {
        subwayLineId: fallbackLine.id,
        stationId: fallbackStation.id,
        stationName: fallbackStation.name,
        label: '',
      },
    ]);
  };

  const removeFavoriteDraft = (index: number) => {
    setFavoriteDraft(previous => previous.filter((_, stationIndex) => stationIndex !== index));
  };

  const normalizedFavoritePayload = useMemo(() => {
    return favoriteDraft
      .map(station => ({
        stationId: station.stationId,
        stationName: normalizeInputText(station.stationName),
        label: normalizeInputText(station.label),
      }))
      .filter(station => station.stationId > 0 && station.stationName.length > 0);
  }, [favoriteDraft]);

  const favoriteRouteStationOptions = useMemo(() => {
    return favoriteStations.map(station => ({
      stationId: station.stationId,
      stationName: station.stationName,
    }));
  }, [favoriteStations]);

  const saveFavoriteStations = async () => {
    if (!normalizedFavoritePayload.length) {
      setFavoriteFeedbackMessage('info', '즐겨찾는 역을 1개 이상 입력해주세요.');
      return;
    }

    const uniqueStationIds = new Set(normalizedFavoritePayload.map(station => station.stationId));
    if (uniqueStationIds.size !== normalizedFavoritePayload.length) {
      setFavoriteFeedbackMessage('info', '중복된 역은 등록할 수 없습니다.');
      return;
    }

    try {
      await favoriteMutation.mutateAsync(
        normalizedFavoritePayload.map(station => ({
          stationName: station.stationName,
          ...(station.label ? { label: station.label } : {}),
        })),
      );
      setFavoriteFeedbackMessage('success', '즐겨찾는 역이 저장되었습니다.');
    } catch (error) {
      setFavoriteFeedbackMessage(
        'error',
        error instanceof Error
          ? error.message
          : '즐겨찾는 역 저장에 실패했습니다. 잠시 후 다시 시도해주세요.',
      );
    }
  };

  const refreshFavoriteRoutes = () => {
    void refetchFavoriteRoutes();
    void refetchRouteRecommendations();
  };

  const createFavoriteRoute = async () => {
    if (favoriteRouteStationOptions.length < 2) {
      setFavoriteFeedbackMessage(
        'info',
        '즐겨찾는 역을 2개 이상 등록하면 경로를 설정할 수 있습니다.',
      );
      return;
    }

    const defaultSource = favoriteRouteStationOptions[0]?.stationId ?? null;
    const defaultDestination = favoriteRouteStationOptions.find(
      station => station.stationId !== defaultSource,
    )?.stationId;

    const sourceStationId = routeSourceStationId ?? defaultSource;
    const destinationStationId = routeDestinationStationId ?? defaultDestination ?? null;

    if (!sourceStationId || !destinationStationId || sourceStationId === destinationStationId) {
      setFavoriteFeedbackMessage('info', '출발역과 도착역을 서로 다르게 선택해주세요.');
      return;
    }

    try {
      await favoriteRouteCreateMutation.mutateAsync({
        sourceStationId,
        destinationStationId,
        title: normalizeInputText(routeTitleDraft) || undefined,
      });
      setFavoriteFeedbackMessage('success', '즐겨찾기 경로가 저장되었습니다.');
    } catch (error) {
      setFavoriteFeedbackMessage(
        'error',
        error instanceof Error
          ? error.message
          : '즐겨찾기 경로 저장에 실패했습니다. 잠시 후 다시 시도해주세요.',
      );
    }
  };

  const deleteFavoriteRoute = async (routeId: number | null) => {
    if (!routeId) {
      return;
    }

    try {
      await favoriteRouteDeleteMutation.mutateAsync(routeId);
      setFavoriteFeedbackMessage('success', '즐겨찾기 경로를 삭제했습니다.');
    } catch (error) {
      setFavoriteFeedbackMessage(
        'error',
        error instanceof Error
          ? error.message
          : '즐겨찾기 경로 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.',
      );
    }
  };

  const editNickname = async (currentNickname: string) => {
    const input = window.prompt('변경할 닉네임을 입력해주세요.', currentNickname);
    if (input === null) {
      return;
    }

    const validation = validateNickname(input);
    if (!validation.isValid) {
      window.alert(validation.message);
      return;
    }

    const nextNickname = validation.normalized;
    if (normalizeInputText(currentNickname) === nextNickname) {
      window.alert('기존 닉네임과 동일합니다.');
      return;
    }

    try {
      await nicknameMutation.mutateAsync(nextNickname);
      window.alert('닉네임이 변경되었습니다.');
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : '닉네임 변경에 실패했습니다. 다시 시도해주세요.',
      );
    }
  };

  const openDelayProofForm = () => {
    setExpectedArrivalAtDraft(buildExpectedArrivalDraft(realtimeSection?.cards[0]?.etaSec));
    setCustomDelayMessage('');
    setDelayProofResult(null);
    setIsDelayProofFormOpen(true);
  };

  const handleCreateDelayProof = async () => {
    if (!primaryStation || !primarySubwayLineId) {
      window.alert(copy.delayProof.stationRequired);
      return;
    }

    try {
      const normalizedExpectedArrivalAt = expectedArrivalAtDraft
        ? new Date(expectedArrivalAtDraft).toISOString()
        : undefined;

      await delayProofMutation.mutateAsync({
        stationId: primaryStation.stationId,
        subwayLineId: primarySubwayLineId,
        upDownType: realtimeSection?.cards[0]?.upDownType,
        expectedArrivalAt: normalizedExpectedArrivalAt,
        customMessage: customDelayMessage.trim() || undefined,
      });
    } catch (error) {
      window.alert(error instanceof Error ? error.message : copy.delayProof.createError);
    }
  };

  const copyToClipboard = async (value: string, successMessage: string) => {
    try {
      if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
        throw new Error('clipboard-not-supported');
      }
      await navigator.clipboard.writeText(value);
      window.alert(successMessage);
    } catch {
      window.alert(copy.delayProof.copyUnsupported);
    }
  };

  const handleShareDelayProof = async () => {
    if (!delayProofResult) {
      return;
    }

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: copy.delayProof.shareTitle,
          text: delayProofResult.text,
          url: delayProofResult.shareUrl,
        });
        return;
      } catch {
        // 사용자 취소 포함 모든 케이스에서 copy fallback으로 안전 처리한다.
      }
    }

    await copyToClipboard(
      `${delayProofResult.text}\n${delayProofResult.shareUrl}`,
      copy.delayProof.copyTextSuccess,
    );
  };

  const likedArticles = articleHistoryResponse?.result.likedArticles ?? [];
  const bookmarkedArticles = articleHistoryResponse?.result.bookmarkedArticles ?? [];

  const resolveArticlePath = (
    articleType: 'COMMUNITY' | 'COMPLAINT' | 'LOST',
    articleId: number,
  ) => {
    if (articleType === 'COMMUNITY') {
      return localizePathname(`/community/${articleId}`, locale);
    }

    if (articleType === 'COMPLAINT') {
      return localizePathname(`/complaint/${articleId}`, locale);
    }

    return localizePathname(`/lost-found/${articleId}`, locale);
  };

  if (isProfilePending) {
    return (
      <section className="space-y-3 px-5 pb-24 pt-4">
        <div className={`${cardClassName} h-[122px] animate-pulse bg-gray-20`} />
        <div className={`${cardClassName} h-[172px] animate-pulse bg-gray-20`} />
      </section>
    );
  }

  if (isProfileError || !profile?.result) {
    return (
      <section className="px-5 pb-24 pt-4">
        <article className={cardClassName}>
          <h2 className="text-title-small text-gray-90">{copy.authRequiredTitle}</h2>
          <p className="mt-2 text-body-medium text-gray-70">{copy.authRequiredDescription}</p>
          <Link
            href={localizePathname('/login', locale)}
            className="mt-4 inline-flex h-10 items-center rounded-xl bg-key-color px-4 text-label-medium text-white"
          >
            {copy.goToLogin}
          </Link>
        </article>
      </section>
    );
  }

  const member = profile.result;
  const encodedNickname = member.nickname ? encodeURIComponent(member.nickname) : null;
  const handleLogout = () => AuthService.expireSession();

  let realtimeContent = <p className="text-body-small text-gray-70">{copy.realtime.empty}</p>;
  if (isRealtimePending) {
    realtimeContent = <p className="text-body-small text-gray-70">{copy.realtime.loading}</p>;
  } else if (isRealtimeError) {
    realtimeContent = <p className="text-body-small text-danger">{copy.realtime.error}</p>;
  } else if (realtimeSection?.empty) {
    realtimeContent = <p className="text-body-small text-gray-70">{copy.realtime.empty}</p>;
  } else if (realtimeSection) {
    realtimeContent = (
      <ul className="space-y-1">
        {realtimeSection.cards.slice(0, 2).map(card => (
          <li key={card.id} className="text-body-small text-gray-90">
            {card.upDownType} · {card.etaMinDisplay}
            {copy.realtime.minuteSuffix} · {card.destinationText}
          </li>
        ))}
      </ul>
    );
  }

  let summaryContent = (
    <div className="mt-1 space-y-1 text-body-small text-gray-90">
      <p>
        {copy.realtime.upLabel} {formatStationTime(summaryByType?.UP?.first)} /{' '}
        {formatStationTime(summaryByType?.UP?.last)}
      </p>
      <p>
        {copy.realtime.downLabel} {formatStationTime(summaryByType?.DOWN?.first)} /{' '}
        {formatStationTime(summaryByType?.DOWN?.last)}
      </p>
    </div>
  );

  if (isSummaryPending) {
    summaryContent = (
      <p className="mt-1 text-body-small text-gray-70">{copy.realtime.summaryLoading}</p>
    );
  } else if (isSummaryError) {
    summaryContent = (
      <p className="mt-1 text-body-small text-danger">{copy.realtime.summaryError}</p>
    );
  } else if (isSummaryNoData) {
    summaryContent = <p className="mt-1 text-body-small text-gray-70">{summaryNoDataMessage}</p>;
  }

  let recommendedRoutesContent: React.ReactNode = null;
  if (isRouteRecommendationPending) {
    recommendedRoutesContent = (
      <p className="mt-2 text-body-small text-gray-70">추천 경로를 불러오는 중입니다.</p>
    );
  } else if (isRouteRecommendationError) {
    recommendedRoutesContent = (
      <p className="mt-2 text-body-small text-danger">추천 경로를 불러오지 못했습니다.</p>
    );
  } else if (!recommendedRoutes.length) {
    recommendedRoutesContent = (
      <p className="mt-2 text-body-small text-gray-70">
        추천 경로가 없습니다. 즐겨찾는 역을 2개 이상 등록해보세요.
      </p>
    );
  } else {
    recommendedRoutesContent = (
      <div className="mt-2 space-y-2">
        {recommendedRoutes.map(route => (
          <div
            key={`recommended-route-${route.sourceStationId}-${route.destinationStationId}`}
            className="rounded-lg border border-gray-20 bg-gray-10 p-2"
          >
            <p className="text-label-small text-gray-80">
              {route.sourceStationName} → {route.destinationStationName}
            </p>
            <p className="mt-1 text-label-small text-gray-70">
              정거장 {route.summary.totalStops} · 환승 {route.summary.transferCount} · 예상{' '}
              {route.summary.estimatedMinutes}분
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-1">
              {route.nodes.map((node, index) => (
                <div
                  key={`recommended-route-node-${route.sourceStationId}-${route.destinationStationId}-${node.stationId}-${index}`}
                  className="inline-flex items-center gap-1"
                >
                  <span className="rounded-full border border-gray-30 bg-white px-2 py-0.5 text-label-small text-gray-90">
                    {node.stationName}
                  </span>
                  {route.edges[index] ? (
                    <span className="rounded-full border border-gray-30 bg-white px-2 py-0.5 text-[11px] text-gray-70">
                      {route.edges[index].subwayLineName} →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  let favoriteRoutesContent: React.ReactNode = null;
  if (isFavoriteRoutePending) {
    favoriteRoutesContent = (
      <p className="mt-2 text-body-small text-gray-70">저장한 경로를 불러오는 중입니다.</p>
    );
  } else if (isFavoriteRouteError) {
    favoriteRoutesContent = (
      <p className="mt-2 text-body-small text-danger">저장한 경로를 불러오지 못했습니다.</p>
    );
  } else if (!favoriteRoutes.length) {
    favoriteRoutesContent = (
      <p className="mt-2 text-body-small text-gray-70">
        아직 저장한 경로가 없습니다. 위에서 자주 가는 경로를 등록해보세요.
      </p>
    );
  } else {
    favoriteRoutesContent = (
      <div className="mt-2 space-y-2">
        {favoriteRoutes.map(route => (
          <div
            key={`favorite-route-${route.routeId}`}
            className="rounded-lg border border-gray-20 bg-gray-10 p-2"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-label-small text-gray-80">
                {route.title || `${route.sourceStationName} → ${route.destinationStationName}`}
              </p>
              <button
                type="button"
                onClick={() => void deleteFavoriteRoute(route.routeId)}
                disabled={favoriteRouteDeleteMutation.isPending}
                className="rounded-md border border-gray-40 px-2 py-1 text-label-small text-gray-90 disabled:cursor-not-allowed disabled:text-gray-60"
              >
                삭제
              </button>
            </div>
            <p className="mt-1 text-label-small text-gray-70">
              정거장 {route.summary.totalStops} · 환승 {route.summary.transferCount} · 예상{' '}
              {route.summary.estimatedMinutes}분
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-1">
              {route.nodes.map((node, index) => (
                <div
                  key={`favorite-route-node-${route.routeId}-${node.stationId}-${index}`}
                  className="inline-flex items-center gap-1"
                >
                  <span className="rounded-full border border-gray-30 bg-white px-2 py-0.5 text-label-small text-gray-90">
                    {node.stationName}
                  </span>
                  {route.edges[index] ? (
                    <span className="rounded-full border border-gray-30 bg-white px-2 py-0.5 text-[11px] text-gray-70">
                      {route.edges[index].subwayLineName} →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="space-y-3 px-5 pb-24 pt-4">
      <article className={`${cardClassName} bg-gradient-to-r from-green-50 to-white`}>
        <p className="text-label-small text-gray-80">{copy.profileLabel}</p>
        <h2 className="mt-1 text-headline-small text-gray-100">{member.nickname}</h2>
        <p className="mt-1 text-body-medium text-gray-80">
          {maskEmail(member.maskedEmail ?? member.email) || copy.noEmail}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {encodedNickname ? (
            <>
              <Link
                href={localizePathname(`/user/${encodedNickname}`, locale)}
                className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
              >
                {copy.viewProfile}
              </Link>
              <Link
                href={localizePathname(`/user/${encodedNickname}/settings`, locale)}
                className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
              >
                프로필 설정
              </Link>
              <Link
                href={localizePathname(`/user/${encodedNickname}/preview`, locale)}
                className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
              >
                프로필 미리보기
              </Link>
            </>
          ) : null}
          <button
            type="button"
            onClick={() => void editNickname(member.nickname)}
            className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
            disabled={nicknameMutation.isPending}
          >
            {nicknameMutation.isPending ? '변경 중...' : '닉네임 변경'}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
          >
            {copy.logout}
          </button>
        </div>
      </article>

      <article className={cardClassName}>
        <h3 className="text-title-small text-gray-100">{copy.quickLinksHeading}</h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            href={localizePathname('/messages', locale)}
            className="rounded-xl bg-gray-20 p-3 text-label-medium text-gray-90"
          >
            {copy.quickLinks.messages}
          </Link>
          <Link
            href={localizePathname('/notifications', locale)}
            className="rounded-xl bg-gray-20 p-3 text-label-medium text-gray-90"
          >
            {copy.quickLinks.notifications}
          </Link>
          <Link
            href={localizePathname('/community', locale)}
            className="rounded-xl bg-gray-20 p-3 text-label-medium text-gray-90"
          >
            {copy.quickLinks.community}
          </Link>
          <Link
            href={localizePathname('/complaint', locale)}
            className="rounded-xl bg-gray-20 p-3 text-label-medium text-gray-90"
          >
            {copy.quickLinks.complaint}
          </Link>
        </div>
      </article>

      <article className={cardClassName}>
        <div className="flex items-center justify-between">
          <h3 className="text-title-small text-gray-100">{copy.subwaySettingsHeading}</h3>
          <button
            type="button"
            onClick={openFavoriteEditor}
            className="rounded-md border border-gray-40 px-2 py-1 text-label-small text-gray-90"
          >
            즐겨찾는 역 수정
          </button>
        </div>
        {favoriteFeedback ? (
          <p
            className={`mt-2 text-body-small ${getFavoriteFeedbackClassName(favoriteFeedback.type)}`}
          >
            {favoriteFeedback.message}
          </p>
        ) : null}
        {stationNames.length ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {favoriteStations.map(station => (
              <li
                key={`${station.stationId}-${station.stationName}`}
                className="rounded-full border border-gray-30 bg-gray-10 px-3 py-1 text-body-small text-gray-90"
              >
                {station.stationName}
                {station.label ? ` (${station.label})` : ''}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-body-medium text-gray-70">{copy.noFavoriteStations}</p>
        )}

        {isEditingFavorites && (
          <div className="mt-4 rounded-xl border border-gray-30 bg-gray-10 p-3">
            <p className="text-label-small text-gray-80">
              즐겨찾는 역은 최대 4개까지 등록할 수 있습니다.
            </p>
            <div className="mt-3 space-y-2">
              {favoriteDraft.map((station, index) => (
                <div key={`favorite-draft-${index}`} className="grid grid-cols-12 gap-2">
                  <select
                    value={String(station.subwayLineId)}
                    onChange={event => {
                      const nextLineId = Number(event.target.value);
                      handleFavoriteLineChange(index, Number.isNaN(nextLineId) ? 0 : nextLineId);
                    }}
                    className="col-span-4 h-9 rounded-lg border border-gray-30 px-2 text-body-small text-gray-90"
                  >
                    {subwayLines.length ? (
                      subwayLines.map(line => (
                        <option key={`favorite-line-${line.id}`} value={line.id}>
                          노선: {line.name}
                        </option>
                      ))
                    ) : (
                      <option value={0}>노선 없음</option>
                    )}
                  </select>
                  <select
                    value={String(station.stationId)}
                    onChange={event => {
                      const nextStationId = Number(event.target.value);
                      handleFavoriteStationChange(
                        index,
                        Number.isNaN(nextStationId) ? 0 : nextStationId,
                      );
                    }}
                    className="col-span-4 h-9 rounded-lg border border-gray-30 px-2 text-body-small text-gray-90"
                  >
                    {getStationsByLineId(station.subwayLineId).length ? (
                      getStationsByLineId(station.subwayLineId).map(lineStation => (
                        <option
                          key={`favorite-station-${station.subwayLineId}-${lineStation.id}`}
                          value={lineStation.id}
                        >
                          역: {lineStation.name}
                        </option>
                      ))
                    ) : (
                      <option value={0}>역 없음</option>
                    )}
                  </select>
                  <input
                    value={station.label}
                    onChange={event => handleFavoriteLabelChange(index, event.target.value)}
                    placeholder="별칭(선택)"
                    className="col-span-3 h-9 rounded-lg border border-gray-30 px-2 text-body-small text-gray-90"
                  />
                  <button
                    type="button"
                    onClick={() => removeFavoriteDraft(index)}
                    className="col-span-1 h-9 rounded-lg border border-gray-30 text-label-small text-gray-90"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={addFavoriteDraft}
                className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
              >
                역 추가
              </button>
              <button
                type="button"
                onClick={() => void saveFavoriteStations()}
                disabled={favoriteMutation.isPending}
                className="inline-flex h-9 items-center rounded-lg bg-key-color px-3 text-label-medium text-white disabled:cursor-not-allowed disabled:bg-gray-70"
              >
                {favoriteMutation.isPending ? '저장 중...' : '저장'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditingFavorites(false)}
                className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
              >
                취소
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 rounded-xl border border-gray-30 bg-gray-10 p-3">
          <div className="flex items-center justify-between">
            <h4 className="text-label-medium text-gray-100">즐겨찾기 경로</h4>
            <button
              type="button"
              onClick={refreshFavoriteRoutes}
              className="rounded-md border border-gray-40 px-2 py-1 text-label-small text-gray-90"
            >
              새로고침
            </button>
          </div>
          <p className="mt-1 text-body-small text-gray-70">
            즐겨찾기 역 기반 추천 경로를 확인하고, 자주 타는 이동 경로를 직접 저장할 수 있습니다.
          </p>

          <div className="mt-3 rounded-xl border border-gray-30 bg-white p-3">
            <p className="text-label-small text-gray-80">내 경로 추가</p>
            <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-4">
              <select
                value={String(
                  routeSourceStationId ?? favoriteRouteStationOptions[0]?.stationId ?? 0,
                )}
                onChange={event => {
                  const nextValue = Number(event.target.value);
                  setRouteSourceStationId(Number.isNaN(nextValue) ? null : nextValue);
                }}
                className="h-9 rounded-lg border border-gray-30 px-2 text-body-small text-gray-90"
              >
                {favoriteRouteStationOptions.length ? (
                  favoriteRouteStationOptions.map(station => (
                    <option key={`source-${station.stationId}`} value={station.stationId}>
                      출발: {station.stationName}
                    </option>
                  ))
                ) : (
                  <option value={0}>출발역 없음</option>
                )}
              </select>
              <select
                value={String(
                  routeDestinationStationId ??
                    favoriteRouteStationOptions.find(
                      station =>
                        station.stationId !==
                        (routeSourceStationId ?? favoriteRouteStationOptions[0]?.stationId ?? 0),
                    )?.stationId ??
                    0,
                )}
                onChange={event => {
                  const nextValue = Number(event.target.value);
                  setRouteDestinationStationId(Number.isNaN(nextValue) ? null : nextValue);
                }}
                className="h-9 rounded-lg border border-gray-30 px-2 text-body-small text-gray-90"
              >
                {favoriteRouteStationOptions.length ? (
                  favoriteRouteStationOptions.map(station => (
                    <option key={`destination-${station.stationId}`} value={station.stationId}>
                      도착: {station.stationName}
                    </option>
                  ))
                ) : (
                  <option value={0}>도착역 없음</option>
                )}
              </select>
              <input
                value={routeTitleDraft}
                onChange={event => setRouteTitleDraft(event.target.value)}
                placeholder="경로 별칭(선택)"
                maxLength={50}
                className="h-9 rounded-lg border border-gray-30 px-2 text-body-small text-gray-90"
              />
              <button
                type="button"
                onClick={() => void createFavoriteRoute()}
                disabled={favoriteRouteCreateMutation.isPending}
                className="inline-flex h-9 items-center justify-center rounded-lg bg-key-color px-3 text-label-medium text-white disabled:cursor-not-allowed disabled:bg-gray-70"
              >
                {favoriteRouteCreateMutation.isPending ? '저장 중...' : '경로 저장'}
              </button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-gray-30 bg-white p-3">
              <p className="text-label-medium text-gray-100">추천 경로</p>
              {recommendedRoutesContent}
            </div>

            <div className="rounded-xl border border-gray-30 bg-white p-3">
              <p className="text-label-medium text-gray-100">내가 저장한 경로</p>
              {favoriteRoutesContent}
            </div>
          </div>
        </div>

        {primaryStation && (
          <div className="mt-4 rounded-xl border border-gray-30 bg-gray-10 p-3">
            <div className="flex items-center justify-between">
              <h4 className="text-label-medium text-gray-100">
                {copy.realtime.title.replace('{station}', primaryStation.stationName)}
              </h4>
              <button
                type="button"
                onClick={handleRealtimeRefresh}
                className="rounded-md border border-gray-40 px-2 py-1 text-label-small text-gray-90"
                disabled={isRealtimeFetching}
              >
                {copy.realtime.refresh}
              </button>
            </div>
            <p className="mt-1 text-body-small text-gray-70">
              {realtimeSection?.updatedAtLabel ?? copy.realtime.updatedAtFallback}
            </p>

            <div className="mt-3 space-y-1">{realtimeContent}</div>

            <div className="mt-3 border-t border-gray-30 pt-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-label-small text-gray-80">{copy.realtime.firstLastTitle}</p>
                {summaryStatusLabel && !isSummaryPending && (
                  <span
                    className="inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold"
                    style={resolveSummaryStatusStyle(
                      summaryMeta?.availabilityStatus,
                      isSummaryTemporarilyDelayed,
                    )}
                  >
                    {summaryStatusLabel}
                  </span>
                )}
              </div>
              {summaryContent}
            </div>

            <div className="mt-3 border-t border-gray-30 pt-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-label-medium text-gray-100">{copy.delayProof.title}</p>
                <button
                  type="button"
                  onClick={openDelayProofForm}
                  className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
                >
                  {copy.delayProof.openButton}
                </button>
              </div>
              <p className="mt-1 text-body-small text-gray-70">{copy.delayProof.description}</p>

              {isDelayProofFormOpen && (
                <div className="mt-3 space-y-2 rounded-xl border border-gray-30 bg-white p-3">
                  <div className="space-y-1">
                    <label className="block text-label-small text-gray-80">
                      {copy.delayProof.expectedArrivalAtLabel}
                    </label>
                    <input
                      type="datetime-local"
                      value={expectedArrivalAtDraft}
                      onChange={event => setExpectedArrivalAtDraft(event.target.value)}
                      className="h-9 w-full rounded-lg border border-gray-30 px-2 text-body-small text-gray-90"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-label-small text-gray-80">
                      {copy.delayProof.customMessageLabel}
                    </label>
                    <input
                      type="text"
                      value={customDelayMessage}
                      maxLength={120}
                      onChange={event => setCustomDelayMessage(event.target.value)}
                      placeholder={copy.delayProof.customMessagePlaceholder}
                      className="h-9 w-full rounded-lg border border-gray-30 px-2 text-body-small text-gray-90"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void handleCreateDelayProof()}
                      disabled={delayProofMutation.isPending}
                      className="inline-flex h-9 items-center rounded-lg bg-key-color px-3 text-label-medium text-white disabled:cursor-not-allowed disabled:bg-gray-70"
                    >
                      {delayProofMutation.isPending
                        ? copy.delayProof.pending
                        : copy.delayProof.createButton}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsDelayProofFormOpen(false);
                        setDelayProofResult(null);
                      }}
                      className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
                    >
                      {copy.delayProof.closeButton}
                    </button>
                  </div>
                  <p className="text-label-small text-danger">{copy.delayProof.legalNotice}</p>
                </div>
              )}

              {delayProofResult && (
                <div className="mt-3 space-y-2 rounded-xl border border-gray-30 bg-white p-3">
                  <div className="flex flex-wrap items-center gap-2 text-label-small text-gray-80">
                    <span className="rounded-full border border-gray-30 px-2 py-0.5">
                      {copy.delayProof.gradeLabel}: {delayProofResult.grade}
                    </span>
                    <span className="rounded-full border border-gray-30 px-2 py-0.5">
                      {copy.delayProof.confidenceLabel}: {delayProofResult.confidenceLevel}
                    </span>
                  </div>
                  <p className="text-body-small text-gray-90">{delayProofResult.text}</p>
                  <p className="text-label-small text-gray-70">
                    {copy.delayProof.evidenceLabel}
                    {` Official ${delayProofResult.evidenceSummary.official.eventCount} · Community ${delayProofResult.evidenceSummary.community.signalCount} · Realtime ${delayProofResult.evidenceSummary.realtime.confidenceLevel}`}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        void copyToClipboard(delayProofResult.text, copy.delayProof.copyTextSuccess)
                      }
                      className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
                    >
                      {copy.delayProof.copyTextButton}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        void copyToClipboard(
                          delayProofResult.shareUrl,
                          copy.delayProof.copyLinkSuccess,
                        )
                      }
                      className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
                    >
                      {copy.delayProof.copyLinkButton}
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleShareDelayProof()}
                      className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
                    >
                      {copy.delayProof.shareButton}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </article>

      <article className={cardClassName}>
        <div className="flex items-center justify-between">
          <h3 className="text-title-small text-gray-100">좋아요/북마크 히스토리</h3>
          <button
            type="button"
            onClick={() => {
              void refetchArticleHistory();
            }}
            className="rounded-md border border-gray-40 px-2 py-1 text-label-small text-gray-90"
          >
            새로고침
          </button>
        </div>
        {isArticleHistoryPending ? (
          <p className="mt-2 text-body-small text-gray-70">히스토리를 불러오는 중입니다.</p>
        ) : null}
        {isArticleHistoryError ? (
          <p className="mt-2 text-body-small text-danger">히스토리를 불러오지 못했습니다.</p>
        ) : null}

        {!isArticleHistoryPending && !isArticleHistoryError ? (
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-gray-30 bg-gray-10 p-3">
              <h4 className="text-label-medium text-gray-100">좋아요</h4>
              {likedArticles.length ? (
                <ul className="mt-2 space-y-2">
                  {likedArticles.slice(0, 8).map(article => (
                    <li key={`liked-${article.articleType}-${article.articleId}`}>
                      <Link
                        href={resolveArticlePath(article.articleType, article.articleId)}
                        className="block rounded-lg bg-white px-3 py-2"
                      >
                        <p className="line-clamp-1 text-body-small text-gray-100">
                          {article.title}
                        </p>
                        <p className="mt-1 text-label-small text-gray-70">
                          {article.articleType} · {formatDisplayDate(article.reactedAt)}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-body-small text-gray-70">좋아요한 글이 없습니다.</p>
              )}
            </div>

            <div className="rounded-xl border border-gray-30 bg-gray-10 p-3">
              <h4 className="text-label-medium text-gray-100">북마크</h4>
              {bookmarkedArticles.length ? (
                <ul className="mt-2 space-y-2">
                  {bookmarkedArticles.slice(0, 8).map(article => (
                    <li key={`bookmark-${article.articleType}-${article.articleId}`}>
                      <Link
                        href={resolveArticlePath(article.articleType, article.articleId)}
                        className="block rounded-lg bg-white px-3 py-2"
                      >
                        <p className="line-clamp-1 text-body-small text-gray-100">
                          {article.title}
                        </p>
                        <p className="mt-1 text-label-small text-gray-70">
                          {article.articleType} · {formatDisplayDate(article.reactedAt)}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-body-small text-gray-70">북마크한 글이 없습니다.</p>
              )}
            </div>
          </div>
        ) : null}
      </article>

      <article className={cardClassName}>
        <h3 className="text-title-small text-gray-100">아하철 앱 정책</h3>
        <p className="mt-2 text-body-small text-gray-70">
          이용약관과 개인정보처리방침을 확인할 수 있습니다.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <a
            href={TERMS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
          >
            이용약관
          </a>
          <a
            href={PRIVACY_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
          >
            개인정보처리방침
          </a>
        </div>
      </article>

      <article className={cardClassName}>
        <h3 className="text-title-small text-gray-100">{copy.languageSectionTitle}</h3>
        <LanguageSelector className="mt-3" />
      </article>
    </section>
  );
}
