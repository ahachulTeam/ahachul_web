import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { QUERY_GC_TIME, QUERY_STALE_TIME } from '@ahhachul/domain';

import { fetchCommunityList } from '@/apis/request';
import { UiComponent } from '@/components';
import { useAuth } from '@/contexts';
import { useFetchUserProfile } from '@/services/user';
import { StackFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';
import { CommunityType } from '@/types';
import { createActionLogger } from '@/utils/observability';

import * as S from './CommunityHotPosts.styled';

const HOME_COMMUNITY_PREVIEW_LIMIT = 3;
const homeCommunityLogger = createActionLogger('home-community-hot-posts');

const CommunityHotPosts = () => {
  const { isCheckingAuthState } = useAuth();
  const { isLoading: isProfileLoading } = useFetchUserProfile();
  const { userStations } = useUserStationStore(state => state);

  const currentStation = userStations[0];
  const selectedStationId = currentStation?.stationId ?? 0;
  const selectedStationName = currentStation?.stationName ?? '역';
  const selectedLine = currentStation?.subwayLineInfoList[0];
  const selectedLineId = Number(selectedLine?.subwayLineId ?? 0);
  const selectedLineName = selectedLine?.subwayLineName ?? '호선';

  const stationHotPostsQuery = useQuery({
    queryKey: ['home', 'community-hot-posts', 'station', selectedStationId, selectedLineId],
    enabled: selectedStationId > 0 && selectedLineId > 0,
    queryFn: () =>
      fetchCommunityList({
        categoryType: CommunityType.HOT,
        stationId: selectedStationId,
        subwayLineIds: selectedLineId,
      }),
    staleTime: QUERY_STALE_TIME.feed,
    gcTime: QUERY_GC_TIME.feed,
  });

  const lineHotPostsQuery = useQuery({
    queryKey: ['home', 'community-hot-posts', 'line', selectedLineId],
    enabled: selectedLineId > 0,
    queryFn: () =>
      fetchCommunityList({
        categoryType: CommunityType.HOT,
        subwayLineIds: selectedLineId,
      }),
    staleTime: QUERY_STALE_TIME.feed,
    gcTime: QUERY_GC_TIME.feed,
  });

  useEffect(() => {
    if (!stationHotPostsQuery.error) {
      return;
    }

    homeCommunityLogger.fail(
      'load-station-hot-posts',
      stationHotPostsQuery.error,
      {
        selectedStationId,
        selectedLineId,
      },
      '홈 역 커뮤니티 인기글을 불러오지 못했습니다.',
    );
  }, [
    selectedLineId,
    selectedStationId,
    stationHotPostsQuery.error,
    stationHotPostsQuery.errorUpdatedAt,
  ]);

  useEffect(() => {
    if (!lineHotPostsQuery.error) {
      return;
    }

    homeCommunityLogger.fail(
      'load-line-hot-posts',
      lineHotPostsQuery.error,
      {
        selectedLineId,
      },
      '홈 호선 커뮤니티 인기글을 불러오지 못했습니다.',
    );
  }, [lineHotPostsQuery.error, lineHotPostsQuery.errorUpdatedAt, selectedLineId]);

  if (isCheckingAuthState || isProfileLoading || selectedLineId <= 0 || selectedStationId <= 0) {
    return null;
  }

  const stationPosts =
    stationHotPostsQuery.data?.result.data.slice(0, HOME_COMMUNITY_PREVIEW_LIMIT) ?? [];
  const linePosts =
    lineHotPostsQuery.data?.result.data.slice(0, HOME_COMMUNITY_PREVIEW_LIMIT) ?? [];

  return (
    <S.Container>
      <b>커뮤니티 바로가기</b>

      <S.SectionCard>
        <S.SectionHeader>
          <S.SectionTitle>{selectedStationName}역 커뮤니티 인기글</S.SectionTitle>
          <StackFlow.Link
            activityName="CommunityStationPage"
            activityParams={{
              stationId: selectedStationId,
              stationName: selectedStationName,
              subwayLineId: selectedLineId,
              lineName: selectedLineName,
            }}
          >
            <S.MoreButton type="button">더보기</S.MoreButton>
          </StackFlow.Link>
        </S.SectionHeader>

        {stationHotPostsQuery.isLoading ? <S.EmptyText>불러오는 중입니다.</S.EmptyText> : null}
        {stationHotPostsQuery.isError ? (
          <S.ErrorText>역 커뮤니티 인기글을 불러오지 못했습니다.</S.ErrorText>
        ) : null}
        {!stationHotPostsQuery.isLoading &&
        !stationHotPostsQuery.isError &&
        !stationPosts.length ? (
          <S.EmptyText>해당 역 인기글이 아직 없습니다.</S.EmptyText>
        ) : null}
        {!stationHotPostsQuery.isLoading &&
        !stationHotPostsQuery.isError &&
        stationPosts.length > 0 ? (
          <S.PostList>
            {stationPosts.map(post => (
              <S.PostItem key={`home-station-hot-post-${post.id}`}>
                <StackFlow.Link activityName="CommunityDetailPage" activityParams={{ id: post.id }}>
                  <UiComponent.ListItem post={post} />
                </StackFlow.Link>
              </S.PostItem>
            ))}
          </S.PostList>
        ) : null}
      </S.SectionCard>

      <S.SectionCard>
        <S.SectionHeader>
          <S.SectionTitle>{selectedLineName} 커뮤니티 인기글</S.SectionTitle>
          <StackFlow.Link
            activityName="CommunityLinePage"
            activityParams={{
              subwayLineId: selectedLineId,
              lineName: selectedLineName,
            }}
          >
            <S.MoreButton type="button">더보기</S.MoreButton>
          </StackFlow.Link>
        </S.SectionHeader>

        {lineHotPostsQuery.isLoading ? <S.EmptyText>불러오는 중입니다.</S.EmptyText> : null}
        {lineHotPostsQuery.isError ? (
          <S.ErrorText>호선 커뮤니티 인기글을 불러오지 못했습니다.</S.ErrorText>
        ) : null}
        {!lineHotPostsQuery.isLoading && !lineHotPostsQuery.isError && !linePosts.length ? (
          <S.EmptyText>해당 호선 인기글이 아직 없습니다.</S.EmptyText>
        ) : null}
        {!lineHotPostsQuery.isLoading && !lineHotPostsQuery.isError && linePosts.length > 0 ? (
          <S.PostList>
            {linePosts.map(post => (
              <S.PostItem key={`home-line-hot-post-${post.id}`}>
                <StackFlow.Link activityName="CommunityDetailPage" activityParams={{ id: post.id }}>
                  <UiComponent.ListItem post={post} />
                </StackFlow.Link>
              </S.PostItem>
            ))}
          </S.PostList>
        ) : null}
      </S.SectionCard>
    </S.Container>
  );
};

export default CommunityHotPosts;
