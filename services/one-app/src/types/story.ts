export type StoryItem = {
  storyId: number;
  imageUrl: string;
  caption: string | null;
  stationId: number | null;
  stationName: string | null;
  subwayLineId: number | null;
  subwayLineName: string | null;
  createdAt: string;
};

export type ProfileStories = {
  generatedAt: string;
  memberId: number;
  nickname: string | null;
  isMine: boolean;
  storiesVisible: boolean;
  stories: StoryItem[];
};
