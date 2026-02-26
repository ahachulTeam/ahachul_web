import { API_PATHS } from '@ahhachul/http';

import type {
  ApiResponse,
  DailyVoteCommentsResult,
  DailyVotePollCard,
  DailyVoteStationPollsResult,
  DailyVoteTodayResult,
} from '@/types';

import { fetchClient } from './fetch-client';

type FetchDailyVoteTodayParams = {
  timezone?: string;
};

type VoteDailyPollPayload = {
  optionCode: 'LIKE' | 'DISLIKE';
};

type CreateDailyVoteCommentPayload = {
  content: string;
  imageUrls?: string[];
};

type FetchDailyVoteStationPollsParams = {
  sort?: 'latest' | 'popular';
  limit?: number;
  subwayLineId?: number;
};

type CreateDailyVoteStationPollPayload = {
  question: string;
  subwayLineId?: number;
};

export async function fetchDailyVoteTodayV2(
  params: FetchDailyVoteTodayParams = {},
): Promise<DailyVoteTodayResult> {
  const response = await fetchClient<ApiResponse<DailyVoteTodayResult>>(
    API_PATHS.dailyVote.todayV2,
    {
      params: {
        ...(params.timezone ? { timezone: params.timezone } : {}),
      },
    },
  );
  return response.result;
}

export async function voteDailyPollV2(
  pollId: number,
  payload: VoteDailyPollPayload,
): Promise<DailyVotePollCard> {
  const response = await fetchClient<ApiResponse<{ poll: DailyVotePollCard }>>(
    API_PATHS.dailyVote.votesV2(pollId),
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
  return response.result.poll;
}

export async function fetchDailyVoteStationPollsV2(
  stationId: number,
  params: FetchDailyVoteStationPollsParams = {},
): Promise<DailyVoteStationPollsResult> {
  const response = await fetchClient<ApiResponse<DailyVoteStationPollsResult>>(
    API_PATHS.dailyVote.stationPollsV2(stationId),
    {
      params: {
        ...(params.sort ? { sort: params.sort } : {}),
        ...(typeof params.limit === 'number' ? { limit: params.limit } : {}),
        ...(typeof params.subwayLineId === 'number' ? { subwayLineId: params.subwayLineId } : {}),
      },
    },
  );
  return response.result;
}

export async function createDailyVoteStationPollV2(
  stationId: number,
  payload: CreateDailyVoteStationPollPayload,
): Promise<{ pollId: number }> {
  const response = await fetchClient<ApiResponse<{ pollId: number }>>(
    API_PATHS.dailyVote.stationPollsV2(stationId),
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
  return response.result;
}

export async function deleteDailyVotePollV2(
  pollId: number,
): Promise<{ pollId: number; status: string }> {
  const response = await fetchClient<ApiResponse<{ pollId: number; status: string }>>(
    API_PATHS.dailyVote.pollV2(pollId),
    {
      method: 'DELETE',
    },
  );
  return response.result;
}

export async function fetchDailyVoteCommentsV2(
  pollId: number,
  sort: 'latest' | 'popular' = 'latest',
): Promise<DailyVoteCommentsResult> {
  const response = await fetchClient<ApiResponse<DailyVoteCommentsResult>>(
    API_PATHS.dailyVote.commentsV2(pollId),
    {
      params: { sort },
    },
  );
  return response.result;
}

export async function createDailyVoteCommentV2(
  pollId: number,
  payload: CreateDailyVoteCommentPayload,
): Promise<{ commentId: number }> {
  const response = await fetchClient<ApiResponse<{ commentId: number }>>(
    API_PATHS.dailyVote.commentsV2(pollId),
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
  return response.result;
}

export async function likeDailyVoteCommentV2(commentId: number): Promise<void> {
  await fetchClient<ApiResponse<null>>(API_PATHS.dailyVote.commentLikeV2(commentId), {
    method: 'POST',
  });
}

export async function unlikeDailyVoteCommentV2(commentId: number): Promise<void> {
  await fetchClient<ApiResponse<null>>(API_PATHS.dailyVote.commentLikeV2(commentId), {
    method: 'DELETE',
  });
}
