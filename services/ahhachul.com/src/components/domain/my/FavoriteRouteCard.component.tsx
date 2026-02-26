import { useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import { normalizeInputText } from '@ahhachul/utils';

import { useToast } from '@/hooks/useToast';
import {
  useCreateUserFavoriteRoute,
  useDeleteUserFavoriteRoute,
  useFetchUserFavoriteRouteRecommendations,
  useFetchUserFavoriteRoutes,
  useFetchUserRouteConnectionRecommendations,
  useFetchUserFavoriteStations,
} from '@/services/user';
import { useFlow } from '@/stackflow';
import type { FavoriteRouteDto, RouteConnectionRecommendationDto } from '@/types';
import { createActionLogger, resolveClientErrorMessage } from '@/utils/observability';

const RECOMMENDATION_LIMIT = 3;
const favoriteRouteLogger = createActionLogger('favorite-route-card');

const FavoriteRouteCard = () => {
  const { addToast } = useToast();
  const { push } = useFlow();
  const { data: stationResponse } = useFetchUserFavoriteStations();
  const {
    data: recommendationResponse,
    isLoading: isRecommendationLoading,
    isError: isRecommendationError,
    refetch: refetchRecommendations,
  } = useFetchUserFavoriteRouteRecommendations(RECOMMENDATION_LIMIT);
  const {
    data: routeResponse,
    isLoading: isRouteLoading,
    isError: isRouteError,
    refetch: refetchRoutes,
  } = useFetchUserFavoriteRoutes();
  const {
    data: routeConnectionResponse,
    isLoading: isRouteConnectionLoading,
    isError: isRouteConnectionError,
    refetch: refetchRouteConnections,
  } = useFetchUserRouteConnectionRecommendations({ limit: 12, groupLimit: 4 });
  const createRouteMutation = useCreateUserFavoriteRoute();
  const deleteRouteMutation = useDeleteUserFavoriteRoute();

  const [sourceStationId, setSourceStationId] = useState<number | null>(null);
  const [destinationStationId, setDestinationStationId] = useState<number | null>(null);
  const [titleDraft, setTitleDraft] = useState('');

  const stationOptions = useMemo(() => {
    return (stationResponse?.result.stationInfoList ?? []).map(station => ({
      stationId: station.stationId,
      stationName: station.stationName,
    }));
  }, [stationResponse?.result.stationInfoList]);

  useEffect(() => {
    if (stationOptions.length < 2) {
      setSourceStationId(stationOptions[0]?.stationId ?? null);
      setDestinationStationId(null);
      return;
    }

    setSourceStationId(previous => previous ?? stationOptions[0].stationId);
    setDestinationStationId(previous => {
      if (previous != null && previous !== sourceStationId) {
        return previous;
      }

      const next = stationOptions.find(
        station => station.stationId !== stationOptions[0].stationId,
      );
      return next?.stationId ?? null;
    });
  }, [sourceStationId, stationOptions]);

  const recommendedRoutes = recommendationResponse?.result.routes ?? [];
  const favoriteRoutes = routeResponse?.result.routes ?? [];
  const routeConnections = routeConnectionResponse?.result.recommendations ?? [];
  const routeConnectionGroups = routeConnectionResponse?.result.groups ?? [];

  const refreshAll = () => {
    favoriteRouteLogger.info('manual-refresh', {
      recommendationCount: recommendedRoutes.length,
      routeCount: favoriteRoutes.length,
      routeConnectionCount: routeConnections.length,
    });
    void refetchRecommendations();
    void refetchRoutes();
    void refetchRouteConnections();
  };

  const saveFavoriteRoute = async () => {
    if (stationOptions.length < 2) {
      addToast('즐겨찾는 역을 2개 이상 등록하면 경로를 저장할 수 있습니다.', 'info');
      return;
    }

    if (!sourceStationId || !destinationStationId || sourceStationId === destinationStationId) {
      addToast('출발역과 도착역을 서로 다르게 선택해주세요.', 'error');
      return;
    }

    try {
      await createRouteMutation.mutateAsync({
        sourceStationId,
        destinationStationId,
        title: normalizeInputText(titleDraft) || undefined,
      });
      setTitleDraft('');
      addToast('즐겨찾기 경로를 저장했습니다.', 'success');
    } catch (error) {
      const message = resolveClientErrorMessage(
        error,
        '즐겨찾기 경로 저장에 실패했습니다. 잠시 후 다시 시도해주세요.',
      );
      favoriteRouteLogger.fail(
        'save-route',
        error,
        {
          sourceStationId,
          destinationStationId,
          hasTitle: normalizeInputText(titleDraft).length > 0,
        },
        message,
      );
      addToast(message, 'error');
    }
  };

  const removeFavoriteRoute = async (routeId: number | null) => {
    if (!routeId) {
      addToast('추천 경로는 삭제할 수 없습니다.', 'info');
      return;
    }

    try {
      await deleteRouteMutation.mutateAsync(routeId);
      addToast('즐겨찾기 경로를 삭제했습니다.', 'success');
    } catch (error) {
      const message = resolveClientErrorMessage(
        error,
        '즐겨찾기 경로 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.',
      );
      favoriteRouteLogger.fail(
        'delete-route',
        error,
        {
          routeId,
        },
        message,
      );
      addToast(message, 'error');
    }
  };

  const renderRoute = (route: FavoriteRouteDto, keyPrefix: string, canDelete: boolean) => {
    const title = route.title || `${route.sourceStationName} → ${route.destinationStationName}`;

    return (
      <RouteCard key={`${keyPrefix}-${route.routeId ?? title}`}>
        <RouteHeader>
          <p>{title}</p>
          {canDelete ? (
            <button
              type="button"
              onClick={() => void removeFavoriteRoute(route.routeId)}
              disabled={deleteRouteMutation.isPending}
            >
              삭제
            </button>
          ) : null}
        </RouteHeader>
        <RouteSummary>
          정거장 {route.summary.totalStops} · 환승 {route.summary.transferCount} · 예상{' '}
          {route.summary.estimatedMinutes}분
        </RouteSummary>
        <RouteNodes>
          {route.nodes.map((node, index) => (
            <NodePill
              key={`${keyPrefix}-node-${route.routeId ?? title}-${node.stationId}-${index}`}
            >
              <span className="name">{node.stationName}</span>
              {route.edges[index] ? (
                <span className="line">{route.edges[index].subwayLineName} →</span>
              ) : null}
            </NodePill>
          ))}
        </RouteNodes>
      </RouteCard>
    );
  };

  const startConversation = (targetMemberId: number) => {
    push('TalkSettingPage', {
      targetMemberId: String(targetMemberId),
    });
  };

  const renderRouteConnection = (connection: RouteConnectionRecommendationDto) => {
    return (
      <RouteCard key={`route-connection-${connection.memberId}-${connection.routeId ?? 'none'}`}>
        <RouteHeader>
          <p>{connection.nickname}</p>
          <RouteConnectionBadge>매칭 {connection.matchScore}점</RouteConnectionBadge>
        </RouteHeader>
        <RouteSummary>
          {connection.sourceStationName} → {connection.destinationStationName}
        </RouteSummary>
        <RouteSummary>{connection.reason}</RouteSummary>
        <RouteSummary>
          정거장 차이 {connection.totalDistance} · 추정 {connection.estimatedMinutes}분
        </RouteSummary>
        <RouteConnectionActionButton
          type="button"
          onClick={() => startConversation(connection.memberId)}
        >
          쪽지 보내기
        </RouteConnectionActionButton>
      </RouteCard>
    );
  };

  return (
    <Wrapper>
      <Header>
        <h3>즐겨찾기 경로</h3>
        <button type="button" onClick={refreshAll}>
          새로고침
        </button>
      </Header>
      <Description>
        즐겨찾는 역 기반 추천 경로를 확인하고, 자주 이동하는 경로를 직접 저장할 수 있습니다.
      </Description>

      <CreatePanel>
        <select
          value={String(sourceStationId ?? 0)}
          onChange={event => setSourceStationId(Number(event.target.value) || null)}
        >
          {stationOptions.length ? (
            stationOptions.map(station => (
              <option key={`source-${station.stationId}`} value={station.stationId}>
                출발: {station.stationName}
              </option>
            ))
          ) : (
            <option value={0}>출발역 없음</option>
          )}
        </select>
        <select
          value={String(destinationStationId ?? 0)}
          onChange={event => setDestinationStationId(Number(event.target.value) || null)}
        >
          {stationOptions.length ? (
            stationOptions.map(station => (
              <option key={`destination-${station.stationId}`} value={station.stationId}>
                도착: {station.stationName}
              </option>
            ))
          ) : (
            <option value={0}>도착역 없음</option>
          )}
        </select>
        <input
          value={titleDraft}
          onChange={event => setTitleDraft(event.target.value)}
          placeholder="경로 별칭(선택)"
          maxLength={50}
        />
        <button
          type="button"
          onClick={() => void saveFavoriteRoute()}
          disabled={createRouteMutation.isPending}
        >
          {createRouteMutation.isPending ? '저장 중...' : '경로 저장'}
        </button>
      </CreatePanel>

      <RouteSections>
        <section>
          <h4>추천 경로</h4>
          {isRecommendationLoading ? <StateText>추천 경로를 불러오는 중입니다.</StateText> : null}
          {isRecommendationError ? <StateText>추천 경로를 불러오지 못했습니다.</StateText> : null}
          {!isRecommendationLoading && !isRecommendationError && !recommendedRoutes.length ? (
            <StateText>추천 경로가 없습니다. 즐겨찾는 역을 2개 이상 등록해보세요.</StateText>
          ) : null}
          {!isRecommendationLoading && !isRecommendationError
            ? recommendedRoutes.map(route => renderRoute(route, 'recommended', false))
            : null}
        </section>

        <section>
          <h4>내가 저장한 경로</h4>
          {isRouteLoading ? <StateText>저장한 경로를 불러오는 중입니다.</StateText> : null}
          {isRouteError ? <StateText>저장한 경로를 불러오지 못했습니다.</StateText> : null}
          {!isRouteLoading && !isRouteError && !favoriteRoutes.length ? (
            <StateText>아직 저장한 경로가 없습니다.</StateText>
          ) : null}
          {!isRouteLoading && !isRouteError
            ? favoriteRoutes.map(route => renderRoute(route, 'custom', true))
            : null}
        </section>
      </RouteSections>

      <RouteConnectionSection>
        <h4>경로 기반 인맥 추천</h4>
        <p>출발/도착역이 비슷한 사용자를 그룹으로 묶어 추천합니다.</p>
        {isRouteConnectionLoading ? (
          <StateText>비슷한 경로 사용자를 찾는 중입니다.</StateText>
        ) : null}
        {isRouteConnectionError ? (
          <StateText>인맥 추천 정보를 불러오지 못했습니다.</StateText>
        ) : null}
        {!isRouteConnectionLoading && !isRouteConnectionError && !routeConnections.length ? (
          <StateText>
            조건에 맞는 경로 사용자가 아직 없습니다. 즐겨찾기 경로를 저장하면 추천 정확도가
            올라갑니다.
          </StateText>
        ) : null}
        {!isRouteConnectionLoading && !isRouteConnectionError
          ? routeConnections.map(renderRouteConnection)
          : null}
        {!isRouteConnectionLoading && !isRouteConnectionError && routeConnectionGroups.length ? (
          <RouteConnectionGroupList>
            {routeConnectionGroups.map(group => (
              <li key={`route-connection-group-${group.groupId}`}>
                {group.sourceStationName} → {group.destinationStationName} · {group.memberCount}명
              </li>
            ))}
          </RouteConnectionGroupList>
        ) : null}
      </RouteConnectionSection>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 100%;
  border: 1px solid var(--ah-color-legacy-border-soft);
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 16px;
    font-weight: 700;
    color: var(--ah-color-legacy-text-strong);
  }

  button {
    border: 1px solid var(--ah-color-legacy-border-soft);
    border-radius: 6px;
    background: #fff;
    height: 30px;
    padding: 0 10px;
    color: var(--ah-color-legacy-text-body);
  }
`;

const Description = styled.p`
  margin-top: 8px;
  font-size: 13px;
  color: var(--ah-color-legacy-text-muted);
`;

const CreatePanel = styled.div`
  margin-top: 12px;
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr;

  select,
  input {
    width: 100%;
    height: 36px;
    border: 1px solid var(--ah-color-legacy-border-soft);
    border-radius: 8px;
    padding: 0 10px;
    background: #fff;
    color: var(--ah-color-legacy-text-strong);
  }

  button {
    height: 36px;
    border: none;
    border-radius: 8px;
    background: var(--ah-color-legacy-surface-brand-tint-strong);
    color: #fff;
    font-weight: 600;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const RouteSections = styled.div`
  margin-top: 12px;
  display: grid;
  gap: 12px;

  section {
    background: var(--ah-color-legacy-surface-subtle);
    border-radius: 8px;
    padding: 12px;
  }

  h4 {
    font-size: 14px;
    font-weight: 700;
    color: var(--ah-color-legacy-text-strong);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const RouteConnectionSection = styled.section`
  margin-top: 12px;
  background: var(--ah-color-legacy-surface-subtle);
  border-radius: 8px;
  padding: 12px;

  h4 {
    font-size: 14px;
    font-weight: 700;
    color: var(--ah-color-legacy-text-strong);
  }

  p {
    margin-top: 4px;
    font-size: 13px;
    color: var(--ah-color-legacy-text-muted);
  }
`;

const RouteConnectionGroupList = styled.ul`
  margin-top: 8px;
  display: grid;
  gap: 6px;
  list-style: none;
  padding: 0;

  li {
    border-radius: 8px;
    border: 1px solid var(--ah-color-legacy-border-soft);
    background: #fff;
    padding: 8px 10px;
    font-size: 12px;
    color: var(--ah-color-legacy-text-body);
  }
`;

const RouteCard = styled.div`
  margin-top: 8px;
  border: 1px solid var(--ah-color-legacy-border-soft);
  border-radius: 8px;
  background: #fff;
  padding: 10px;
`;

const RouteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  p {
    font-size: 13px;
    font-weight: 600;
    color: var(--ah-color-legacy-text-strong);
  }

  button {
    border: 1px solid var(--ah-color-legacy-border-soft);
    border-radius: 6px;
    background: #fff;
    padding: 2px 8px;
    font-size: 12px;
    color: var(--ah-color-legacy-text-body);
  }
`;

const RouteSummary = styled.p`
  margin-top: 6px;
  font-size: 12px;
  color: var(--ah-color-legacy-text-muted);
`;

const RouteConnectionBadge = styled.span`
  border-radius: 9999px;
  background: var(--ah-color-legacy-surface-brand-tint-subtle);
  color: var(--ah-color-legacy-surface-brand-tint-strong);
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
`;

const RouteConnectionActionButton = styled.button`
  margin-top: 8px;
  border: 1px solid var(--ah-color-legacy-border-soft);
  border-radius: 8px;
  background: #fff;
  color: var(--ah-color-legacy-text-body);
  font-size: 12px;
  font-weight: 600;
  padding: 6px 10px;
`;

const RouteNodes = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const NodePill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 1px solid var(--ah-color-legacy-border-soft);
  border-radius: 9999px;
  background: #fff;
  padding: 2px 8px;

  .name {
    font-size: 11px;
    color: var(--ah-color-legacy-text-strong);
  }

  .line {
    font-size: 11px;
    color: var(--ah-color-legacy-text-muted);
  }
`;

const StateText = styled.p`
  margin-top: 8px;
  font-size: 12px;
  color: var(--ah-color-legacy-text-muted);
`;

export default FavoriteRouteCard;
