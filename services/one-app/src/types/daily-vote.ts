export type DailyVoteOption = {
  optionCode: string;
  label: string;
  emoji: string;
  voteCount: number;
  voteRatePercent: number;
};

export type DailyVotePollCard = {
  pollId: number;
  question: string;
  pollContext: 'COMMUTE' | 'SCHOOL';
  pollSlot: 'MORNING' | 'EVENING';
  stationId: number;
  stationName: string;
  subwayLineId: number;
  subwayLineName: string;
  isPrimary: boolean;
  voted: boolean;
  selectedOptionCode: string | null;
  totalVoteCount: number;
  options: DailyVoteOption[];
};

export type DailyVoteStationDiaryCard = {
  pollId: number;
  question: string;
  stationId: number;
  stationName: string;
  visible: boolean;
  commentCount: number;
};

export type DailyVoteTodayResult = {
  generatedAt: string;
  profileHint: string;
  primaryPoll: DailyVotePollCard | null;
  secondaryPoll: DailyVotePollCard | null;
  stationDiary: DailyVoteStationDiaryCard | null;
};

export type DailyVoteCommentItem = {
  commentId: number;
  writer: string;
  content: string;
  imageUrls: string[];
  likeCount: number;
  likedByMe: boolean;
  mine: boolean;
  createdAt: string;
};

export type DailyVoteCommentsResult = {
  pollId: number;
  sort: 'latest' | 'popular';
  comments: DailyVoteCommentItem[];
};
