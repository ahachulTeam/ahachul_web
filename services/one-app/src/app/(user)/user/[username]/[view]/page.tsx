import { notFound } from 'next/navigation';

import RouteBridgePage from '@/app/_components/RouteBridgePage';
import { localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

type Props = {
  params: Promise<{
    username: string;
    view: string;
  }>;
};

type UserView = 'settings' | 'preview';

function resolveUserView(view: string): UserView | null {
  if (view === 'settings' || view === 'preview') {
    return view;
  }

  return null;
}

export default async function UserProfileBridgePage({ params }: Props) {
  const { username, view } = await params;
  const normalizedView = resolveUserView(view);

  if (!normalizedView) {
    notFound();
  }

  const locale = await getServerLocale();
  const encodedUsername = encodeURIComponent(username);
  const profilePath = localizePathname(`/user/${encodedUsername}`, locale);
  const settingsPath = localizePathname(`/user/${encodedUsername}/settings`, locale);
  const previewPath = localizePathname(`/user/${encodedUsername}/preview`, locale);
  const decodedUsername = decodeURIComponent(username);

  if (normalizedView === 'settings') {
    return (
      <RouteBridgePage
        title={`${decodedUsername} 프로필 공개 설정`}
        description="프로필 공개 범위 설정은 사용자 프로필 페이지와 커뮤니티 검색 정책에 맞춰 통합 개편 중입니다."
        note="작성 글/댓글 공개 범위 정책은 프로필 페이지 정책과 별도로 적용됩니다."
        actions={[
          {
            label: '프로필 미리보기',
            href: previewPath,
            variant: 'primary',
          },
          {
            label: '사용자 프로필로 이동',
            href: profilePath,
            variant: 'secondary',
          },
        ]}
      />
    );
  }

  return (
    <RouteBridgePage
      title={`${decodedUsername} 프로필 미리보기`}
      description="현재 사용자 프로필의 공개 항목 미리보기는 프로필 메인 화면으로 통합 제공됩니다."
      actions={[
        {
          label: '사용자 프로필로 이동',
          href: profilePath,
          variant: 'primary',
        },
        {
          label: '공개 설정으로 이동',
          href: settingsPath,
          variant: 'secondary',
        },
      ]}
    />
  );
}
