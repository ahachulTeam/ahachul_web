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
  const { isCheckingAuthState, authService } = useAuth();
  const { isLoading: isProfileLoading } = useFetchUserProfile();
  const { userStations } = useUserStationStore(state => state);

  const isAuthenticated = authService.isAuthenticated;
  const currentStation = userStations[0];
  const selectedStationId = currentStation?.stationId ?? 0;
  const selectedStationName = currentStation?.stationName ?? '역';
  const selectedLine = currentStation?.subwayLineInfoList?.[0];
  const selectedLineId = Number(selectedLine?.subwayLineId ?? 0);
  const selectedLineName = selectedLine?.subwayLineName ?? '호선';
  const hasFavoriteStation = selectedStationId > 0 && selectedLineId > 0;

  const stationHotPostsQuery = useQuery({
    queryKey: ['home', 'community-hot-posts', 'station', selectedStationId, selectedLineId],
    enabled: isAuthenticated && selectedStationId > 0 && selectedLineId > 0,
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
    enabled: isAuthenticated && selectedLineId > 0,
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

  if (isCheckingAuthState || isProfileLoading) {
    return (
      <S.Container>
        <b>커뮤니티 바로가기</b>
        <S.SectionCard>
          <S.SkeletonRow />
          <S.SkeletonRow short />
        </S.SectionCard>
      </S.Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <S.Container>
        <b>커뮤니티 바로가기</b>
        <S.SectionCard>
          <S.SectionTitle>로그인 후 인기글을 빠르게 확인하세요</S.SectionTitle>
          <S.EmptyText>역/호선 기반 커뮤니티 추천은 로그인 후 활성화됩니다.</S.EmptyText>
          <StackFlow.Link activityName="SignInPage" activityParams={{}}>
            <S.MoreButton type="button">로그인하기</S.MoreButton>
          </StackFlow.Link>
        </S.SectionCard>
      </S.Container>
    );
  }

  if (!hasFavoriteStation) {
    return (
      <S.Container>
        <b>커뮤니티 바로가기</b>
        <S.SectionCard>
          <S.SectionTitle>커뮤니티 바로가기</S.SectionTitle>
          <S.EmptyText>즐겨찾는 역을 설정하면 역/호선 인기글을 맞춤으로 보여드려요.</S.EmptyText>
          <S.EmptyText>설정 전에는 노선 공통 인기글을 확인할 수 있어요.</S.EmptyText>
          <StackFlow.Link activityName="SettingPage" activityParams={{}}>
            <S.MoreButton type="button">즐겨찾는 역 설정</S.MoreButton>
          </StackFlow.Link>
        </S.SectionCard>
      </S.Container>
    );
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
          <>
            <S.ErrorText>역 커뮤니티 인기글을 불러오지 못했습니다.</S.ErrorText>
            <S.MoreButton type="button" onClick={() => void stationHotPostsQuery.refetch()}>
              다시 시도
            </S.MoreButton>
          </>
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
          <>
            <S.ErrorText>호선 커뮤니티 인기글을 불러오지 못했습니다.</S.ErrorText>
            <S.MoreButton type="button" onClick={() => void lineHotPostsQuery.refetch()}>
              다시 시도
            </S.MoreButton>
          </>
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
