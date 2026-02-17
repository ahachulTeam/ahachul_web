'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { QUERY_STALE_TIME, myQueryKeys } from '@ahhachul/domain';

import { getMyProfile } from '@/app/(main-service)/me/_lib/getMyProfile';

type Props = {
  username: string;
};

export default function ProfileOverview({ username }: Props) {
  const { data, isPending } = useQuery({
    queryKey: myQueryKeys.profile(),
    queryFn: getMyProfile,
    staleTime: QUERY_STALE_TIME.user,
  });

  const profile = data?.result;
  const isMine = profile?.nickname === username;
  let profileGuideText = '요청한 사용자 경로를 확인했습니다.';
  if (isPending) {
    profileGuideText = '사용자 정보를 불러오는 중입니다.';
  } else if (isMine) {
    profileGuideText = '현재 로그인된 내 프로필입니다.';
  }

  return (
    <section className="space-y-3 px-5 pb-24 pt-4">
      <article className="rounded-2xl border border-gray-30 bg-white p-4">
        <p className="text-label-small text-gray-70">사용자 프로필</p>
        <h1 className="mt-1 text-headline-small text-gray-100">{username}</h1>
        <p className="mt-1 text-body-medium text-gray-80">{profileGuideText}</p>
      </article>

      <article className="rounded-2xl border border-gray-30 bg-white p-4">
        <h2 className="text-title-small text-gray-100">계정 정보</h2>
        <dl className="mt-2 grid grid-cols-[96px_1fr] gap-y-2 text-body-medium text-gray-80">
          <dt>닉네임</dt>
          <dd>{profile?.nickname ?? '-'}</dd>
          <dt>이메일</dt>
          <dd>{profile?.email ?? '-'}</dd>
          <dt>성별</dt>
          <dd>{profile?.gender ?? '-'}</dd>
          <dt>연령대</dt>
          <dd>{profile?.ageRange ? `${profile.ageRange}대` : '-'}</dd>
        </dl>
      </article>

      <div className="flex gap-2">
        <Link
          href="/me"
          className="inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
        >
          마이 페이지
        </Link>
        <Link
          href="/messages"
          className="inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
        >
          메시지함
        </Link>
      </div>
    </section>
  );
}
