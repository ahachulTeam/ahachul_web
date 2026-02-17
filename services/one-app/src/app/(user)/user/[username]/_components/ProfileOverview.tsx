'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { QUERY_STALE_TIME, myQueryKeys } from '@ahhachul/domain';

import { getMyProfile } from '@/app/(main-service)/me/_lib/getMyProfile';
import { getLocaleMessages, localizePathname, resolvePathLocale } from '@/i18n';

type Props = {
  username: string;
};

export default function ProfileOverview({ username }: Props) {
  const pathname = usePathname() ?? '/user';
  const locale = resolvePathLocale(pathname, null);
  const copy = getLocaleMessages(locale).userProfile;
  const { data, isPending } = useQuery({
    queryKey: myQueryKeys.profile(),
    queryFn: getMyProfile,
    staleTime: QUERY_STALE_TIME.user,
  });

  const profile = data?.result;
  const isMine = profile?.nickname === username;
  let profileGuideText = copy.guideDefault;
  if (isPending) {
    profileGuideText = copy.guideLoading;
  } else if (isMine) {
    profileGuideText = copy.guideMine;
  }

  return (
    <section className="space-y-3 px-5 pb-24 pt-4">
      <article className="rounded-2xl border border-gray-30 bg-white p-4">
        <p className="text-label-small text-gray-70">{copy.sectionTitle}</p>
        <h1 className="mt-1 text-headline-small text-gray-100">{username}</h1>
        <p className="mt-1 text-body-medium text-gray-80">{profileGuideText}</p>
      </article>

      <article className="rounded-2xl border border-gray-30 bg-white p-4">
        <h2 className="text-title-small text-gray-100">{copy.accountInfoTitle}</h2>
        <dl className="mt-2 grid grid-cols-[96px_1fr] gap-y-2 text-body-medium text-gray-80">
          <dt>{copy.fields.nickname}</dt>
          <dd>{profile?.nickname ?? '-'}</dd>
          <dt>{copy.fields.email}</dt>
          <dd>{profile?.email ?? '-'}</dd>
          <dt>{copy.fields.gender}</dt>
          <dd>{profile?.gender ?? '-'}</dd>
          <dt>{copy.fields.ageRange}</dt>
          <dd>{profile?.ageRange ? `${profile.ageRange}${copy.ageRangeSuffix}` : '-'}</dd>
        </dl>
      </article>

      <div className="flex gap-2">
        <Link
          href={localizePathname('/me', locale)}
          className="inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
        >
          {copy.links.myPage}
        </Link>
        <Link
          href={localizePathname('/messages', locale)}
          className="inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
        >
          {copy.links.messages}
        </Link>
      </div>
    </section>
  );
}
