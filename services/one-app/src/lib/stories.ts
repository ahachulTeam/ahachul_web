import { API_PATHS } from '@ahhachul/http';

import type { ApiResponse, ProfileStories, PublicStories, StoryItem } from '@/types';

import { fetchClient } from './fetch-client';

type GetStoriesOptions = {
  limit?: number;
  asPublic?: boolean;
};

type CreateStoryPayload = {
  image: File;
  caption?: string;
  stationId?: number;
  subwayLineId?: number;
};

export async function getMyStories(options: GetStoriesOptions = {}) {
  const limit = options.limit ?? 24;
  return fetchClient<ApiResponse<ProfileStories>>(API_PATHS.story.myStoriesV2, {
    params: { limit },
  });
}

export async function getUserStories(username: string, options: GetStoriesOptions = {}) {
  const limit = options.limit ?? 24;
  const asPublic = options.asPublic ?? false;
  return fetchClient<ApiResponse<ProfileStories>>(API_PATHS.story.memberStoriesV2(username), {
    params: { asPublic, limit },
  });
}

export async function getPublicStories(
  options: {
    limit?: number;
    stationId?: number;
    subwayLineId?: number;
  } = {},
) {
  const limit = options.limit ?? 12;
  const params = {
    limit,
    ...(options.stationId ? { stationId: options.stationId } : {}),
    ...(options.subwayLineId ? { subwayLineId: options.subwayLineId } : {}),
  };

  return fetchClient<ApiResponse<PublicStories>>(API_PATHS.story.publicStoriesV2, {
    params,
  });
}

export async function createStory(payload: CreateStoryPayload) {
  const formData = new FormData();
  const content = {
    ...(payload.caption?.trim() ? { caption: payload.caption.trim() } : {}),
    ...(payload.stationId ? { stationId: payload.stationId } : {}),
    ...(payload.subwayLineId ? { subwayLineId: payload.subwayLineId } : {}),
  };

  formData.append('content', new Blob([JSON.stringify(content)], { type: 'application/json' }));
  formData.append('image', payload.image);

  return fetchClient<ApiResponse<{ story: StoryItem }>>(API_PATHS.story.createV2, {
    method: 'POST',
    body: formData,
  });
}

export async function deleteStory(storyId: number) {
  return fetchClient<ApiResponse<{ storyId: number; deleted: boolean }>>(
    API_PATHS.story.deleteV2(storyId),
    {
      method: 'DELETE',
    },
  );
}
