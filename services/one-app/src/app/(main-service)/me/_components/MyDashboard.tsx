'use client';

import { useMemo, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import { QUERY_STALE_TIME, myQueryKeys } from '@ahhachul/domain';
import { maskEmail, normalizeInputText, validateNickname } from '@ahhachul/utils';

import LanguageSelector from '@/app/_components/LanguageSelector';
import { useStationTimeSummaryV2Query, useTrainRealtimeV2Query } from '@/hooks';
import { localizePathname, type LocaleMessages, type SupportedLocale } from '@/i18n';
import { AuthService } from '@/lib/auth-service';
import { createDelayProofV2 } from '@/lib/delay-proof';
import {
  mapRealtimePayloadToSectionVM,
  type DelayProofPayload,
  type StationTimeWeekType,
} from '@/types';

import {
  checkNicknameAvailability,
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
  stationName: string;
  label: string;
};

type MyDashboardProps = {
  locale: SupportedLocale;
  copy: LocaleMessages['me'];
};

export default function MyDashboard({ locale, copy }: MyDashboardProps) {
  const queryClient = useQueryClient();
  const [isEditingFavorites, setIsEditingFavorites] = useState(false);
  const [favoriteDraft, setFavoriteDraft] = useState<EditableFavoriteStation[]>([]);
  const [isDelayProofFormOpen, setIsDelayProofFormOpen] = useState(false);
  const [expectedArrivalAtDraft, setExpectedArrivalAtDraft] = useState('');
  const [customDelayMessage, setCustomDelayMessage] = useState('');
  const [delayProofResult, setDelayProofResult] = useState<DelayProofPayload | null>(null);

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

  const profileReady = Boolean(profile?.result) && !isProfilePending && !isProfileError;
  const favoriteStations = stations?.result.stationInfoList ?? [];
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
      return updateMyProfile(nickname);
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

  const handleRealtimeRefresh = () => {
    void refetchRealtime();
    void refetchSummary();
  };

  const delayProofMutation = useMutation({
    mutationFn: createDelayProofV2,
    onSuccess: response => {
      setDelayProofResult(response.result);
    },
  });

  const openFavoriteEditor = () => {
    setFavoriteDraft(
      favoriteStations.map(station => ({
        stationName: station.stationName,
        label: station.label ?? '',
      })),
    );
    setIsEditingFavorites(true);
  };

  const handleFavoriteStationChange = (
    index: number,
    key: keyof EditableFavoriteStation,
    value: string,
  ) => {
    setFavoriteDraft(previous =>
      previous.map((station, stationIndex) => {
        if (stationIndex !== index) {
          return station;
        }
        return {
          ...station,
          [key]: value,
        };
      }),
    );
  };

  const addFavoriteDraft = () => {
    if (favoriteDraft.length >= MAX_FAVORITE_STATIONS) {
      window.alert(`즐겨찾는 역은 최대 ${MAX_FAVORITE_STATIONS}개까지 등록할 수 있습니다.`);
      return;
    }
    setFavoriteDraft(previous => [...previous, { stationName: '', label: '' }]);
  };

  const removeFavoriteDraft = (index: number) => {
    setFavoriteDraft(previous => previous.filter((_, stationIndex) => stationIndex !== index));
  };

  const normalizedFavoritePayload = useMemo(() => {
    return favoriteDraft
      .map(station => ({
        stationName: normalizeInputText(station.stationName),
        label: normalizeInputText(station.label),
      }))
      .filter(station => station.stationName.length > 0);
  }, [favoriteDraft]);

  const saveFavoriteStations = async () => {
    if (!normalizedFavoritePayload.length) {
      window.alert('즐겨찾는 역을 1개 이상 입력해주세요.');
      return;
    }

    const uniqueStationNames = new Set(
      normalizedFavoritePayload.map(station => normalizeInputText(station.stationName)),
    );
    if (uniqueStationNames.size !== normalizedFavoritePayload.length) {
      window.alert('중복된 역은 등록할 수 없습니다.');
      return;
    }

    try {
      await favoriteMutation.mutateAsync(
        normalizedFavoritePayload.map(station => ({
          stationName: station.stationName,
          ...(station.label ? { label: station.label } : {}),
        })),
      );
      window.alert('즐겨찾는 역이 저장되었습니다.');
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : '즐겨찾는 역 저장에 실패했습니다. 잠시 후 다시 시도해주세요.',
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
          <Link
            href={localizePathname(`/user/${encodeURIComponent(member.nickname)}`, locale)}
            className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
          >
            {copy.viewProfile}
          </Link>
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
                  <input
                    value={station.stationName}
                    onChange={event =>
                      handleFavoriteStationChange(index, 'stationName', event.target.value)
                    }
                    placeholder="역 이름"
                    className="col-span-5 h-9 rounded-lg border border-gray-30 px-2 text-body-small text-gray-90"
                  />
                  <input
                    value={station.label}
                    onChange={event =>
                      handleFavoriteStationChange(index, 'label', event.target.value)
                    }
                    placeholder="별칭(선택)"
                    className="col-span-5 h-9 rounded-lg border border-gray-30 px-2 text-body-small text-gray-90"
                  />
                  <button
                    type="button"
                    onClick={() => removeFavoriteDraft(index)}
                    className="col-span-2 h-9 rounded-lg border border-gray-30 text-label-small text-gray-90"
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
              <p className="text-label-small text-gray-80">{copy.realtime.firstLastTitle}</p>
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
