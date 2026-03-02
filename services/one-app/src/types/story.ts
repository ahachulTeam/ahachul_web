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

export type PublicStoryItem = {
  storyId: number;
  memberId: number;
  nickname: string;
  imageUrl: string;
  caption: string | null;
  stationId: number | null;
  stationName: string | null;
  subwayLineId: number | null;
  subwayLineName: string | null;
  createdAt: string;
};

export type PublicStories = {
  generatedAt: string;
  stories: PublicStoryItem[];
};
