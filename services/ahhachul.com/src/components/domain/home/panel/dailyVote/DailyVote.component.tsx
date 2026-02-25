import { type ReactNode, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/contexts';
import { useFetchDailyVoteToday, useVoteDailyPoll } from '@/services/subway';
import { StackFlow } from '@/stackflow';
import type { DailyVotePollCard } from '@/types';
import { createActionLogger } from '@/utils/observability';

import * as S from './DailyVote.styled';

const dailyVoteLogger = createActionLogger('home-daily-vote');

function resolveContextLabel(context: DailyVotePollCard['pollContext']) {
  return context === 'SCHOOL' ? '등하교' : '출퇴근';
}

const DailyVote = () => {
  const {
    authService: { isAuthenticated },
  } = useAuth();
  const queryClient = useQueryClient();

  const dailyVoteTodayQuery = useFetchDailyVoteToday({
    enabled: isAuthenticated,
  });
  const voteMutation = useVoteDailyPoll();

  useEffect(() => {
    if (!dailyVoteTodayQuery.error) {
      return;
    }
    dailyVoteLogger.fail(
      'load-daily-vote',
      dailyVoteTodayQuery.error,
      undefined,
      '홈 일일 투표 정보를 불러오지 못했습니다.',
    );
  }, [dailyVoteTodayQuery.error, dailyVoteTodayQuery.errorUpdatedAt]);

  if (!isAuthenticated) {
    return null;
  }

  const today = dailyVoteTodayQuery.data;
  const polls = [today?.primaryPoll, today?.secondaryPoll].filter(
    (poll): poll is DailyVotePollCard => poll != null,
  );
  const stationDiary = today?.stationDiary ?? null;

  let stationDiaryContent: ReactNode = null;
  if (stationDiary?.visible) {
    stationDiaryContent = (
      <S.StationDiaryCard>
        <S.PollHeader>
          <S.PollMeta>오늘의 역 일기</S.PollMeta>
          <StackFlow.Link
            activityName="DailyVotePage"
            activityParams={{
              pollId: stationDiary.pollId,
              question: stationDiary.question,
              stationName: stationDiary.stationName,
            }}
          >
            <S.DetailButton type="button">작성/보기</S.DetailButton>
          </StackFlow.Link>
        </S.PollHeader>
        <S.Question>{stationDiary.question}</S.Question>
        <S.TotalVoteText>댓글 {stationDiary.commentCount}개</S.TotalVoteText>
      </S.StationDiaryCard>
    );
  } else if (stationDiary) {
    stationDiaryContent = (
      <S.HelperText>
        주 투표를 완료하면 오늘의 역 일기({stationDiary.stationName})가 열립니다.
      </S.HelperText>
    );
  }

  return (
    <S.Container>
      <b>오늘의 출퇴근/등하교 투표</b>

      <S.Card>
        {dailyVoteTodayQuery.isLoading ? (
          <S.EmptyText>오늘의 투표를 불러오는 중입니다.</S.EmptyText>
        ) : null}
        {dailyVoteTodayQuery.isError ? (
          <S.ErrorText>오늘의 투표를 불러오지 못했습니다.</S.ErrorText>
        ) : null}
        {!dailyVoteTodayQuery.isLoading && !dailyVoteTodayQuery.isError && polls.length === 0 ? (
          <S.EmptyText>표시할 투표가 없습니다.</S.EmptyText>
        ) : null}

        {polls.map(poll => (
          <S.PollCard key={`home-daily-vote-${poll.pollId}`}>
            <S.PollHeader>
              <S.PollMeta>
                {resolveContextLabel(poll.pollContext)} · {poll.subwayLineName}
              </S.PollMeta>
              <StackFlow.Link
                activityName="DailyVotePage"
                activityParams={{
                  pollId: poll.pollId,
                  question: poll.question,
                  stationName: poll.stationName,
                }}
              >
                <S.DetailButton type="button">댓글 보기</S.DetailButton>
              </StackFlow.Link>
            </S.PollHeader>
            <S.Question>{poll.question}</S.Question>
            <S.OptionList>
              {poll.options.map(option => (
                <li key={`${poll.pollId}-${option.optionCode}`}>
                  <S.OptionButton
                    type="button"
                    selected={option.optionCode === poll.selectedOptionCode}
                    disabled={voteMutation.isPending}
                    onClick={() =>
                      voteMutation.mutate(
                        { pollId: poll.pollId, optionCode: option.optionCode },
                        {
                          onSuccess: async () => {
                            await Promise.all([
                              queryClient.invalidateQueries({ queryKey: ['daily-vote', 'today'] }),
                              queryClient.invalidateQueries({
                                queryKey: ['daily-vote', 'comments'],
                              }),
                            ]);
                          },
                        },
                      )
                    }
                  >
                    <span>
                      {option.emoji} {option.label}
                    </span>
                    <span>
                      {option.voteCount}표 · {option.voteRatePercent}%
                    </span>
                  </S.OptionButton>
                </li>
              ))}
            </S.OptionList>
            <S.TotalVoteText>총 참여 {poll.totalVoteCount}명</S.TotalVoteText>
          </S.PollCard>
        ))}

        {stationDiaryContent}
      </S.Card>
    </S.Container>
  );
};

export default DailyVote;
