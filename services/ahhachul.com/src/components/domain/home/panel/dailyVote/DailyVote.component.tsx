import { type ReactNode, useEffect } from 'react';

import { useAuth } from '@/contexts';
import { useFetchDailyVoteToday } from '@/services/subway';
import { StackFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';
import type { DailyVotePollCard } from '@/types';
import { createActionLogger } from '@/utils/observability';

import * as S from './DailyVote.styled';

const dailyVoteLogger = createActionLogger('home-daily-vote');

function resolveContextLabel(context: DailyVotePollCard['pollContext']) {
  return context === 'SCHOOL' ? '등하교' : '출퇴근';
}

const DailyVote = () => {
  const {
    isCheckingAuthState,
    authService: { isAuthenticated },
  } = useAuth();
  const { userStations } = useUserStationStore(state => state);
  const selectedStation = userStations[0];
  const selectedLine = selectedStation?.subwayLineInfoList?.[0];
  const selectedStationId = selectedStation?.stationId;
  const selectedLineId = Number(selectedLine?.subwayLineId ?? 0);

  const dailyVoteTodayQuery = useFetchDailyVoteToday({
    enabled: isAuthenticated,
  });

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

  if (isCheckingAuthState) {
    return (
      <S.Container>
        <b>오늘의 출퇴근/등하교 투표</b>
        <S.Card>
          <S.EmptyText>인증 상태를 확인하는 중입니다.</S.EmptyText>
        </S.Card>
      </S.Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <S.Container>
        <b>오늘의 출퇴근/등하교 투표</b>
        <S.Card>
          <S.IntroCard>
            <S.IntroTitle>로그인 후 투표 라운지를 이용할 수 있어요</S.IntroTitle>
            <S.IntroDescription>
              오늘의 질문과 역 일기 참여는 로그인 이후에 제공됩니다.
            </S.IntroDescription>
          </S.IntroCard>
          <S.HeaderRow>
            <StackFlow.Link activityName="SignInPage" activityParams={{}}>
              <S.PrimaryActionButton type="button">로그인하기</S.PrimaryActionButton>
            </StackFlow.Link>
          </S.HeaderRow>
        </S.Card>
      </S.Container>
    );
  }

  const hasFavoriteStation = selectedStationId != null && selectedLineId > 0;

  if (!hasFavoriteStation) {
    return (
      <S.Container>
        <b>오늘의 출퇴근/등하교 투표</b>
        <S.Card>
          <S.IntroCard>
            <S.IntroTitle>즐겨찾는 역 설정이 필요해요</S.IntroTitle>
            <S.IntroDescription>
              즐겨찾는 역을 등록하면 출퇴근/등하교 투표를 홈에서 바로 이어서 볼 수 있어요.
            </S.IntroDescription>
          </S.IntroCard>
          <S.HeaderRow>
            <StackFlow.Link activityName="SettingPage" activityParams={{}}>
              <S.PrimaryActionButton type="button">즐겨찾는 역 설정</S.PrimaryActionButton>
            </StackFlow.Link>
          </S.HeaderRow>
        </S.Card>
      </S.Container>
    );
  }

  const today = dailyVoteTodayQuery.data;
  const polls = [today?.primaryPoll, today?.secondaryPoll].filter(
    (poll): poll is DailyVotePollCard => poll != null,
  );
  const stationDiary = today?.stationDiary ?? null;
  const stationBoardPoll = polls[0] ?? null;

  const hubParams = {
    stationId: stationBoardPoll?.stationId ?? selectedStationId,
    stationName: stationBoardPoll?.stationName ?? selectedStation?.stationName,
    subwayLineId:
      stationBoardPoll?.subwayLineId ?? (selectedLineId > 0 ? selectedLineId : undefined),
    subwayLineName: stationBoardPoll?.subwayLineName ?? selectedLine?.subwayLineName,
  };

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

      <S.HeaderRow>
        <StackFlow.Link activityName="DailyVoteHubPage" activityParams={hubParams}>
          <S.PrimaryActionButton type="button">투표하러 가기</S.PrimaryActionButton>
        </StackFlow.Link>
      </S.HeaderRow>

      <S.Card>
        <S.IntroCard>
          <S.IntroTitle>홈에서는 요약만 보여드려요</S.IntroTitle>
          <S.IntroDescription>
            투표 선택/댓글 작성은 2단계 라운지 화면에서 진행해 더 읽기 쉽게 구성했습니다.
          </S.IntroDescription>
        </S.IntroCard>
        {dailyVoteTodayQuery.isLoading ? (
          <S.EmptyText>오늘의 투표를 불러오는 중입니다.</S.EmptyText>
        ) : null}
        {dailyVoteTodayQuery.isError ? (
          <>
            <S.ErrorText>오늘의 투표를 불러오지 못했습니다.</S.ErrorText>
            <S.HeaderRow>
              <S.DetailButton type="button" onClick={() => void dailyVoteTodayQuery.refetch()}>
                다시 시도
              </S.DetailButton>
            </S.HeaderRow>
          </>
        ) : null}
        {!dailyVoteTodayQuery.isLoading && !dailyVoteTodayQuery.isError && polls.length === 0 ? (
          <S.EmptyText>오늘 투표가 없습니다.</S.EmptyText>
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
            <S.OptionPreviewList>
              {poll.options.map(option => (
                <S.OptionPreviewItem
                  key={`${poll.pollId}-${option.optionCode}`}
                  selected={option.optionCode === poll.selectedOptionCode}
                >
                  <span>
                    {option.emoji} {option.label}
                  </span>
                  <span>
                    {option.voteCount}표 · {option.voteRatePercent}%
                  </span>
                </S.OptionPreviewItem>
              ))}
            </S.OptionPreviewList>
            <S.PollFooter>
              <S.TotalVoteText>총 참여 {poll.totalVoteCount}명</S.TotalVoteText>
              <StackFlow.Link
                activityName="DailyVoteHubPage"
                activityParams={{
                  stationId: poll.stationId,
                  stationName: poll.stationName,
                  subwayLineId: poll.subwayLineId,
                  subwayLineName: poll.subwayLineName,
                }}
              >
                <S.DetailButton type="button">라운지 이동</S.DetailButton>
              </StackFlow.Link>
            </S.PollFooter>
          </S.PollCard>
        ))}

        {stationDiaryContent}
      </S.Card>
    </S.Container>
  );
};

export default DailyVote;
