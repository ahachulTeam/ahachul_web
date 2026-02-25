import { useEffect, useMemo, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_GC_TIME, QUERY_STALE_TIME } from '@ahhachul/domain';

import {
  createForeignerStationSocialMeetupV2,
  fetchForeignerStationSocialOverviewV2,
  joinForeignerStationSocialMeetupV2,
  openForeignerStationSocialMatchV2,
  reviewForeignerStationSocialParticipantV2,
  type ForeignerLocale,
} from '@/apis/request/subway';
import { LayoutComponent } from '@/components';
import { useFlow } from '@/stackflow';
import { mixins } from '@/styles';
import { createActionLogger, resolveClientErrorMessage } from '@/utils/observability';

const foreignerHotspotDetailLogger = createActionLogger('foreigner-hotspot-detail-page');

type ForeignerHotspotDetailPageParams = {
  stationId: number | string;
  subwayLineId?: number | string;
  locale?: ForeignerLocale;
  purpose?: 'LANGUAGE_EXCHANGE' | 'FRIENDSHIP';
};

type JoinDraft = {
  introductionMessage: string;
  nationalityCode: string;
};

type FeedbackType = 'success' | 'error' | 'info';

type Feedback = {
  type: FeedbackType;
  message: string;
};

const LOCALE_OPTIONS: Array<{ value: ForeignerLocale; label: string }> = [
  { value: 'en', label: 'EN' },
  { value: 'ko', label: 'KO' },
  { value: 'th', label: 'TH' },
  { value: 'cn', label: 'CN' },
];

function toLocalDatetimeValue(baseDate: Date): string {
  const year = baseDate.getFullYear();
  const month = `${baseDate.getMonth() + 1}`.padStart(2, '0');
  const day = `${baseDate.getDate()}`.padStart(2, '0');
  const hours = `${baseDate.getHours()}`.padStart(2, '0');
  const minutes = `${baseDate.getMinutes()}`.padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function getDefaultMeetupAt(): string {
  const date = new Date();
  date.setHours(date.getHours() + 1);
  date.setMinutes(0, 0, 0);
  return toLocalDatetimeValue(date);
}

function toServerDateTime(datetimeLocalValue: string): string | null {
  const date = new Date(datetimeLocalValue);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hours = `${date.getHours()}`.padStart(2, '0');
  const minutes = `${date.getMinutes()}`.padStart(2, '0');
  const seconds = `${date.getSeconds()}`.padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

function toUpperCode(value: string): string | undefined {
  const normalized = value.trim().toUpperCase();
  return normalized.length > 0 ? normalized : undefined;
}

function getJoinDraft(draftMap: Record<number, JoinDraft>, meetupId: number): JoinDraft {
  return draftMap[meetupId] ?? { introductionMessage: '', nationalityCode: '' };
}

function getPurposePreset(purpose?: 'LANGUAGE_EXCHANGE' | 'FRIENDSHIP') {
  if (purpose === 'LANGUAGE_EXCHANGE') {
    return {
      title: '[언어교환] 한국어 ↔ 영어',
      description:
        '한국인/외국인 모두 환영합니다. 각자 모국어와 배우고 싶은 언어를 소개하고 1:1 또는 소그룹으로 교환해요.',
      badge: '언어교환 프리셋 적용',
    };
  }

  if (purpose === 'FRIENDSHIP') {
    return {
      title: '[친목모임] 함께 역 주변 탐방',
      description:
        '국적 상관없이 가볍게 만나는 친목 모임입니다. 간단한 대화와 역 주변 코스를 함께 즐겨요.',
      badge: '친목 프리셋 적용',
    };
  }

  return null;
}

const ForeignerHotspotDetailPage: ActivityComponentType<ForeignerHotspotDetailPageParams> = ({
  params,
}: {
  params: ForeignerHotspotDetailPageParams;
}) => {
  const stationId = Number(params.stationId ?? 0);
  const initialSubwayLineId = Number(params.subwayLineId ?? 0);
  const initialLocale = params.locale ?? 'en';
  const purpose = params.purpose;

  const { pop, push } = useFlow();
  const queryClient = useQueryClient();

  const [locale, setLocale] = useState<ForeignerLocale>(initialLocale);
  const [subwayLineId, setSubwayLineId] = useState<number>(initialSubwayLineId);
  const [sameNationalityOnly, setSameNationalityOnly] = useState(false);
  const [nationalityCode, setNationalityCode] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [meetupAt, setMeetupAt] = useState(getDefaultMeetupAt());
  const [maxParticipants, setMaxParticipants] = useState<number>(20);
  const [meetupNationalityCode, setMeetupNationalityCode] = useState('');
  const [meetupSameNationalityOnly, setMeetupSameNationalityOnly] = useState(false);
  const [joinDraftByMeetupId, setJoinDraftByMeetupId] = useState<Record<number, JoinDraft>>({});
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const purposePreset = useMemo(() => getPurposePreset(purpose), [purpose]);

  const overviewQueryKey = useMemo(
    () =>
      [
        'foreigner',
        'station-social',
        'overview',
        stationId,
        subwayLineId,
        locale,
        sameNationalityOnly,
        nationalityCode,
      ] as const,
    [locale, nationalityCode, sameNationalityOnly, stationId, subwayLineId],
  );

  const overviewQuery = useQuery({
    queryKey: overviewQueryKey,
    enabled: stationId > 0,
    queryFn: () =>
      fetchForeignerStationSocialOverviewV2({
        stationId,
        ...(subwayLineId > 0 ? { subwayLineId } : {}),
        locale,
        sameNationalityOnly,
        ...(toUpperCode(nationalityCode) ? { nationalityCode: toUpperCode(nationalityCode) } : {}),
        limit: 30,
      }),
    staleTime: QUERY_STALE_TIME.feed,
    gcTime: QUERY_GC_TIME.feed,
    select: response => response.data.result,
  });

  useEffect(() => {
    if (!overviewQuery.error) {
      return;
    }
    foreignerHotspotDetailLogger.fail(
      'load-overview',
      overviewQuery.error,
      {
        stationId,
        subwayLineId,
        locale,
        sameNationalityOnly,
      },
      '역 소셜 상세 정보를 불러오지 못했습니다.',
    );
  }, [
    locale,
    overviewQuery.error,
    overviewQuery.errorUpdatedAt,
    sameNationalityOnly,
    stationId,
    subwayLineId,
  ]);

  useEffect(() => {
    if (!overviewQuery.data || subwayLineId > 0) {
      return;
    }
    setSubwayLineId(overviewQuery.data.station.subwayLineId);
  }, [overviewQuery.data, subwayLineId]);

  useEffect(() => {
    if (!purposePreset) {
      return;
    }
    setTitle(previous => (previous.trim().length > 0 ? previous : purposePreset.title));
    setDescription(previous => (previous.trim().length > 0 ? previous : purposePreset.description));
  }, [purposePreset]);

  const createMeetupMutation = useMutation({
    mutationFn: async () => {
      const convertedMeetupAt = toServerDateTime(meetupAt);
      if (!convertedMeetupAt) {
        throw new Error('INVALID_MEETUP_AT');
      }

      return createForeignerStationSocialMeetupV2({
        stationId,
        subwayLineId:
          subwayLineId > 0 ? subwayLineId : (overviewQuery.data?.station.subwayLineId ?? 0),
        title: title.trim(),
        description: description.trim(),
        meetupAt: convertedMeetupAt,
        maxParticipants,
        sameNationalityOnly: meetupSameNationalityOnly,
        ...(toUpperCode(meetupNationalityCode)
          ? { nationalityCode: toUpperCode(meetupNationalityCode) }
          : {}),
      });
    },
    onSuccess: () => {
      setTitle('');
      setDescription('');
      setMeetupAt(getDefaultMeetupAt());
      setMeetupNationalityCode('');
      setMeetupSameNationalityOnly(false);
      setFeedback({
        type: 'success',
        message: '모임을 생성했습니다.',
      });
      foreignerHotspotDetailLogger.success('create-meetup', {
        stationId,
        subwayLineId,
      });
      void queryClient.invalidateQueries({ queryKey: overviewQueryKey });
    },
    onError: error => {
      const message = resolveClientErrorMessage(error, '모임 생성에 실패했습니다.');
      setFeedback({
        type: 'error',
        message,
      });
      foreignerHotspotDetailLogger.fail('create-meetup', error, {
        stationId,
        subwayLineId,
      });
    },
  });

  const joinMeetupMutation = useMutation({
    mutationFn: (args: { meetupId: number; payload: JoinDraft }) =>
      joinForeignerStationSocialMeetupV2(args.meetupId, {
        introductionMessage: args.payload.introductionMessage.trim() || undefined,
        nationalityCode: toUpperCode(args.payload.nationalityCode),
      }),
    onSuccess: (_, variables) => {
      setJoinDraftByMeetupId(previous => ({
        ...previous,
        [variables.meetupId]: { introductionMessage: '', nationalityCode: '' },
      }));
      setFeedback({
        type: 'success',
        message: '참여 요청을 전송했습니다.',
      });
      foreignerHotspotDetailLogger.success('join-meetup', {
        meetupId: variables.meetupId,
      });
      void queryClient.invalidateQueries({ queryKey: overviewQueryKey });
    },
    onError: (error, variables) => {
      const message = resolveClientErrorMessage(error, '참여 요청에 실패했습니다.');
      setFeedback({
        type: 'error',
        message,
      });
      foreignerHotspotDetailLogger.fail(
        'join-meetup',
        error,
        { meetupId: variables.meetupId },
        message,
      );
    },
  });

  const reviewParticipantMutation = useMutation({
    mutationFn: (args: { meetupId: number; participantId: number; approve: boolean }) =>
      reviewForeignerStationSocialParticipantV2(args.meetupId, args.participantId, {
        approve: args.approve,
      }),
    onSuccess: (_, variables) => {
      setFeedback({
        type: 'success',
        message: variables.approve ? '참여자를 승인했습니다.' : '참여자를 거절했습니다.',
      });
      foreignerHotspotDetailLogger.success('review-participant', {
        meetupId: variables.meetupId,
        participantId: variables.participantId,
        approve: variables.approve,
      });
      void queryClient.invalidateQueries({ queryKey: overviewQueryKey });
    },
    onError: (error, variables) => {
      const message = resolveClientErrorMessage(error, '참여자 상태 변경에 실패했습니다.');
      setFeedback({
        type: 'error',
        message,
      });
      foreignerHotspotDetailLogger.fail(
        'review-participant',
        error,
        {
          meetupId: variables.meetupId,
          participantId: variables.participantId,
          approve: variables.approve,
        },
        message,
      );
    },
  });

  const openMatchMutation = useMutation({
    mutationFn: (args: { meetupId: number; targetMemberId: number }) =>
      openForeignerStationSocialMatchV2(args.meetupId, {
        targetMemberId: args.targetMemberId,
      }),
    onSuccess: (response, variables) => {
      const roomId = response.data.result.roomId;
      foreignerHotspotDetailLogger.success('open-match', {
        meetupId: variables.meetupId,
        roomId,
      });
      setFeedback({
        type: 'success',
        message: '매칭 쪽지방으로 이동합니다.',
      });
      push('TalkDetailPage', { id: roomId });
    },
    onError: (error, variables) => {
      const message = resolveClientErrorMessage(error, '매칭 쪽지방 생성에 실패했습니다.');
      setFeedback({
        type: 'error',
        message,
      });
      foreignerHotspotDetailLogger.fail(
        'open-match',
        error,
        { meetupId: variables.meetupId },
        message,
      );
    },
  });

  const overview = overviewQuery.data;

  if (!Number.isInteger(stationId) || stationId <= 0) {
    return (
      <LayoutComponent.Base navigationSlot={false}>
        <S.Container>
          <S.HeaderCard>
            <S.Title>외국인 역 소셜 상세</S.Title>
            <S.ErrorText>잘못된 역 정보입니다.</S.ErrorText>
            <S.BaseButton type="button" onClick={pop}>
              이전으로
            </S.BaseButton>
          </S.HeaderCard>
        </S.Container>
      </LayoutComponent.Base>
    );
  }

  return (
    <LayoutComponent.Base navigationSlot={false}>
      <S.Container>
        <S.HeaderCard>
          <S.HeaderTop>
            <S.Title>외국인 역 소셜 상세</S.Title>
            <S.BaseButton type="button" onClick={pop}>
              목록으로
            </S.BaseButton>
          </S.HeaderTop>
          <S.Description>
            역 단위 모임을 생성/참여하고, 승인된 사용자와 바로 쪽지방을 열 수 있습니다.
          </S.Description>

          <S.FilterRow>
            <S.LocaleSelect
              value={locale}
              onChange={event => setLocale(event.target.value as ForeignerLocale)}
            >
              {LOCALE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </S.LocaleSelect>
            <S.CodeInput
              value={nationalityCode}
              onChange={event => setNationalityCode(event.target.value.toUpperCase())}
              placeholder="국적 코드(예: CN)"
            />
            <S.CheckLabel>
              <input
                type="checkbox"
                checked={sameNationalityOnly}
                onChange={event => setSameNationalityOnly(event.target.checked)}
              />
              같은 국적만 보기
            </S.CheckLabel>
            <S.BaseButton type="button" onClick={() => void overviewQuery.refetch()}>
              적용
            </S.BaseButton>
          </S.FilterRow>
        </S.HeaderCard>

        {feedback ? <S.FeedbackText type={feedback.type}>{feedback.message}</S.FeedbackText> : null}

        {overviewQuery.isLoading ? (
          <S.HelperText>상세 데이터를 불러오는 중입니다.</S.HelperText>
        ) : null}
        {overviewQuery.isError ? (
          <S.ErrorText>
            {resolveClientErrorMessage(
              overviewQuery.error,
              '상세 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
            )}
          </S.ErrorText>
        ) : null}

        {overview ? (
          <>
            <S.ContentCard>
              <S.CardTitle>
                {overview.station.stationNameLocalized} · {overview.station.lineNameLocalized}
              </S.CardTitle>
              <S.MetaText>
                Romanized: {overview.station.romanizedName} · Pronunciation:{' '}
                {overview.station.pronunciation}
              </S.MetaText>
              <S.TipList>
                {overview.station.cultureTips.map(tip => (
                  <li key={tip}>{tip}</li>
                ))}
              </S.TipList>
            </S.ContentCard>

            <S.ContentCard>
              <S.CardTitle>소셜 캘린더</S.CardTitle>
              {overview.calendar.length === 0 ? (
                <S.HelperText>등록된 예정 모임이 없습니다.</S.HelperText>
              ) : (
                <S.CalendarList>
                  {overview.calendar.map(item => (
                    <S.CalendarItem key={item.date}>
                      {item.date} · {item.meetupCount}개
                    </S.CalendarItem>
                  ))}
                </S.CalendarList>
              )}
            </S.ContentCard>

            <S.ContentCard>
              <S.CardTitle>모임 생성</S.CardTitle>
              {purposePreset ? <S.MetaText>{purposePreset.badge}</S.MetaText> : null}
              <S.FormGrid>
                <S.TextInput
                  value={title}
                  onChange={event => setTitle(event.target.value)}
                  placeholder="모임 제목"
                />
                <S.TextArea
                  value={description}
                  onChange={event => setDescription(event.target.value)}
                  rows={3}
                  placeholder="모임 설명"
                />
                <S.FormRow>
                  <S.TextInput
                    type="datetime-local"
                    value={meetupAt}
                    onChange={event => setMeetupAt(event.target.value)}
                  />
                  <S.TextInput
                    type="number"
                    min={2}
                    max={500}
                    value={maxParticipants}
                    onChange={event => setMaxParticipants(Number(event.target.value))}
                    placeholder="최대 인원"
                  />
                </S.FormRow>
                <S.FormRow>
                  <S.TextInput
                    value={meetupNationalityCode}
                    onChange={event => setMeetupNationalityCode(event.target.value.toUpperCase())}
                    placeholder="국적 코드(선택)"
                  />
                  <S.CheckLabel>
                    <input
                      type="checkbox"
                      checked={meetupSameNationalityOnly}
                      onChange={event => setMeetupSameNationalityOnly(event.target.checked)}
                    />
                    같은 국적만 허용
                  </S.CheckLabel>
                </S.FormRow>
                <S.PrimaryButton
                  type="button"
                  disabled={
                    createMeetupMutation.isPending ||
                    title.trim().length === 0 ||
                    description.trim().length === 0
                  }
                  onClick={() => createMeetupMutation.mutate()}
                >
                  {createMeetupMutation.isPending ? '생성 중...' : '모임 생성'}
                </S.PrimaryButton>
              </S.FormGrid>
            </S.ContentCard>

            <S.MeetupSection>
              <S.SectionTitle>모임 목록</S.SectionTitle>
              {overview.meetups.length === 0 ? (
                <S.HelperText>현재 조건에서 노출할 모임이 없습니다.</S.HelperText>
              ) : null}

              {overview.meetups.map(meetup => {
                const myParticipant = meetup.participants.find(participant => participant.mine);
                const canRequestJoin =
                  !meetup.mine && (!myParticipant || myParticipant.status === 'REJECTED');
                const acceptedParticipants = meetup.participants.filter(
                  participant => participant.status === 'ACCEPTED' && !participant.mine,
                );
                const joinDraft = getJoinDraft(joinDraftByMeetupId, meetup.meetupId);

                return (
                  <S.MeetupCard key={meetup.meetupId}>
                    <S.MeetupHeader>
                      <div>
                        <S.MetaText>{meetup.meetupAt}</S.MetaText>
                        <S.CardTitle>{meetup.title}</S.CardTitle>
                      </div>
                      <S.CapacityBadge>
                        {meetup.acceptedCount}/{meetup.maxParticipants}
                      </S.CapacityBadge>
                    </S.MeetupHeader>
                    <S.BodyText>{meetup.description}</S.BodyText>
                    <S.MetaText>
                      host: {meetup.hostNickname} · 정책:{' '}
                      {meetup.sameNationalityOnly
                        ? `동일 국적(${meetup.nationalityCode ?? '-'})`
                        : '전체'}
                    </S.MetaText>

                    {canRequestJoin ? (
                      <S.JoinFormBox>
                        <S.TextInput
                          value={joinDraft.introductionMessage}
                          onChange={event =>
                            setJoinDraftByMeetupId(previous => ({
                              ...previous,
                              [meetup.meetupId]: {
                                ...joinDraft,
                                introductionMessage: event.target.value,
                              },
                            }))
                          }
                          placeholder="참여 소개문"
                        />
                        <S.TextInput
                          value={joinDraft.nationalityCode}
                          onChange={event =>
                            setJoinDraftByMeetupId(previous => ({
                              ...previous,
                              [meetup.meetupId]: {
                                ...joinDraft,
                                nationalityCode: event.target.value.toUpperCase(),
                              },
                            }))
                          }
                          placeholder="국적 코드(선택)"
                        />
                        <S.PrimaryButton
                          type="button"
                          disabled={joinMeetupMutation.isPending}
                          onClick={() =>
                            joinMeetupMutation.mutate({
                              meetupId: meetup.meetupId,
                              payload: joinDraft,
                            })
                          }
                        >
                          {joinMeetupMutation.isPending ? '요청 중...' : '참여 요청'}
                        </S.PrimaryButton>
                      </S.JoinFormBox>
                    ) : null}

                    {myParticipant ? (
                      <S.StateText>내 참여 상태: {myParticipant.status}</S.StateText>
                    ) : null}

                    {meetup.mine && meetup.participants.length > 0 ? (
                      <S.ActionBox>
                        <S.BoxTitle>참여 승인 관리</S.BoxTitle>
                        {meetup.participants.map(participant => (
                          <S.ParticipantRow key={participant.participantId}>
                            <S.BodyText>
                              {participant.nickname} · {participant.status} ·{' '}
                              {participant.nationalityCode ?? '-'}
                            </S.BodyText>
                            {participant.status === 'REQUESTED' ? (
                              <S.ActionRow>
                                <S.ApproveButton
                                  type="button"
                                  onClick={() =>
                                    reviewParticipantMutation.mutate({
                                      meetupId: meetup.meetupId,
                                      participantId: participant.participantId,
                                      approve: true,
                                    })
                                  }
                                >
                                  승인
                                </S.ApproveButton>
                                <S.RejectButton
                                  type="button"
                                  onClick={() =>
                                    reviewParticipantMutation.mutate({
                                      meetupId: meetup.meetupId,
                                      participantId: participant.participantId,
                                      approve: false,
                                    })
                                  }
                                >
                                  거절
                                </S.RejectButton>
                              </S.ActionRow>
                            ) : null}
                          </S.ParticipantRow>
                        ))}
                      </S.ActionBox>
                    ) : null}

                    {meetup.mine && acceptedParticipants.length > 0 ? (
                      <S.ActionBox>
                        <S.BoxTitle>매칭 시작</S.BoxTitle>
                        {acceptedParticipants.map(participant => (
                          <S.SecondaryButton
                            key={`match-${meetup.meetupId}-${participant.memberId}`}
                            type="button"
                            onClick={() =>
                              openMatchMutation.mutate({
                                meetupId: meetup.meetupId,
                                targetMemberId: participant.memberId,
                              })
                            }
                          >
                            {participant.nickname}와 쪽지방 열기
                          </S.SecondaryButton>
                        ))}
                      </S.ActionBox>
                    ) : null}

                    {!meetup.mine && myParticipant?.status === 'ACCEPTED' ? (
                      <S.PrimaryButton
                        type="button"
                        onClick={() =>
                          openMatchMutation.mutate({
                            meetupId: meetup.meetupId,
                            targetMemberId: meetup.hostMemberId,
                          })
                        }
                      >
                        host와 매칭 시작
                      </S.PrimaryButton>
                    ) : null}
                  </S.MeetupCard>
                );
              })}
            </S.MeetupSection>

            <S.ContentCard>
              <S.CardTitle>역 리뷰 요약</S.CardTitle>
              {overview.reviewPosts.length === 0 ? (
                <S.HelperText>리뷰 게시글이 아직 없습니다.</S.HelperText>
              ) : (
                <S.ReviewList>
                  {overview.reviewPosts.map(review => (
                    <S.ReviewItem key={review.postId}>
                      <S.MetaText>{review.writer}</S.MetaText>
                      <S.BodyText>{review.title}</S.BodyText>
                      <S.MetaText>{review.preview}</S.MetaText>
                    </S.ReviewItem>
                  ))}
                </S.ReviewList>
              )}
            </S.ContentCard>
          </>
        ) : null}
      </S.Container>
    </LayoutComponent.Base>
  );
};

const S = {
  Container: styled.section`
    ${mixins.flexColumn};
    ${mixins.fullWidth};
    ${mixins.sideGutter};
    ${mixins.pagePaddingTop};
    ${mixins.pagePaddingBottom};
    gap: 12px;
  `,
  HeaderCard: styled.article`
    ${({ theme }) => css`
      ${mixins.flexColumn};
      gap: 8px;
      border: 1px solid ${theme.colors.gray[30]};
      border-radius: 16px;
      background-color: ${theme.colors.white};
      padding: 14px;
    `}
  `,
  HeaderTop: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  `,
  Title: styled.h1`
    ${({ theme }) => css`
      ${theme.fonts.titleLarge};
      color: ${theme.colors.gray[90]};
    `}
  `,
  Description: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      color: ${theme.colors.gray[70]};
    `}
  `,
  FilterRow: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  `,
  LocaleSelect: styled.select`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      height: 32px;
      border: 1px solid ${theme.colors.gray[40]};
      border-radius: 10px;
      background-color: ${theme.colors.white};
      color: ${theme.colors.gray[90]};
      padding: 0 8px;
    `}
  `,
  CodeInput: styled.input`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      width: 130px;
      height: 32px;
      border: 1px solid ${theme.colors.gray[40]};
      border-radius: 10px;
      color: ${theme.colors.gray[90]};
      background-color: ${theme.colors.white};
      padding: 0 8px;
    `}
  `,
  CheckLabel: styled.label`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      color: ${theme.colors.gray[80]};
      display: inline-flex;
      align-items: center;
      gap: 4px;
    `}
  `,
  ContentCard: styled.article`
    ${({ theme }) => css`
      ${mixins.flexColumn};
      gap: 8px;
      border: 1px solid ${theme.colors.gray[30]};
      border-radius: 16px;
      background-color: ${theme.colors.white};
      padding: 14px;
    `}
  `,
  MeetupSection: styled.section`
    ${mixins.flexColumn};
    gap: 10px;
  `,
  SectionTitle: styled.h2`
    ${({ theme }) => css`
      ${theme.fonts.titleSmall};
      color: ${theme.colors.gray[100]};
      padding: 2px 2px 0;
    `}
  `,
  CardTitle: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.labelLarge};
      color: ${theme.colors.gray[100]};
    `}
  `,
  MetaText: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      color: ${theme.colors.gray[70]};
    `}
  `,
  BodyText: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      color: ${theme.colors.gray[90]};
      white-space: pre-wrap;
    `}
  `,
  TipList: styled.ul`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      color: ${theme.colors.gray[80]};
      padding-left: 14px;
      display: grid;
      gap: 4px;
    `}
  `,
  CalendarList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  `,
  CalendarItem: styled.span`
    ${({ theme }) => css`
      ${theme.fonts.labelSmall};
      border: 1px solid ${theme.colors.gray[30]};
      border-radius: 999px;
      color: ${theme.colors.gray[80]};
      background-color: ${theme.colors.gray[10]};
      padding: 2px 8px;
    `}
  `,
  FormGrid: styled.div`
    ${mixins.flexColumn};
    gap: 8px;
  `,
  FormRow: styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr 1fr;
  `,
  TextInput: styled.input`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      width: 100%;
      height: 36px;
      border: 1px solid ${theme.colors.gray[40]};
      border-radius: 10px;
      background-color: ${theme.colors.white};
      color: ${theme.colors.gray[90]};
      padding: 0 10px;
    `}
  `,
  TextArea: styled.textarea`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      width: 100%;
      border: 1px solid ${theme.colors.gray[40]};
      border-radius: 10px;
      background-color: ${theme.colors.white};
      color: ${theme.colors.gray[90]};
      padding: 10px;
      resize: vertical;
    `}
  `,
  MeetupCard: styled.article`
    ${({ theme }) => css`
      ${mixins.flexColumn};
      gap: 8px;
      border: 1px solid ${theme.colors.gray[30]};
      border-radius: 14px;
      background-color: ${theme.colors.white};
      padding: 12px;
    `}
  `,
  MeetupHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
  `,
  CapacityBadge: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.labelSmall};
      border: 1px solid ${theme.colors.gray[40]};
      border-radius: 999px;
      background-color: ${theme.colors.gray[10]};
      color: ${theme.colors.gray[80]};
      padding: 2px 8px;
    `}
  `,
  JoinFormBox: styled.div`
    ${({ theme }) => css`
      ${mixins.flexColumn};
      gap: 8px;
      border: 1px solid ${theme.colors.gray[30]};
      border-radius: 10px;
      background-color: ${theme.colors.gray[10]};
      padding: 10px;
    `}
  `,
  ActionBox: styled.div`
    ${({ theme }) => css`
      ${mixins.flexColumn};
      gap: 8px;
      border: 1px solid ${theme.colors.gray[30]};
      border-radius: 10px;
      background-color: ${theme.colors.gray[10]};
      padding: 10px;
    `}
  `,
  BoxTitle: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.labelMedium};
      color: ${theme.colors.gray[90]};
    `}
  `,
  ParticipantRow: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  `,
  ActionRow: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
  `,
  BaseButton: styled.button`
    ${({ theme }) => css`
      ${theme.fonts.labelSmall};
      border: 1px solid ${theme.colors.gray[40]};
      border-radius: 10px;
      background-color: ${theme.colors.white};
      color: ${theme.colors.gray[90]};
      height: 32px;
      padding: 0 10px;
    `}
  `,
  SecondaryButton: styled.button`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      border: 1px solid ${theme.colors.gray[40]};
      border-radius: 10px;
      background-color: ${theme.colors.white};
      color: ${theme.colors.gray[90]};
      text-align: left;
      padding: 8px 10px;
    `}
  `,
  PrimaryButton: styled.button`
    ${({ theme }) => css`
      ${theme.fonts.labelMedium};
      border: 0;
      border-radius: 10px;
      background-color: ${theme.colors['key-color']};
      color: ${theme.colors.white};
      height: 36px;
      padding: 0 12px;

      &:disabled {
        opacity: 0.45;
      }
    `}
  `,
  ApproveButton: styled.button`
    ${({ theme }) => css`
      ${theme.fonts.labelSmall};
      border-radius: 8px;
      border: 0;
      background-color: #059669;
      color: ${theme.colors.white};
      height: 26px;
      padding: 0 8px;
    `}
  `,
  RejectButton: styled.button`
    ${({ theme }) => css`
      ${theme.fonts.labelSmall};
      border-radius: 8px;
      border: 0;
      background-color: #dc2626;
      color: ${theme.colors.white};
      height: 26px;
      padding: 0 8px;
    `}
  `,
  ReviewList: styled.ul`
    ${mixins.flexColumn};
    gap: 8px;
  `,
  ReviewItem: styled.li`
    ${({ theme }) => css`
      ${mixins.flexColumn};
      gap: 4px;
      border: 1px solid ${theme.colors.gray[30]};
      border-radius: 10px;
      background-color: ${theme.colors.gray[10]};
      padding: 10px;
    `}
  `,
  StateText: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      color: ${theme.colors['key-color']};
    `}
  `,
  FeedbackText: styled.p<{ type: FeedbackType }>`
    ${({ theme, type }) => {
      const colorByType: Record<FeedbackType, string> = {
        success: '#047857',
        error: theme.colors.red[60],
        info: theme.colors.gray[80],
      };

      return css`
        ${theme.fonts.bodySmall};
        border-radius: 10px;
        border: 1px solid ${theme.colors.gray[30]};
        background-color: ${theme.colors.white};
        color: ${colorByType[type]};
        padding: 8px 10px;
      `;
    }}
  `,
  HelperText: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      color: ${theme.colors.gray[70]};
    `}
  `,
  ErrorText: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      color: ${theme.colors.red[60]};
    `}
  `,
};

export default ForeignerHotspotDetailPage;
