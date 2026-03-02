'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { QUERY_STALE_TIME, myQueryKeys } from '@ahhachul/domain';
import { maskEmail } from '@ahhachul/utils';

import LanguageSelector from '@/app/_components/LanguageSelector';
import { localizePathname, type LocaleMessages, type SupportedLocale } from '@/i18n';

import { getMyProfile } from '../../_lib/getMyProfile';

const cardClassName = 'rounded-2xl border border-gray-30 bg-white p-4';
const TERMS_URL = process.env.NEXT_PUBLIC_AHHACHUL_TERMS_URL ?? 'https://ahhachul.com/terms';
const PRIVACY_URL = process.env.NEXT_PUBLIC_AHHACHUL_PRIVACY_URL ?? 'https://ahhachul.com/privacy';

type MeSettingHubProps = {
  locale: SupportedLocale;
  copy: LocaleMessages['me'];
};

export default function MeSettingHub({ locale, copy }: MeSettingHubProps) {
  const { data, isPending, isError } = useQuery({
    queryKey: myQueryKeys.profile(),
    queryFn: getMyProfile,
    staleTime: QUERY_STALE_TIME.user,
  });

  if (isPending) {
    return (
      <section className="space-y-3 px-5 pb-24 pt-4">
        <div className={`${cardClassName} h-[160px] animate-pulse bg-gray-20`} />
        <div className={`${cardClassName} h-[220px] animate-pulse bg-gray-20`} />
      </section>
    );
  }

  if (isError || !data?.result) {
    return (
      <section className="space-y-3 px-5 pb-24 pt-4">
        <article className={cardClassName}>
          <p className="text-label-small text-gray-70">설정 허브</p>
          <h1 className="mt-1 text-title-small text-gray-100">{copy.authRequiredTitle}</h1>
          <p className="mt-2 text-body-medium text-gray-80">{copy.authRequiredDescription}</p>
          <Link
            href={localizePathname('/login', locale)}
            className="mt-4 inline-flex h-10 items-center rounded-xl bg-key-color px-4 text-label-medium text-white"
          >
            {copy.goToLogin}
          </Link>
        </article>
      </section>
    );
  }

  const member = data.result;
  const encodedNickname = member.nickname ? encodeURIComponent(member.nickname) : null;

  return (
    <section className="space-y-3 px-5 pb-24 pt-4">
      <article className={`${cardClassName} bg-gradient-to-r from-green-50 to-white`}>
        <p className="text-label-small text-gray-70">설정 허브</p>
        <h1 className="mt-1 text-headline-small text-gray-100">{member.nickname}</h1>
        <p className="mt-1 text-body-medium text-gray-80">
          {maskEmail(member.maskedEmail ?? member.email) || copy.noEmail}
        </p>
        <p className="mt-2 text-body-small text-gray-70">
          계정 정보, 공개 범위, 정책/언어를 한 번에 관리할 수 있습니다.
        </p>
      </article>

      <article className={cardClassName}>
        <h2 className="text-title-small text-gray-100">설정 바로가기</h2>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Link
            href={localizePathname('/me/setting/account', locale)}
            className="rounded-xl border border-gray-30 bg-gray-10 px-3 py-3 text-label-medium text-gray-90"
          >
            계정 기본정보 관리
          </Link>
          <Link
            href={localizePathname('/me', locale)}
            className="rounded-xl border border-gray-30 bg-gray-10 px-3 py-3 text-label-medium text-gray-90"
          >
            마이페이지 대시보드
          </Link>
          {encodedNickname ? (
            <Link
              href={localizePathname(`/user/${encodedNickname}/settings`, locale)}
              className="rounded-xl border border-gray-30 bg-gray-10 px-3 py-3 text-label-medium text-gray-90"
            >
              공개설정 상세 페이지
            </Link>
          ) : null}
          {encodedNickname ? (
            <Link
              href={localizePathname(`/user/${encodedNickname}/preview`, locale)}
              className="rounded-xl border border-gray-30 bg-gray-10 px-3 py-3 text-label-medium text-gray-90"
            >
              공개 프로필 미리보기
            </Link>
          ) : null}
        </div>
      </article>

      <article className={cardClassName}>
        <h2 className="text-title-small text-gray-100">{copy.quickLinksHeading}</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            href={localizePathname('/messages', locale)}
            className="rounded-xl bg-gray-20 p-3 text-label-medium text-gray-90"
          >
            {copy.quickLinks.messages}
          </Link>
          <Link
            href={localizePathname('/notifications', locale)}
            className="rounded-xl bg-gray-20 p-3 text-label-medium text-gray-90"
          >
            {copy.quickLinks.notifications}
          </Link>
          <Link
            href={localizePathname('/community', locale)}
            className="rounded-xl bg-gray-20 p-3 text-label-medium text-gray-90"
          >
            {copy.quickLinks.community}
          </Link>
          <Link
            href={localizePathname('/delay-center', locale)}
            className="rounded-xl bg-gray-20 p-3 text-label-medium text-gray-90"
          >
            {copy.quickLinks.delayCenter}
          </Link>
        </div>
      </article>

      <article className={cardClassName}>
        <h2 className="text-title-small text-gray-100">아하철 앱 정책</h2>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <a
            href={TERMS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
          >
            이용약관
          </a>
          <a
            href={PRIVACY_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
          >
            개인정보처리방침
          </a>
        </div>
      </article>

      <article className={cardClassName}>
        <h2 className="text-title-small text-gray-100">{copy.languageSectionTitle}</h2>
        <LanguageSelector className="mt-3" />
      </article>
    </section>
  );
}
