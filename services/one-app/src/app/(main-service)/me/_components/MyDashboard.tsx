'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { AuthService } from '@/lib/auth-service';

import { getMyFavoriteStations, getMyProfile } from '../_lib/getMyProfile';

const cardClassName = 'rounded-2xl border border-gray-30 bg-white p-4';

export default function MyDashboard() {
  const {
    data: profile,
    isPending: isProfilePending,
    isError: isProfileError,
  } = useQuery({
    queryKey: ['me', 'profile'],
    queryFn: getMyProfile,
    staleTime: 5 * 60 * 1000,
  });

  const { data: stations } = useQuery({
    queryKey: ['me', 'favorite-stations'],
    queryFn: getMyFavoriteStations,
    staleTime: 5 * 60 * 1000,
  });

  if (isProfilePending) {
    return (
      <section className="space-y-3 px-5 pb-24 pt-4">
        <div className={`${cardClassName} h-[122px] animate-pulse bg-gray-20`} />
        <div className={`${cardClassName} h-[172px] animate-pulse bg-gray-20`} />
      </section>
    );
  }

  if (isProfileError || !profile?.result) {
    return (
      <section className="px-5 pb-24 pt-4">
        <article className={cardClassName}>
          <h2 className="text-title-small text-gray-90">로그인이 필요합니다</h2>
          <p className="mt-2 text-body-medium text-gray-70">
            세션이 만료되었거나 사용자 정보를 불러오지 못했습니다.
          </p>
          <Link
            href="/login"
            className="mt-4 inline-flex h-10 items-center rounded-xl bg-key-color px-4 text-label-medium text-white"
          >
            로그인 화면으로 이동
          </Link>
        </article>
      </section>
    );
  }

  const member = profile.result;
  const stationNames = stations?.result.stationInfoList?.map(station => station.stationName) ?? [];

  return (
    <section className="space-y-3 px-5 pb-24 pt-4">
      <article className={`${cardClassName} bg-gradient-to-r from-green-50 to-white`}>
        <p className="text-label-small text-gray-80">MY PROFILE</p>
        <h2 className="mt-1 text-headline-small text-gray-100">{member.nickname}</h2>
        <p className="mt-1 text-body-medium text-gray-80">{member.email || '등록된 이메일 없음'}</p>
        <div className="mt-4 flex items-center gap-2">
          <Link
            href={`/user/${encodeURIComponent(member.nickname)}`}
            className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
          >
            프로필 보기
          </Link>
          <button
            type="button"
            onClick={() => AuthService.expireSession()}
            className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
          >
            로그아웃
          </button>
        </div>
      </article>

      <article className={cardClassName}>
        <h3 className="text-title-small text-gray-100">빠른 이동</h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            href="/messages"
            className="rounded-xl bg-gray-20 p-3 text-label-medium text-gray-90"
          >
            메시지
          </Link>
          <Link
            href="/notifications"
            className="rounded-xl bg-gray-20 p-3 text-label-medium text-gray-90"
          >
            알림
          </Link>
          <Link
            href="/community"
            className="rounded-xl bg-gray-20 p-3 text-label-medium text-gray-90"
          >
            커뮤니티
          </Link>
          <Link
            href="/complaint"
            className="rounded-xl bg-gray-20 p-3 text-label-medium text-gray-90"
          >
            민원
          </Link>
        </div>
      </article>

      <article className={cardClassName}>
        <h3 className="text-title-small text-gray-100">내 지하철 설정</h3>
        {stationNames.length ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {stationNames.map(stationName => (
              <li
                key={stationName}
                className="rounded-full border border-gray-30 bg-gray-10 px-3 py-1 text-body-small text-gray-90"
              >
                {stationName}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-body-medium text-gray-70">등록된 즐겨찾기 역이 없습니다.</p>
        )}
      </article>
    </section>
  );
}
