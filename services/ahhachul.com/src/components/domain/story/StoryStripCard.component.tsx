import { useMemo, useRef, useState } from 'react';

import styled from '@emotion/styled';

import {
  useCreateStoryV2,
  useDeleteStoryV2,
  useFetchMyStoriesV2,
  useFetchProfileStoriesV2,
  useFetchUserFavoriteStations,
} from '@/services/user';
import { createActionLogger, resolveClientErrorMessage } from '@/utils/observability';

type Props = {
  username?: string;
  asPublic?: boolean;
  editable?: boolean;
  title?: string;
  description?: string;
};

const storyLogger = createActionLogger('story-strip-card');

function formatCreatedAt(value: string) {
  if (!value) {
    return '';
  }
  return value.replace('T', ' ').slice(0, 16);
}

export default function StoryStripCard({
  username,
  asPublic = false,
  editable = false,
  title = '스토리',
  description = '사진 스토리를 올리고 프로필에 기록을 남겨보세요.',
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [caption, setCaption] = useState('');
  const [selectedStationId, setSelectedStationId] = useState<string>('');
  const [selectedSubwayLineId, setSelectedSubwayLineId] = useState<string>('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [viewerError, setViewerError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const myStoriesQuery = useFetchMyStoriesV2(24, !username);
  const profileStoriesQuery = useFetchProfileStoriesV2(username ?? '', {
    asPublic,
    limit: 24,
    enabled: Boolean(username),
  });
  const favoriteStationsQuery = useFetchUserFavoriteStations();

  const activeQuery = username ? profileStoriesQuery : myStoriesQuery;
  const createStoryMutation = useCreateStoryV2();
  const deleteStoryMutation = useDeleteStoryV2();

  const storiesResponse = activeQuery.data?.result;
  const stories = storiesResponse?.stories ?? [];
  const storiesVisible = storiesResponse?.storiesVisible ?? true;
  const isMine = storiesResponse?.isMine ?? editable;

  const stationOptions = useMemo(() => {
    const stationInfoList = favoriteStationsQuery.data?.result.stationInfoList ?? [];
    return stationInfoList.map(station => ({
      stationId: station.stationId,
      stationName: station.stationName,
      subwayLineInfoList: station.subwayLineInfoList ?? [],
    }));
  }, [favoriteStationsQuery.data?.result.stationInfoList]);

  const selectedStory =
    selectedIndex == null || selectedIndex < 0 || selectedIndex >= stories.length
      ? null
      : stories[selectedIndex];

  const submitStory = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setUploadError('이미지 파일을 선택해주세요.');
      return;
    }

    const trimmedCaption = caption.trim();
    if (trimmedCaption.length > 280) {
      setUploadError('캡션은 280자 이내로 입력해주세요.');
      return;
    }

    setUploadError(null);
    try {
      await createStoryMutation.mutateAsync({
        image: file,
        caption: trimmedCaption || undefined,
        stationId: selectedStationId ? Number(selectedStationId) : undefined,
        subwayLineId: selectedSubwayLineId ? Number(selectedSubwayLineId) : undefined,
      });

      setCaption('');
      setSelectedStationId('');
      setSelectedSubwayLineId('');
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
    <Card>
      <Header>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </Header>

      {editable ? (
        <UploadBox>
          <input ref={fileInputRef} type="file" accept="image/*" />
          <textarea
            value={caption}
            maxLength={280}
            placeholder="오늘의 지하철 스토리를 남겨주세요."
            onChange={event => setCaption(event.target.value)}
          />
          <Selectors>
            <select
              value={selectedStationId}
              onChange={event => {
                const nextStationId = event.target.value;
                setSelectedStationId(nextStationId);

                const station = stationOptions.find(
                  option => String(option.stationId) === nextStationId,
                );
                const firstLineId = station?.subwayLineInfoList[0]?.subwayLineId;
                setSelectedSubwayLineId(firstLineId ? String(firstLineId) : '');
              }}
            >
              <option value="">역 선택 (선택)</option>
              {stationOptions.map(option => (
                <option key={`story-station-${option.stationId}`} value={option.stationId}>
                  {option.stationName}
                </option>
              ))}
            </select>
            <select
              value={selectedSubwayLineId}
              onChange={event => setSelectedSubwayLineId(event.target.value)}
            >
              <option value="">노선 선택 (선택)</option>
              {stationOptions
                .find(option => String(option.stationId) === selectedStationId)
                ?.subwayLineInfoList.map(line => (
                  <option key={`story-line-${line.subwayLineId}`} value={line.subwayLineId}>
                    {line.subwayLineName}
                  </option>
                ))}
            </select>
          </Selectors>
          <button
            type="button"
            onClick={() => void submitStory()}
            disabled={createStoryMutation.isPending}
          >
            {createStoryMutation.isPending ? '업로드 중...' : '스토리 올리기'}
          </button>
          {uploadError ? <ErrorText>{uploadError}</ErrorText> : null}
        </UploadBox>
      ) : null}

      {activeQuery.isLoading ? <StateText>스토리를 불러오는 중입니다.</StateText> : null}
      {activeQuery.isError ? (
        <StateText>스토리를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</StateText>
      ) : null}
      {!activeQuery.isLoading && !activeQuery.isError && !storiesVisible ? (
        <StateText>이 사용자는 스토리를 비공개로 설정했습니다.</StateText>
      ) : null}
      {!activeQuery.isLoading && !activeQuery.isError && storiesVisible && !stories.length ? (
        <StateText>아직 공개된 스토리가 없습니다.</StateText>
      ) : null}

      {storiesVisible && stories.length ? (
        <StoryList>
          {stories.map((story, index) => (
            <li key={story.storyId}>
              <StoryButton type="button" onClick={() => setSelectedIndex(index)}>
                <StoryRing>
                  <img src={story.imageUrl} alt="story thumbnail" />
                </StoryRing>
                <span>{story.stationName ?? `스토리 ${story.storyId}`}</span>
              </StoryButton>
            </li>
          ))}
        </StoryList>
      ) : null}

      {selectedStory ? (
        <ViewerOverlay>
          <ViewerCard>
            <ViewerTop>
              <p>{formatCreatedAt(selectedStory.createdAt)}</p>
              <button type="button" onClick={() => setSelectedIndex(null)}>
                닫기
              </button>
            </ViewerTop>

            <ViewerImage src={selectedStory.imageUrl} alt="story image" />

            <ViewerMeta>
              {selectedStory.caption ? <p>{selectedStory.caption}</p> : null}
              <small>
                {selectedStory.stationName ?? '역 미지정'}
                {selectedStory.subwayLineName ? ` · ${selectedStory.subwayLineName}` : ''}
              </small>
            </ViewerMeta>

            <ViewerControls>
              <button type="button" onClick={() => moveStory(-1)}>
                이전
              </button>
              <button type="button" onClick={() => moveStory(1)}>
                다음
              </button>
              {isMine ? (
                <button
                  type="button"
                  className="danger"
                  onClick={() => void removeStory(selectedStory.storyId)}
                  disabled={deleteStoryMutation.isPending}
                >
                  {deleteStoryMutation.isPending ? '삭제 중...' : '삭제'}
                </button>
              ) : null}
            </ViewerControls>
            {viewerError ? <ErrorText>{viewerError}</ErrorText> : null}
          </ViewerCard>
        </ViewerOverlay>
      ) : null}
    </Card>
  );
}

const Card = styled.article`
  width: 100%;
  border: 1px solid var(--ah-color-legacy-border-soft);
  border-radius: 8px;
  padding: 16px;
  background: #fff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;

  h3 {
    color: var(--ah-color-legacy-text-strong);
    font-size: 16px;
    font-weight: 700;
  }

  p {
    margin-top: 6px;
    color: var(--ah-color-legacy-text-muted);
    font-size: 13px;
  }
`;

const UploadBox = styled.div`
  margin-top: 12px;
  border: 1px solid var(--ah-color-legacy-border-soft);
  border-radius: 12px;
  padding: 12px;
  background: #f8fafb;

  input[type='file'] {
    width: 100%;
  }

  textarea {
    margin-top: 8px;
    width: 100%;
    min-height: 78px;
    resize: vertical;
    border: 1px solid var(--ah-color-legacy-border-soft);
    border-radius: 8px;
    padding: 8px;
    font-size: 13px;
    color: var(--ah-color-legacy-text-strong);
  }

  button {
    margin-top: 8px;
    min-width: 108px;
    height: 34px;
    border: none;
    border-radius: 8px;
    background: var(--ah-color-legacy-surface-brand-tint-strong);
    color: #fff;
    font-size: 13px;
    font-weight: 600;
  }
`;

const Selectors = styled.div`
  margin-top: 8px;
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  select {
    height: 34px;
    border-radius: 8px;
    border: 1px solid var(--ah-color-legacy-border-soft);
    padding: 0 8px;
    font-size: 13px;
  }
`;

const StateText = styled.p`
  margin-top: 10px;
  color: var(--ah-color-legacy-text-muted);
  font-size: 13px;
`;

const ErrorText = styled.p`
  margin-top: 8px;
  color: var(--ah-color-legacy-status-negative);
  font-size: 12px;
`;

const StoryList = styled.ul`
  margin-top: 14px;
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;

  li {
    flex: 0 0 auto;
  }
`;

const StoryButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 82px;

  span {
    width: 100%;
    color: var(--ah-color-legacy-text-strong);
    font-size: 11px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StoryRing = styled.span`
  width: 68px;
  height: 68px;
  border-radius: 9999px;
  padding: 2px;
  background: linear-gradient(145deg, #34d399, #22c55e, #60a5fa);
  display: inline-flex;

  img {
    width: 100%;
    height: 100%;
    border-radius: 9999px;
    object-fit: cover;
    border: 2px solid #fff;
    background: #d1d5db;
  }
`;

const ViewerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.68);
  z-index: 70;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ViewerCard = styled.div`
  width: min(420px, 100%);
  max-height: 92vh;
  border-radius: 20px;
  background: #111827;
  overflow: hidden;
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.36);
`;

const ViewerTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;

  p {
    color: #d1d5db;
    font-size: 12px;
  }

  button {
    border: none;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.18);
    color: #fff;
    padding: 4px 10px;
    font-size: 12px;
  }
`;

const ViewerImage = styled.img`
  width: 100%;
  height: min(68vh, 480px);
  object-fit: cover;
  background: #0b1220;
`;

const ViewerMeta = styled.div`
  padding: 10px 12px 4px;

  p {
    color: #f9fafb;
    font-size: 14px;
    line-height: 20px;
    white-space: pre-wrap;
  }

  small {
    margin-top: 6px;
    display: inline-block;
    color: #93c5fd;
    font-size: 12px;
  }
`;

const ViewerControls = styled.div`
  padding: 8px 12px 12px;
  display: flex;
  gap: 8px;

  button {
    height: 34px;
    min-width: 68px;
    border: 1px solid rgba(255, 255, 255, 0.26);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.08);
    color: #f9fafb;
    font-size: 12px;
    font-weight: 600;
  }

  .danger {
    border-color: rgba(248, 113, 113, 0.58);
    background: rgba(248, 113, 113, 0.2);
  }
`;
