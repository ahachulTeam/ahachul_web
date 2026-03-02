import { useEffect, useState } from 'react';

import { useFetchPublicStoriesV2 } from '@/services/user';
import { StackFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';
import { createActionLogger } from '@/utils/observability';

import * as S from './StoryFeed.styled';

const HOME_STORY_LIMIT = 12;
const homeStoryLogger = createActionLogger('home-story-feed');

const StoryFeed = () => {
  const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);
  const { userStations } = useUserStationStore();

  const currentStation = userStations[0];
  const stationId = currentStation?.stationId ?? 0;
  const stationName = currentStation?.stationName ?? '';
  const subwayLineId = Number(currentStation?.subwayLineInfoList?.[0]?.subwayLineId ?? 0);
  const subwayLineName = currentStation?.subwayLineInfoList?.[0]?.subwayLineName ?? '';

  const publicStoriesQuery = useFetchPublicStoriesV2({
    limit: HOME_STORY_LIMIT,
    stationId: stationId > 0 ? stationId : undefined,
    subwayLineId: subwayLineId > 0 ? subwayLineId : undefined,
    enabled: true,
  });

  useEffect(() => {
    if (!publicStoriesQuery.error) {
      return;
    }

    homeStoryLogger.fail(
      'load-public-stories',
      publicStoriesQuery.error,
      {
        stationId,
        subwayLineId,
      },
      '홈 공개 스토리 피드를 불러오지 못했습니다.',
    );
  }, [publicStoriesQuery.error, publicStoriesQuery.errorUpdatedAt, stationId, subwayLineId]);

  const stories = publicStoriesQuery.data?.result.stories ?? [];
  const selectedStory = stories.find(story => story.storyId === selectedStoryId) ?? null;
  const title =
    stationId > 0 && subwayLineId > 0
      ? `${stationName} ${subwayLineName} 스토리`
      : '지금 공유되는 스토리';

  return (
    <S.Container>
      <S.Header>
        <div>
          <b>스토리 피드</b>
          <S.Title>{title}</S.Title>
        </div>
        <StackFlow.Link activityName="MyPage" activityParams={{}}>
          <S.MoreButton type="button">내 스토리 관리</S.MoreButton>
        </StackFlow.Link>
      </S.Header>

      {publicStoriesQuery.isLoading ? <S.StateText>스토리를 불러오는 중입니다.</S.StateText> : null}
      {publicStoriesQuery.isError ? (
        <S.ErrorText>스토리를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</S.ErrorText>
      ) : null}
      {!publicStoriesQuery.isLoading && !publicStoriesQuery.isError && !stories.length ? (
        <S.StateText>아직 공유된 스토리가 없습니다. 첫 번째 스토리를 올려보세요.</S.StateText>
      ) : null}

      {!publicStoriesQuery.isLoading && !publicStoriesQuery.isError && stories.length > 0 ? (
        <S.StoryList>
          {stories.map(story => (
            <li key={`home-story-${story.storyId}`}>
              <S.StoryButton type="button" onClick={() => setSelectedStoryId(story.storyId)}>
                <S.StoryRing>
                  <img src={story.imageUrl} alt={`${story.nickname} 스토리`} />
                </S.StoryRing>
                <S.Nickname>{story.nickname}</S.Nickname>
                <S.Meta>{story.stationName ?? '역 미지정'}</S.Meta>
              </S.StoryButton>
            </li>
          ))}
        </S.StoryList>
      ) : null}

      {selectedStory ? (
        <S.ViewerOverlay>
          <S.ViewerCard>
            <S.ViewerTop>
              <div>
                <b>{selectedStory.nickname}</b>
                <p>{selectedStory.stationName ?? '역 미지정'}</p>
              </div>
              <button type="button" onClick={() => setSelectedStoryId(null)}>
                닫기
              </button>
            </S.ViewerTop>
            <S.ViewerImage src={selectedStory.imageUrl} alt="story preview" />
            <S.ViewerCaption>{selectedStory.caption ?? '캡션 없음'}</S.ViewerCaption>
            <S.ViewerActions>
              <StackFlow.Link
                activityName="UserProfilePage"
                activityParams={{ username: selectedStory.nickname }}
              >
                <button type="button">작성자 프로필 보기</button>
              </StackFlow.Link>
            </S.ViewerActions>
          </S.ViewerCard>
        </S.ViewerOverlay>
      ) : null}
    </S.Container>
  );
};

export default StoryFeed;
