'use client';

import { useMemo, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { localizePathname, type SupportedLocale } from '@/i18n';
import {
  createForeignerStationSocialMeetupV2,
  fetchForeignerStationSocialOverviewV2,
  joinForeignerStationSocialMeetupV2,
  openForeignerStationSocialMatchV2,
  reviewForeignerStationSocialParticipantV2,
} from '@/lib/foreigner-mode';
import type { ForeignerLocale } from '@/types';

type Props = {
  locale: SupportedLocale;
  stationId: number;
  subwayLineId: number;
};

function resolveForeignerLocale(locale: SupportedLocale): ForeignerLocale {
  if (locale === 'ko') {
    return 'ko';
  }
  return 'en';
}

function getDefaultMeetupAt() {
  const now = new Date(Date.now() + 60 * 60 * 1000);
  return now.toISOString().slice(0, 16);
}

export default function ForeignerHotspotDetailClient({ locale, stationId, subwayLineId }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const foreignerLocale = resolveForeignerLocale(locale);
  const [sameNationalityOnly, setSameNationalityOnly] = useState(false);
  const [filterNationalityCode, setFilterNationalityCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [meetupAt, setMeetupAt] = useState(getDefaultMeetupAt());
  const [maxParticipants, setMaxParticipants] = useState(20);
  const [meetupNationalityCode, setMeetupNationalityCode] = useState('');
  const [meetupSameNationalityOnly, setMeetupSameNationalityOnly] = useState(false);
  const [joinMessage, setJoinMessage] = useState('');
  const [joinNationalityCode, setJoinNationalityCode] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const overviewQueryKey = useMemo(
    () =>
      [
        'foreigner',
        'station-social',
        'overview',
        stationId,
        subwayLineId,
        foreignerLocale,
        sameNationalityOnly,
        filterNationalityCode,
      ] as const,
    [filterNationalityCode, foreignerLocale, sameNationalityOnly, stationId, subwayLineId],
  );

  const overviewQuery = useQuery({
    queryKey: overviewQueryKey,
    enabled: stationId > 0,
    queryFn: () =>
      fetchForeignerStationSocialOverviewV2({
        stationId,
        subwayLineId: subwayLineId > 0 ? subwayLineId : undefined,
        locale: foreignerLocale,
        sameNationalityOnly,
        nationalityCode: filterNationalityCode.trim() || undefined,
        limit: 30,
      }),
  });

  const createMeetupMutation = useMutation({
    mutationFn: () =>
      createForeignerStationSocialMeetupV2({
        stationId,
        subwayLineId:
          subwayLineId > 0 ? subwayLineId : (overviewQuery.data?.station.subwayLineId ?? 0),
        title: title.trim(),
        description: description.trim(),
        meetupAt: new Date(meetupAt).toISOString().slice(0, 19),
        maxParticipants,
        sameNationalityOnly: meetupSameNationalityOnly,
        nationalityCode: meetupNationalityCode.trim() || undefined,
      }),
    onSuccess: () => {
      setFeedback('모임이 생성되었습니다.');
      setTitle('');
      setDescription('');
      void queryClient.invalidateQueries({ queryKey: overviewQueryKey });
    },
    onError: () => setFeedback('모임 생성에 실패했습니다. 입력값을 확인해주세요.'),
  });

  const joinMeetupMutation = useMutation({
    mutationFn: (meetupId: number) =>
      joinForeignerStationSocialMeetupV2(meetupId, {
        introductionMessage: joinMessage.trim() || undefined,
        nationalityCode: joinNationalityCode.trim() || undefined,
      }),
    onSuccess: () => {
      setFeedback('참여 요청을 보냈습니다.');
      void queryClient.invalidateQueries({ queryKey: overviewQueryKey });
    },
    onError: () => setFeedback('참여 요청에 실패했습니다.'),
  });

  const reviewParticipantMutation = useMutation({
    mutationFn: ({
      meetupId,
      participantId,
      approve,
    }: {
      meetupId: number;
      participantId: number;
      approve: boolean;
    }) =>
      reviewForeignerStationSocialParticipantV2(meetupId, participantId, {
        approve,
      }),
    onSuccess: () => {
      setFeedback('참여 상태를 변경했습니다.');
      void queryClient.invalidateQueries({ queryKey: overviewQueryKey });
    },
    onError: () => setFeedback('참여 상태 변경에 실패했습니다.'),
  });

  const openMatchMutation = useMutation({
    mutationFn: ({ meetupId, targetMemberId }: { meetupId: number; targetMemberId: number }) =>
      openForeignerStationSocialMatchV2(meetupId, {
        targetMemberId,
      }),
    onSuccess: result => {
      setFeedback('매칭 채팅방을 열었습니다.');
      router.push(localizePathname(`/messages/${result.roomId}`, locale));
    },
    onError: () => setFeedback('매칭 생성에 실패했습니다.'),
  });

  const overview = overviewQuery.data;

  return (
    <main className="mx-auto min-h-screen w-full max-w-screen-md bg-white px-5 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-heading-small text-gray-100">외국인 역 소셜 상세</h1>
        <Link
          href={localizePathname('/foreigner/hotspots', locale)}
          className="text-label-small text-key-color"
        >
          목록으로
        </Link>
      </div>

      {feedback ? (
        <p className="mt-3 rounded-lg bg-gray-05 px-3 py-2 text-body-small">{feedback}</p>
      ) : null}

      {overviewQuery.isLoading ? (
        <p className="mt-4 text-body-small text-gray-70">상세 정보를 불러오는 중입니다.</p>
      ) : null}

      {overviewQuery.isError ? (
        <p className="mt-4 text-body-small text-danger">상세 정보를 불러오지 못했습니다.</p>
      ) : null}

      {overview ? (
        <>
          <section className="mt-4 rounded-2xl border border-gray-20 bg-gray-05 p-4">
            <p className="text-title-small text-gray-100">
              {overview.station.stationNameLocalized} · {overview.station.lineNameLocalized}
            </p>
            <p className="mt-1 text-label-small text-gray-70">
              Romanized: {overview.station.romanizedName} / Pronunciation:{' '}
              {overview.station.pronunciation}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-body-small text-gray-80">
              {overview.station.cultureTips.map(tip => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </section>

          <section className="mt-4 rounded-2xl border border-gray-20 bg-white p-4">
            <div className="flex flex-wrap items-center gap-2">
              <label className="text-label-small text-gray-80">
                <input
                  type="checkbox"
                  checked={sameNationalityOnly}
                  onChange={event => setSameNationalityOnly(event.target.checked)}
                  className="mr-1"
                />
                같은 국적만 보기
              </label>
              <input
                value={filterNationalityCode}
                onChange={event => setFilterNationalityCode(event.target.value.toUpperCase())}
                className="h-8 rounded-lg border border-gray-30 px-2 text-body-small"
                placeholder="국적 코드 (예: CN)"
              />
              <button
                type="button"
                className="h-8 rounded-lg bg-gray-100 px-3 text-label-small text-white"
                onClick={() => void overviewQuery.refetch()}
              >
                필터 적용
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {overview.calendar.map(item => (
                <span
                  key={item.date}
                  className="rounded-full border border-gray-30 px-2 py-0.5 text-label-small text-gray-80"
                >
                  {item.date} · {item.meetupCount}개
                </span>
              ))}
            </div>
          </section>

          <section className="mt-4 rounded-2xl border border-gray-20 bg-white p-4">
            <p className="text-title-small text-gray-100">모임 생성</p>
            <div className="mt-2 grid gap-2">
              <input
                value={title}
                onChange={event => setTitle(event.target.value)}
                className="h-9 rounded-lg border border-gray-30 px-3 text-body-small"
                placeholder="모임 제목"
              />
              <textarea
                value={description}
                onChange={event => setDescription(event.target.value)}
                className="rounded-lg border border-gray-30 px-3 py-2 text-body-small"
                rows={3}
                placeholder="모임 설명"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="datetime-local"
                  value={meetupAt}
                  onChange={event => setMeetupAt(event.target.value)}
                  className="h-9 rounded-lg border border-gray-30 px-3 text-body-small"
                />
                <input
                  type="number"
                  min={2}
                  max={500}
                  value={maxParticipants}
                  onChange={event => setMaxParticipants(Number(event.target.value))}
                  className="h-9 rounded-lg border border-gray-30 px-3 text-body-small"
                  placeholder="최대 인원"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={meetupNationalityCode}
                  onChange={event => setMeetupNationalityCode(event.target.value.toUpperCase())}
                  className="h-9 rounded-lg border border-gray-30 px-3 text-body-small"
                  placeholder="국적 코드(선택)"
                />
                <label className="flex items-center text-label-small text-gray-80">
                  <input
                    type="checkbox"
                    checked={meetupSameNationalityOnly}
                    onChange={event => setMeetupSameNationalityOnly(event.target.checked)}
                    className="mr-1"
                  />
                  같은 국적만 허용
                </label>
              </div>
              <button
                type="button"
                className="h-9 rounded-lg bg-key-color px-3 text-label-small text-white disabled:opacity-60"
                disabled={createMeetupMutation.isPending || !title.trim() || !description.trim()}
                onClick={() => createMeetupMutation.mutate()}
              >
                {createMeetupMutation.isPending ? '생성 중...' : '모임 생성'}
              </button>
            </div>
          </section>

          <section className="mt-4 space-y-3">
            <p className="text-title-small text-gray-100">모임 목록</p>
            {overview.meetups.length === 0 ? (
              <p className="rounded-2xl border border-gray-20 bg-gray-05 p-4 text-body-small text-gray-70">
                현재 조건에서 노출할 모임이 없습니다.
              </p>
            ) : null}
            {overview.meetups.map(meetup => {
              const myParticipant = meetup.participants.find(participant => participant.mine);
              const canRequestJoin =
                !meetup.mine && (!myParticipant || myParticipant.status === 'REJECTED');
              const acceptedParticipants = meetup.participants.filter(
                participant => participant.status === 'ACCEPTED' && !participant.mine,
              );
              return (
                <article
                  key={meetup.meetupId}
                  className="rounded-2xl border border-gray-20 bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-label-small text-gray-70">{meetup.meetupAt}</p>
                      <p className="mt-1 text-title-small text-gray-100">{meetup.title}</p>
                    </div>
                    <p className="rounded-full border border-gray-30 px-2 py-0.5 text-label-small text-gray-80">
                      {meetup.acceptedCount}/{meetup.maxParticipants}
                    </p>
                  </div>
                  <p className="mt-2 text-body-small text-gray-80">{meetup.description}</p>
                  <p className="mt-2 text-label-small text-gray-70">
                    host: {meetup.hostNickname} · 국적 정책:{' '}
                    {meetup.sameNationalityOnly
                      ? `동일 국적(${meetup.nationalityCode ?? '-'})`
                      : '전체'}
                  </p>

                  {canRequestJoin ? (
                    <div className="mt-3 grid gap-2 rounded-xl border border-gray-20 bg-gray-05 p-3">
                      <input
                        value={joinMessage}
                        onChange={event => setJoinMessage(event.target.value)}
                        className="h-9 rounded-lg border border-gray-30 px-3 text-body-small"
                        placeholder="참여 소개문"
                      />
                      <input
                        value={joinNationalityCode}
                        onChange={event => setJoinNationalityCode(event.target.value.toUpperCase())}
                        className="h-9 rounded-lg border border-gray-30 px-3 text-body-small"
                        placeholder="국적 코드(선택)"
                      />
                      <button
                        type="button"
                        className="h-9 rounded-lg bg-gray-100 px-3 text-label-small text-white disabled:opacity-60"
                        disabled={joinMeetupMutation.isPending}
                        onClick={() => joinMeetupMutation.mutate(meetup.meetupId)}
                      >
                        {joinMeetupMutation.isPending ? '요청 중...' : '참여 요청'}
                      </button>
                    </div>
                  ) : null}

                  {myParticipant ? (
                    <p className="mt-2 text-label-small text-key-color">
                      내 참여 상태: {myParticipant.status}
                    </p>
                  ) : null}

                  {meetup.mine && meetup.participants.length > 0 ? (
                    <div className="mt-3 space-y-2 rounded-xl border border-gray-20 bg-gray-05 p-3">
                      <p className="text-label-small text-gray-80">참여자 승인 관리</p>
                      {meetup.participants.map(participant => (
                        <div
                          key={participant.participantId}
                          className="flex items-center justify-between gap-2"
                        >
                          <p className="text-body-small text-gray-90">
                            {participant.nickname} · {participant.status} ·{' '}
                            {participant.nationalityCode ?? '-'}
                          </p>
                          {participant.status === 'REQUESTED' ? (
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                className="h-7 rounded-md bg-emerald-600 px-2 text-label-small text-white"
                                onClick={() =>
                                  reviewParticipantMutation.mutate({
                                    meetupId: meetup.meetupId,
                                    participantId: participant.participantId,
                                    approve: true,
                                  })
                                }
                              >
                                승인
                              </button>
                              <button
                                type="button"
                                className="h-7 rounded-md bg-rose-600 px-2 text-label-small text-white"
                                onClick={() =>
                                  reviewParticipantMutation.mutate({
                                    meetupId: meetup.meetupId,
                                    participantId: participant.participantId,
                                    approve: false,
                                  })
                                }
                              >
                                거절
                              </button>
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {meetup.mine && acceptedParticipants.length > 0 ? (
                    <div className="mt-3 space-y-2 rounded-xl border border-gray-20 bg-white p-3">
                      <p className="text-label-small text-gray-80">매칭 시작</p>
                      {acceptedParticipants.map(participant => (
                        <button
                          key={`match-${meetup.meetupId}-${participant.memberId}`}
                          type="button"
                          className="block w-full rounded-lg border border-gray-30 px-3 py-2 text-left text-body-small text-gray-90"
                          onClick={() =>
                            openMatchMutation.mutate({
                              meetupId: meetup.meetupId,
                              targetMemberId: participant.memberId,
                            })
                          }
                        >
                          {participant.nickname}와 쪽지방 열기
                        </button>
                      ))}
                    </div>
                  ) : null}

                  {!meetup.mine && myParticipant?.status === 'ACCEPTED' ? (
                    <button
                      type="button"
                      className="mt-3 h-8 rounded-lg bg-key-color px-3 text-label-small text-white"
                      onClick={() =>
                        openMatchMutation.mutate({
                          meetupId: meetup.meetupId,
                          targetMemberId: meetup.hostMemberId,
                        })
                      }
                    >
                      host와 매칭 시작
                    </button>
                  ) : null}
                </article>
              );
            })}
          </section>

          <section className="mt-4 rounded-2xl border border-gray-20 bg-white p-4">
            <p className="text-title-small text-gray-100">역 리뷰 요약</p>
            {overview.reviewPosts.length === 0 ? (
              <p className="mt-2 text-body-small text-gray-70">리뷰 게시글이 없습니다.</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {overview.reviewPosts.map(post => (
                  <li key={post.postId} className="rounded-lg border border-gray-20 p-3">
                    <p className="text-label-small text-gray-70">{post.writer}</p>
                    <p className="mt-1 text-body-small text-gray-100">{post.title}</p>
                    <p className="mt-1 text-body-small text-gray-80">{post.preview}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      ) : null}
    </main>
  );
}
