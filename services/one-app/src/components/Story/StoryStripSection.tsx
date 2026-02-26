'use client';

import { useMemo, useRef, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@ahhachul/domain';

import { createActionLogger, resolveClientErrorMessage } from '@/lib/observability';
import { createStory, deleteStory, getMyStories, getUserStories } from '@/lib/stories';

type Props = {
  username?: string;
  asPublic?: boolean;
  editable?: boolean;
  title?: string;
  description?: string;
};

const storyLogger = createActionLogger('oneapp-story-strip');

function formatCreatedAt(value: string) {
  if (!value) {
    return '';
  }
  return value.replace('T', ' ').slice(0, 16);
}

export default function StoryStripSection({
  username,
  asPublic = false,
  editable = false,
  title = '스토리',
  description = '사진 스토리를 올리고 프로필에 기록을 남겨보세요.',
}: Props) {
  const queryClient = useQueryClient();
  const [caption, setCaption] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [viewerError, setViewerError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const myStoriesQuery = useQuery({
    queryKey: ['stories', 'me', 24],
    queryFn: () => getMyStories({ limit: 24 }),
    staleTime: QUERY_STALE_TIME.user,
    enabled: !username,
  });

  const profileStoriesQuery = useQuery({
    queryKey: ['stories', 'profile', username, asPublic, 24],
    queryFn: () => getUserStories(username ?? '', { asPublic, limit: 24 }),
    staleTime: QUERY_STALE_TIME.user,
    enabled: Boolean(username),
  });

  const activeQuery = username ? profileStoriesQuery : myStoriesQuery;
  const storiesResponse = activeQuery.data?.result;
  const stories = storiesResponse?.stories ?? [];
  const storiesVisible = storiesResponse?.storiesVisible ?? true;
  const isMine = storiesResponse?.isMine ?? editable;

  const createStoryMutation = useMutation({
    mutationFn: createStory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });

  const deleteStoryMutation = useMutation({
    mutationFn: deleteStory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });

  const selectedStory =
    selectedIndex == null || selectedIndex < 0 || selectedIndex >= stories.length
      ? null
      : stories[selectedIndex];

  const canUpload = useMemo(() => editable && !username, [editable, username]);

  const submitStory = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setUploadError('이미지 파일을 선택해주세요.');
      return;
    }

    if (caption.trim().length > 280) {
      setUploadError('캡션은 280자 이내로 입력해주세요.');
      return;
    }

    setUploadError(null);
    try {
      await createStoryMutation.mutateAsync({
        image: file,
        caption: caption.trim() || undefined,
      });
      setCaption('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      const message = resolveClientErrorMessage(
        error,
        '스토리 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.',
      );
      storyLogger.fail('create-story', error, undefined, message);
      setUploadError(message);
    }
  };

  const removeStory = async (storyId: number) => {
    setViewerError(null);
    try {
      await deleteStoryMutation.mutateAsync(storyId);
      setSelectedIndex(previous => {
        if (previous == null) {
          return previous;
        }
        return previous > 0 ? previous - 1 : null;
      });
    } catch (error) {
      const message = resolveClientErrorMessage(
        error,
        '스토리를 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.',
      );
      storyLogger.fail('delete-story', error, { storyId }, message);
      setViewerError(message);
    }
  };

  const moveStory = (offset: number) => {
    if (!stories.length || selectedIndex == null) {
      return;
    }
    const next = (selectedIndex + offset + stories.length) % stories.length;
    setSelectedIndex(next);
    setViewerError(null);
  };

  return (
    <article className="rounded-2xl border border-gray-30 bg-white p-4">
      <h3 className="text-title-small text-gray-100">{title}</h3>
      <p className="mt-1 text-body-small text-gray-70">{description}</p>

      {canUpload ? (
        <div className="mt-3 rounded-xl border border-gray-30 bg-gray-10 p-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="w-full text-body-small"
          />
          <textarea
            value={caption}
            maxLength={280}
            placeholder="오늘의 지하철 스토리를 남겨주세요."
            onChange={event => setCaption(event.target.value)}
            className="mt-2 min-h-[84px] w-full rounded-xl border border-gray-30 px-3 py-2 text-body-small text-gray-100"
          />
          <button
            type="button"
            onClick={() => void submitStory()}
            disabled={createStoryMutation.isPending}
            className="mt-2 inline-flex h-9 items-center rounded-lg bg-key-color px-3 text-label-medium text-white disabled:cursor-not-allowed disabled:bg-gray-70"
          >
            {createStoryMutation.isPending ? '업로드 중...' : '스토리 올리기'}
          </button>
          {uploadError ? <p className="mt-2 text-label-small text-danger">{uploadError}</p> : null}
        </div>
      ) : null}

      {activeQuery.isPending ? (
        <p className="mt-3 text-body-small text-gray-70">스토리를 불러오는 중입니다.</p>
      ) : null}
      {activeQuery.isError ? (
        <p className="mt-3 text-body-small text-danger">스토리를 불러오지 못했습니다.</p>
      ) : null}
      {!activeQuery.isPending && !activeQuery.isError && !storiesVisible ? (
        <p className="mt-3 text-body-small text-gray-70">
          이 사용자는 스토리를 비공개로 설정했습니다.
        </p>
      ) : null}
      {!activeQuery.isPending && !activeQuery.isError && storiesVisible && !stories.length ? (
        <p className="mt-3 text-body-small text-gray-70">아직 공개된 스토리가 없습니다.</p>
      ) : null}

      {storiesVisible && stories.length ? (
        <ul className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {stories.map((story, index) => (
            <li key={story.storyId} className="shrink-0">
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                className="flex w-[84px] flex-col items-center gap-1"
              >
                <span className="inline-flex h-[68px] w-[68px] rounded-full bg-key-color p-[2px]">
                  <span className="inline-flex h-full w-full rounded-full border-2 border-white bg-gray-20">
                    <img
                      src={story.imageUrl}
                      alt="story thumbnail"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </span>
                </span>
                <span className="w-full truncate text-center text-label-small text-gray-90">
                  {story.stationName ?? `스토리 ${story.storyId}`}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {selectedStory ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.72)] px-5 py-6">
          <div className="w-full max-w-[420px] overflow-hidden rounded-2xl bg-black">
            <div className="flex items-center justify-between px-3 py-2">
              <p className="text-label-small text-gray-20">
                {formatCreatedAt(selectedStory.createdAt)}
              </p>
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                className="rounded-full border border-gray-50 px-2 py-1 text-label-small text-white"
              >
                닫기
              </button>
            </div>
            <img
              src={selectedStory.imageUrl}
              alt="story image"
              className="h-[min(70vh,520px)] w-full object-cover"
            />
            <div className="space-y-1 px-3 py-2">
              {selectedStory.caption ? (
                <p className="text-body-small text-gray-10">{selectedStory.caption}</p>
              ) : null}
              <p className="text-label-small text-key-color">
                {selectedStory.stationName ?? '역 미지정'}
                {selectedStory.subwayLineName ? ` · ${selectedStory.subwayLineName}` : ''}
              </p>
            </div>
            <div className="flex gap-2 px-3 pb-3">
              <button
                type="button"
                onClick={() => moveStory(-1)}
                className="inline-flex h-9 items-center rounded-lg border border-gray-60 px-3 text-label-medium text-white"
              >
                이전
              </button>
              <button
                type="button"
                onClick={() => moveStory(1)}
                className="inline-flex h-9 items-center rounded-lg border border-gray-60 px-3 text-label-medium text-white"
              >
                다음
              </button>
              {isMine ? (
                <button
                  type="button"
                  onClick={() => void removeStory(selectedStory.storyId)}
                  disabled={deleteStoryMutation.isPending}
                  className="inline-flex h-9 items-center rounded-lg border border-danger px-3 text-label-medium text-danger"
                >
                  {deleteStoryMutation.isPending ? '삭제 중...' : '삭제'}
                </button>
              ) : null}
            </div>
            {viewerError ? (
              <p className="px-3 pb-3 text-label-small text-danger">{viewerError}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </article>
  );
}
