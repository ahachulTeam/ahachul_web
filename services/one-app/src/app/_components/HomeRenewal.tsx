'use client';

import { type ReactNode, useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { QUERY_STALE_TIME } from '@ahhachul/domain';

import {
  getMyFavoriteStations,
  getMyProfile,
  getMyRouteConnectionRecommendations,
} from '@/app/(main-service)/me/_lib/getMyProfile';
import { getLocaleMessages, localizePathname, type SupportedLocale } from '@/i18n';
import { AuthService } from '@/lib/auth-service';
import { getPublicStories } from '@/lib/stories';

type HomeRenewalProps = {
  locale: SupportedLocale;
};

type FeatureLink = {
  title: string;
  description: string;
  href: string;
  badge?: string;
};

type FeatureCluster = {
  title: string;
  subtitle: string;
  links: FeatureLink[];
};

const FEATURE_CLUSTERS: FeatureCluster[] = [
  {
    title: '운행 인사이트',
    subtitle: '지금 바로 판단 가능한 실시간 정보',
    links: [
      {
        title: '실시간 대시보드',
        description: '운행/막차/혼잡 정보를 한 화면에서 확인',
        href: '/subway',
        badge: 'LIVE',
      },
      {
        title: '지연/사고 센터',
        description: '제보 신뢰 신호와 지연 근거를 빠르게 확인',
        href: '/delay-center',
        badge: 'NEW',
      },
      {
        title: '데일리 투표 허브',
        description: '출퇴근/등하교 체감 투표와 댓글 흐름 확인',
        href: '/daily-votes',
      },
    ],
  },
  {
    title: '콘텐츠 허브',
    subtitle: '역/호선 중심 커뮤니티·민원·유실물',
    links: [
      {
        title: '커뮤니티 허브',
        description: '역별/호선별 글 탐색과 인기글 확인',
        href: '/community',
      },
      {
        title: '유실물 허브',
        description: '분실물 등록/조회와 댓글 협업',
        href: '/lost-found',
      },
      {
        title: '민원 허브',
        description: '현장 이슈 접수와 처리 흐름 관리',
        href: '/complaint',
      },
    ],
  },
  {
    title: '글로벌 & 네트워크',
    subtitle: '외국인/언어교환/경로 기반 추천',
    links: [
      {
        title: '외국인 핫스팟',
        description: '명동/성수/홍대 등 역 중심 정보 탐색',
        href: '/foreigner/hotspots',
      },
      {
        title: '언어교환 라운지',
        description: '한국인-외국인 언어교환 및 친목 연결',
        href: '/foreigner/language-exchange',
      },
      {
        title: '쪽지 인박스',
        description: '추천 상대/커뮤니티 사용자와 즉시 대화',
        href: '/messages',
      },
    ],
  },
  {
    title: '개인화 센터',
    subtitle: '즐겨찾기/프로필/정책 설정',
    links: [
      {
        title: '마이 대시보드',
        description: '즐겨찾기 경로, 좋아요/북마크 히스토리 확인',
        href: '/me',
      },
      {
        title: '프로필 & 공개설정',
        description: '닉네임, 공개범위, 프로필 이미지 관리',
        href: '/me/setting',
      },
      {
        title: '로그인/세션 설정',
        description: '소셜 로그인 및 계정 진입 경로 확인',
        href: '/login',
      },
    ],
  },
];

function resolveGreetingByHour(hour: number): string {
  if (hour < 6) {
    return '야간 이동도 안전하게 관리해볼까요?';
  }
  if (hour < 11) {
    return '출근/등교 러시, 똑똑하게 통과해볼까요?';
  }
  if (hour < 16) {
    return '오후 이동도 한 번에 정리해드릴게요.';
  }
  if (hour < 21) {
    return '퇴근/하교 동선, 지금 가장 빠른 흐름으로 맞춰볼까요?';
  }
  return '오늘 이동 기록, 마지막까지 깔끔하게 정리해볼까요?';
}

function formatStationSummary(stationNames: string[]): string {
  if (!stationNames.length) {
    return '즐겨찾는 역을 추가하면 홈이 즉시 개인화됩니다.';
  }
  if (stationNames.length === 1) {
    return `${stationNames[0]} 기준으로 개인화 피드를 준비했어요.`;
  }
  return `${stationNames.slice(0, 2).join(' · ')} 중심으로 개인화 피드를 준비했어요.`;
}

export default function HomeRenewal({ locale }: HomeRenewalProps) {
  const messages = getLocaleMessages(locale);
  const isLoggedIn = AuthService.isLoggedIn;
  const greeting = useMemo(() => resolveGreetingByHour(new Date().getHours()), []);
  const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);

  const profileQuery = useQuery({
    queryKey: ['home-renewal', 'profile'],
    queryFn: getMyProfile,
    staleTime: QUERY_STALE_TIME.user,
    enabled: isLoggedIn,
  });

  const favoriteStationsQuery = useQuery({
    queryKey: ['home-renewal', 'favorite-stations'],
    queryFn: getMyFavoriteStations,
    staleTime: QUERY_STALE_TIME.user,
    enabled: isLoggedIn,
  });

  const routeConnectionQuery = useQuery({
    queryKey: ['home-renewal', 'route-connections'],
    queryFn: () => getMyRouteConnectionRecommendations({ limit: 6, groupLimit: 2 }),
    staleTime: QUERY_STALE_TIME.user,
    enabled: isLoggedIn,
  });

  const homePublicStoriesQuery = useQuery({
    queryKey: [
      'home-renewal',
      'public-stories',
      (favoriteStationsQuery.data?.result.stationInfoList?.[0]?.stationId ?? 0).toString(),
      (
        favoriteStationsQuery.data?.result.stationInfoList?.[0]?.subwayLineInfoList?.[0]
          ?.subwayLineId ?? 0
      ).toString(),
    ],
    queryFn: () => {
      const station = favoriteStationsQuery.data?.result.stationInfoList?.[0];
      const line = station?.subwayLineInfoList?.[0];
      return getPublicStories({
        limit: 12,
        stationId: station?.stationId,
        subwayLineId: line?.subwayLineId,
      });
    },
    staleTime: QUERY_STALE_TIME.feed,
    enabled: true,
  });

  const nickname = profileQuery.data?.result.nickname ?? '아하철 사용자';
  const favoriteStationNames = (favoriteStationsQuery.data?.result.stationInfoList ?? [])
    .map(station => station.stationName)
    .filter(Boolean);
  const routeMatches = routeConnectionQuery.data?.result.recommendations ?? [];
  const publicStories = homePublicStoriesQuery.data?.result.stories ?? [];
  const selectedStory = publicStories.find(story => story.storyId === selectedStoryId) ?? null;
  const stationSummary = formatStationSummary(favoriteStationNames);
  let routeMatchContent: ReactNode;

  if (routeConnectionQuery.isPending) {
    routeMatchContent = (
      <p className="mt-3 text-body-medium text-gray-70">경로 기반 추천을 계산 중입니다.</p>
    );
  } else if (routeMatches.length) {
    routeMatchContent = (
      <ul className="mt-3 space-y-2">
        {routeMatches.slice(0, 3).map(match => (
          <li
            key={`${match.memberId}-${match.routeId ?? 'none'}`}
            className="rounded-xl border border-gray-20 bg-gray-10 px-3 py-2"
          >
            <p className="text-label-medium text-gray-90">
              {match.nickname} · {Math.round(match.matchScore * 100)}% 유사
            </p>
            <p className="mt-1 text-body-small text-gray-70">
              {match.sourceStationName} → {match.destinationStationName} · 총 오차{' '}
              {match.totalDistance}
            </p>
          </li>
        ))}
      </ul>
    );
  } else {
    routeMatchContent = (
      <p className="mt-3 text-body-medium text-gray-70">
        즐겨찾는 역/경로를 2개 이상 등록하면 추천을 시작합니다.
      </p>
    );
  }

  return (
    <main className="min-h-screen px-5 pb-28 pt-5">
      <section className="ah-glass-card relative overflow-hidden rounded-3xl border border-white/60 bg-white/85 p-5 shadow-[0_18px_48px_rgba(13,18,30,0.14)]">
        <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-key-color/20 blur-2xl" />
        <p className="text-label-small uppercase tracking-[0.08em] text-gray-70">
          A-HHACHUL REBOOT
        </p>
        <h1 className="mt-2 text-headline-large text-gray-100">{nickname}님,</h1>
        <p className="mt-1 text-title-small text-gray-80">{greeting}</p>
        <p className="mt-4 rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-body-medium text-gray-80">
          {stationSummary}
        </p>

        {!isLoggedIn ? (
          <Link
            href={localizePathname('/login', locale)}
            className="mt-4 inline-flex h-11 items-center rounded-2xl bg-gray-100 px-4 text-label-large text-white transition hover:bg-gray-90"
          >
            로그인하고 개인화 시작
          </Link>
        ) : null}
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-title-large text-gray-100">빠른 실행</h2>
          <span className="text-label-small text-gray-70">2-Depth 진입</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: '투표 허브', href: '/daily-votes' },
            { title: '지연 센터', href: '/delay-center' },
            { title: '외국인 허브', href: '/foreigner/hotspots' },
            { title: '쪽지 인박스', href: '/messages' },
          ].map(item => (
            <Link
              key={item.href}
              href={localizePathname(item.href, locale)}
              className="rounded-2xl border border-gray-30 bg-white px-4 py-3 text-label-large text-gray-90 shadow-[0_8px_20px_rgba(14,20,28,0.08)] transition hover:-translate-y-[1px]"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-gray-30 bg-white p-4 shadow-[0_10px_22px_rgba(14,20,28,0.08)]">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-title-large text-gray-100">홈 스토리 피드</h2>
            <p className="mt-1 text-body-small text-gray-70">
              실시간 공유 스토리를 홈에서 바로 확인할 수 있어요.
            </p>
          </div>
          <Link
            href={localizePathname('/me', locale)}
            className="text-label-small text-key-color underline-offset-2 hover:underline"
          >
            내 스토리
          </Link>
        </div>

        {homePublicStoriesQuery.isPending ? (
          <p className="mt-3 text-body-small text-gray-70">스토리를 불러오는 중입니다.</p>
        ) : null}
        {homePublicStoriesQuery.isError ? (
          <p className="mt-3 text-body-small text-danger">
            스토리 피드를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
          </p>
        ) : null}
        {!homePublicStoriesQuery.isPending &&
        !homePublicStoriesQuery.isError &&
        !publicStories.length ? (
          <p className="mt-3 text-body-small text-gray-70">
            아직 공유된 스토리가 없습니다. 첫 번째 스토리를 올려보세요.
          </p>
        ) : null}

        {!homePublicStoriesQuery.isPending &&
        !homePublicStoriesQuery.isError &&
        publicStories.length > 0 ? (
          <ul className="mt-3 flex gap-3 overflow-x-auto pb-1">
            {publicStories.map(story => (
              <li key={`home-public-story-${story.storyId}`} className="shrink-0">
                <button
                  type="button"
                  className="w-20"
                  onClick={() => setSelectedStoryId(story.storyId)}
                >
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-key-color p-0.5">
                    <img
                      src={story.imageUrl}
                      alt={`${story.nickname} 스토리`}
                      className="h-full w-full rounded-full border border-white/70 object-cover"
                    />
                  </span>
                  <span className="mt-1 block truncate text-label-small text-gray-100">
                    {story.nickname}
                  </span>
                  <span className="block truncate text-caption text-gray-70">
                    {story.stationName ?? '역 미지정'}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {isLoggedIn ? (
        <section className="mt-6 rounded-3xl border border-gray-30 bg-white p-4 shadow-[0_10px_22px_rgba(14,20,28,0.08)]">
          <div className="flex items-center justify-between">
            <h2 className="text-title-large text-gray-100">경로 겹침 추천</h2>
            <Link
              href={localizePathname('/me', locale)}
              className="text-label-small text-key-color underline-offset-2 hover:underline"
            >
              상세 보기
            </Link>
          </div>
          {routeMatchContent}
        </section>
      ) : null}

      <section className="mt-6 space-y-4">
        {FEATURE_CLUSTERS.map(cluster => (
          <article
            key={cluster.title}
            className="rounded-3xl border border-gray-30 bg-white p-4 shadow-[0_10px_24px_rgba(14,20,28,0.08)]"
          >
            <h3 className="text-title-large text-gray-100">{cluster.title}</h3>
            <p className="mt-1 text-body-medium text-gray-70">{cluster.subtitle}</p>

            <div className="mt-3 space-y-2">
              {cluster.links.map(link => (
                <Link
                  key={`${cluster.title}-${link.href}`}
                  href={localizePathname(link.href, locale)}
                  className="group block rounded-2xl border border-gray-20 bg-gray-10 px-4 py-3 transition hover:border-key-color/50 hover:bg-key-color/10"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-label-large text-gray-90">{link.title}</p>
                    {link.badge ? (
                      <span className="rounded-full bg-key-color px-2 py-1 text-[11px] font-semibold text-black_secondary">
                        {link.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-body-small text-gray-70">{link.description}</p>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-3xl border border-gray-30 bg-white p-4">
        <h2 className="text-title-large text-gray-100">오늘의 운영 모드</h2>
        <p className="mt-2 text-body-medium text-gray-70">
          홈은 요약, 허브는 실행, 상세는 집중 작업이라는 3단 구조로 재정렬했습니다.
          {` ${messages.nav.home} → 허브 페이지 → 상세 페이지`} 순서로 이동하면 기능 밀도가 높아도
          피로도가 크게 줄어듭니다.
        </p>
      </section>

      {selectedStory ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">
          <article className="w-full max-w-md overflow-hidden rounded-3xl border border-gray-30 bg-gray-100">
            <header className="flex items-center justify-between px-3 py-3">
              <div>
                <p className="text-label-large text-white">{selectedStory.nickname}</p>
                <p className="mt-1 text-caption text-gray-60">
                  {selectedStory.stationName ?? '역 미지정'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStoryId(null)}
                className="rounded-full border border-gray-70 px-3 py-1 text-label-small text-gray-20"
              >
                닫기
              </button>
            </header>
            <img
              src={selectedStory.imageUrl}
              alt="선택된 스토리"
              className="w-full object-cover"
              style={{ height: '52vh' }}
            />
            <div className="px-3 pb-3 pt-2">
              <p className="text-body-small text-gray-30">{selectedStory.caption ?? '캡션 없음'}</p>
              <Link
                href={localizePathname(
                  `/user/${encodeURIComponent(selectedStory.nickname)}`,
                  locale,
                )}
                className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-xl border border-gray-60 text-label-medium text-gray-20"
              >
                작성자 프로필 보기
              </Link>
            </div>
          </article>
        </div>
      ) : null}
    </main>
  );
}
